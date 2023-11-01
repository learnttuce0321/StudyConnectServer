import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { User } from "../model/MUser";

export async function GetUsers(req: Request, res: Response) {
    const { studyId } = req.params
    const userRepository = AppDataSource.getRepository(User)
    
    try {
        const data = await userRepository
        .find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        
        res.json({
            result: true,
            data
        })
        
    } catch (error) {
        console.log(error)   
    }
}
export async function AddUser(req: Request, res: Response) {
    try {
        await AppDataSource.createQueryBuilder()
        .insert()
        .into('user')
        .values(req.body)
        .execute()

        res.json({
            result: true,
            data: {...req.body}
        })

    } catch (error) {
        console.log(error)
    }
}
export async function ModifyUserInfo(req: Request, res: Response) {
    const { id, info } = req.body
    const userRepository = AppDataSource.getRepository(User)

    try {
        await AppDataSource.createQueryBuilder()
        .update('user')
        .set({info})
        .where('id= :id', {id: id})
        .execute()

        const data = await userRepository
        .findOne({where: {id: id}})
        
        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}