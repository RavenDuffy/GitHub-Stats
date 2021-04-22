import express from 'express'
import axios from 'axios'
import cors from 'cors'

import * as config from './config.json'

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
    }).then(resp => {
        console.log(resp.data)
        res.cookie('access_token', resp.data.split('&')[0].split('=')[1])
        res.redirect('http://localhost:3000')
    })
    .catch(err => console.error(err))
})



server.listen(PORT)