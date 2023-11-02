import express, { Router } from 'express'
import { AddMessage, GetMessages } from "../controll/CMessage";

const messageRouter: Router = express.Router()

//MessageAPI
messageRouter.get('/get', GetMessages);
messageRouter.post('/add', AddMessage)

export default messageRouter