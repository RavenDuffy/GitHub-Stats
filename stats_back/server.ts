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
        

        const testUser = new UserModel({
            username: 'raven',
            displayName: 'wow',
            avatar: 'pic!',
            accessToken: null
        });
        testUser.save()

        await new Promise(resolve => setTimeout(resolve, 5000))
        const all = await UserModel.find({})
        console.log(all)


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

    // const testUser = new UserModel({
    //     username: 'ravenss',
    //     displayName: 'wow',
    //     avatar: 'pic!',
    //     accessToken: null
    // });
    // testUser.save()

    // const all = await UserModel.find({})
    // console.log(all)


    server.listen(PORT)
}

startServer()