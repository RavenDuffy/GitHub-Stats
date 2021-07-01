import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import WebSocket from 'ws'

import { getConfig } from './config'
import { User, UserModel } from './stats_db/models/user'
import * as GCD from './utils/gitcmds'
import { FrontStats } from './types'
import { StatSVGString } from './utils/SVGtoString'

const config = getConfig()

// for whatever reason github callbacks on port 4005
const PORT = 4005;

const server = express()
server.use(express.json())
server.use(cors({ origin: true, credentials: true }))
server.use(express.static(__dirname))
server.set('trust_proxy', 1)

interface ExtraWS extends WebSocket {
    [name: string]: any
}

const wss = new WebSocket.Server({
    port: 4010,
    perMessageDeflate: false
})

wss.on('connection', (ws: ExtraWS, req) => {
    ws.id = req.headers.cookie?.split(';').find(e => e.includes('git_id'))?.split('=')[1]
    ws.send(`Connected to: ${req.socket.remoteAddress}:${req.socket.remotePort}`)

    ws.on('message', msg => {
        ws.send(`Recieved: '${msg}'`)
    })
})

server.get('/callback', (req, res) => {
    GCD.DoAuth(<string>req.query.code!).then(async (resp) => {
        // get initial user info
        const accessToken: string = resp.data.split('&')[0].split('=')[1]
        const userinfo = (await GCD.FetchCurrentUser(accessToken)).data
        
        // create model
        const newUser = new UserModel({
            username: userinfo.login,
            avatar: userinfo.avatar_url,
            accessToken: accessToken,
            gitId: userinfo.id
        });

        // ensure this user doesn't already exist (modifies existing record if it does)
        let duplicateUser = false;
        for (const user of await UserModel.find({})) {
            if (user.gitId == newUser.gitId) {
                user.username = newUser.username
                user.avatar = newUser.avatar
                user.accessToken = newUser.accessToken
                await user.save()
                duplicateUser = true;
                break;
            }
        }
        if (!duplicateUser) newUser.save()

        res.cookie('git_id', newUser.gitId, {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            secure: (process.env.NODE_ENV === 'production')
                ? true : false,
            sameSite: 'lax',
            domain: (process.env.NODE_ENV === 'production') 
                ? config.hosts.front.split('//')[1]
                : undefined
        })
        res.redirect(config.hosts.front)

        // get user's repo info
        const stats = await GCD.GetStats(newUser.accessToken!, newUser.username)
        for (const user of await UserModel.find({ gitId: newUser.gitId })) {
            user.stats = stats
            await user.save()
        }

        wss.clients.forEach(client => {
            const castClient = client as ExtraWS
            if (castClient.id == newUser.gitId)
                client.send(JSON.stringify({ fetched_status: true }))
        })
    })
    .catch(err => console.error(err))
})

const updateStats = async (user: User | null) => {
    if (user !== null) {
        const stats = await GCD.GetStats(user.accessToken!, user.username)
        user.stats = stats
        user.save()
    }
}

server.get('/stats', async (req, res) => {
    const userGitID = req.headers.cookie?.split(';').find(e => e.includes('git_id'))?.split('=')[1]
    const user = await UserModel.findOne({ gitId: (userGitID !== undefined) ? parseInt(userGitID) : -1 })
    if (user !== null) {
        const userToSend: FrontStats = {
            username: user.username,
            avatar: user.avatar,
            stats: user.stats
        }
        res.json(userToSend)
    } else {
        res.status(401).json({ response: "No record with that id found, please log in before continuing" })
    }
    updateStats(user)
})

server.get('/svg/:gitId', async (req, res) => {
    const userGitID = req.params.gitId
    const user = await UserModel.findOne({ gitId: (userGitID !== undefined) ? parseInt(userGitID) : -1 })
    if (user !== null) {
        const userF: FrontStats = {
            username: user.username,
            avatar: user.avatar,
            stats: user.stats
        }

        res.format({'image/svg+xml': function() { res.send(StatSVGString(userF)) }})

        const stats = await GCD.GetStats(user.accessToken!, user.username)
        for (const u of await UserModel.find({ gitId: user.gitId })) {
            u.stats = stats
            await u.save()
        }
    }
})

const startServer = async () => {
    await mongoose.connect(config.mongo.host.concat('/git_stats'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    // UserModel.collection.drop()
    // UserModel.collection.deleteMany({})

    server.listen(PORT)
}

startServer()