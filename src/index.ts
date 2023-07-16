import initServer from './server'
import express from 'express'
const app = express()

// Configs
const port = 3000

initServer(app, port)