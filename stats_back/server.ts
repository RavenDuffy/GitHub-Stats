import mongoose from 'mongoose'
import express from 'express'
import axios from 'axios'
import cors from 'cors'

import * as config from './config.json'
import { UserModel } from './stats_db/models/user'

// for whatever reason github callbacks on port 4005
const PORT = 4005;

const server = express()
server.use(express.json())
server.use(cors({ origin: true, credentials: true }))

server.get('/callback', (req, res) => {
    axios.post('https://github.com/login/oauth/access_token', {
        client_id: config.client.id,
        client_secret: config.client.secret,
        code: req.query.code!
    }).then(async (resp) => {
        console.log(resp.data)

        const newUser = new UserModel({
            username: 'raven',
            displayName: 'wow',
            avatar: 'pic!',
            accessToken: resp.data.split('&')[0].split('=')[1]
        });

        let duplicateUser = false;
        for (const user of await UserModel.find({})) {
            if (user.username == newUser.username &&
                user.displayName == newUser.displayName &&
                user.avatar == newUser.avatar) {
                    user.accessToken = newUser.accessToken
                    user.save()
                    duplicateUser = true;
                    break;
            }
        }
        if (!duplicateUser) newUser.save()

        console.log(await UserModel.find({}))


        // currently stores the access_token, should replace with a db key
        res.cookie('access_token', resp.data.split('&')[0].split('=')[1])
        res.redirect('http://localhost:3000') // split for prod
    })
    .catch(err => console.error(err))
})


const startServer = async () => {
    await mongoose.connect('mongodb://localhost:27017', {
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