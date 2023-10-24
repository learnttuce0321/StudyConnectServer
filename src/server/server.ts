import { AppDataSource } from "../model/data-source";
import express, { Express } from "express";
import path from 'path'
import mainRouter from '../router/mainRouter'
import { AddUser, GetUserByID, GetUsers, deleteUser, updateUser } from "../controll/CUser";

const app: Express = express();
const PORT: number = 8000

AppDataSource.initialize().then(async () => {

    app.use(express.static(path.join(__dirname, '../../../client/build')))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../client/build/index.html'))
    })
    app.post('/user', AddUser)
    app.post('/finduser', GetUserByID)
    app.post('/findusers', GetUsers)
    app.patch('/updateuser', updateUser)
    app.delete('/deleteuser', deleteUser)

    app.listen(PORT, () => {
        console.log('localhost:8000');
    }) 

}).catch(error => console.log(error))
