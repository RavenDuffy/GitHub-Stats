import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import expressWs from 'express-ws'

import * as config from '../config.json'
import { UserModel } from './stats_db/models/user'
import * as GCD from './utils/gitcmds'
import { FrontStats } from './types'

// for whatever reason github callbacks on port 4005
const PORT = 4005;

const server = expressWs(express()).app
server.use(express.json())
server.use(cors({ origin: true, credentials: true }))

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

        // get user's repo info
        const stats = await GCD.GetStats(newUser.accessToken!, newUser.username)
        for (const user of await UserModel.find({ gitId: newUser.gitId })) {
            user.stats = stats
            await user.save()
        }

        // currently stores the access_token, should replace with a db key
        res.cookie('access_token', resp.data.split('&')[0].split('=')[1])
        res.cookie('git_id', newUser.gitId)
        res.redirect(config.hosts.front)
    })
    .catch(err => console.error(err))
})

server.get('/stats', async (req, res) => {
    const validToken = req.headers.cookie?.split(';').find(e => e.includes('access_token'))?.split('=')[1]
    const user = await UserModel.find({ accessToken: validToken })
    if (user.length > 0) {
        const userToSend: FrontStats = {
            username: user[0].username,
            avatar: user[0].avatar,
            stats: user[0].stats
        }
        res.json(userToSend)
    } else {
        res.status(401).json({ response: "No valid access token found, please log in before proceeding" })
    }
})

server.get('/update_token', async (req, res) => {
    const userId = req.headers.cookie?.split(';').find(e => e.includes('git_id'))?.split('=')[1]
    const token = (userId !== undefined) 
        ? (await UserModel.find({ gitId: Number.parseInt(userId) }))[0].accessToken 
        : null
    res.cookie('access_token', token)
    res.json({ token: token })
})

server.ws('/update_token', (ws, req) => {
    ws.on('message', msg => {
        ws.send(`Acknowledged: '${msg}'`)
    })
    ws.on('close', () => {
        console.log("socket closed")
    })
})

server.get('/validate/:token', async (req, res) => {
    const currentToken = req.params.token.split('=')[1]
    const user = await UserModel.find({ accessToken: currentToken })
    if (user.length > 0)
        res.json({ tokenValid: true })
    else
        res.json({ tokenValid: false })
})

const startServer = async () => {
    await mongoose.connect(config.mongo.host, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }) // split for prod

    // UserModel.collection.drop()
    // UserModel.collection.deleteMany({})

    server.listen(PORT)
}

startServer()