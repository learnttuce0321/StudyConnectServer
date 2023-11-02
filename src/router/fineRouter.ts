import express, { Router } from 'express'
import { AddFine, CheckFine, DeleteFine, Getfines, ModifyFine } from "../controll/CFine";

const fineRouter: Router = express.Router()

//FineAPI
fineRouter.get('/get', Getfines);
fineRouter.post('/add', AddFine);
fineRouter.patch('/update', ModifyFine);
fineRouter.patch('/check', CheckFine);
fineRouter.delete('/delete', DeleteFine);

export default fineRouter