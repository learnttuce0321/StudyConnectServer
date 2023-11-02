import express, { Router } from 'express'
import { AddUser, GetUsers, ModifyUserInfo } from "../controll/CUser";

const userRouter: Router = express.Router()

// UserAPI
userRouter.get('/get', GetUsers);
userRouter.post('/add', AddUser);
userRouter.patch('/modify', ModifyUserInfo);

export default userRouter