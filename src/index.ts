import initServer from './server.js'
import express from 'express'
const app = express()

// Configs
const port = 3000

initServer(app, port)
