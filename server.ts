import express, { Request, Response, Express } from "express";
import path from 'path'
import sequelzie from "./models/index";
import { Users } from "./models/user";
const app: Express = express();
const PORT: number = 8000

app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
});
app.post('/get', async (req: Request, res: Response) => {
    const { email} = req.body

    try {
        const user = Users.create({
            email: email
        })
        res.json({
            result: true,
            message: '회원가입 성공'
        })
    } catch (error) {
        console.log(error)   
    }
})

sequelzie.sync({force: false})
    .then(() => {
        console.log("데이터 베이스 연결 성공");
    })
    .catch((err: any) => {
        console.error(err);
    });

app.listen(PORT, () => {
    console.log('localhost:8000')
}) 