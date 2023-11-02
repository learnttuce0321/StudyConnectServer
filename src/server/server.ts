import { AppDataSource } from "../model/data-source";
import express, { Express } from "express";
import path from 'path'
import publicRouter from '../router/publicRouter'
import studyRouter from '../router/studyRouter'

const app: Express = express();
const PORT: number = 8000

AppDataSource.initialize().then(async () => {

    app.use(express.static(path.join(__dirname, '../../../client/build')))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../client/build/index.html'))
    })

    app.use('/study/:studyId', publicRouter)
    app.use('/', studyRouter);

    app.listen(PORT, () => {
        console.log('localhost:8000');
    }) 

}).catch(error => console.log(error))
