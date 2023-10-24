import type { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { User } from "../model/MUser"

const userRepository = AppDataSource.getRepository(User);

export async function AddUser (req: Request, res: Response){
    await userRepository
    .save(req.body) //DB저장
    .then((user) => {
        res.send(user); //저장된 정보 response
    })
    .catch((err) => console.log(err));
}
export async function GetUserByID(req:Request, res: Response) {
    const { id } = req.body
    await userRepository
    .findOne({where: {id: id}})
    .then(user => {
        res.send(user)
    })
    .catch(error => {
        console.log(error)
    })
}
export async function GetUsers(req: Request, res: Response) {
    await userRepository
    .find()
    .then(users => {
        res.send(users)
        console.log(users)
    })
    .catch(error => {
        console.log(error)
    })
}
export async function updateUser(req: Request, res: Response) {
    const { id } = req.body
    await AppDataSource.createQueryBuilder()
    .update('user')
    .set({name: 'Ju'})
    .where('id= :id', {id: id})
    .execute()
}
export async function deleteUser(req: Request, res: Response) {
    const { id } = req.body
    await AppDataSource.createQueryBuilder()
    .delete()
    .from('user')
    .where('id= :id', {id: id})
    .execute()
}
