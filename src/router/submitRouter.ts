import express, { Router } from 'express'
import { AddSubmitByAssignment, AddSubmitByUser, CheckSubmit, GetSubmits } from "../controll/CSubmit";

const submitRouter: Router = express.Router()

//SubmitAPI
submitRouter.get('/get', GetSubmits);
submitRouter.post('/add-assignment', AddSubmitByAssignment)
submitRouter.post('/add-user', AddSubmitByUser)
submitRouter.patch('/check', CheckSubmit)

export default submitRouter