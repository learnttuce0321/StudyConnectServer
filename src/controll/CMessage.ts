import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Message } from "../model/MMessage";

export async function GetMessages(req: Request, res: Response) {
    const { studyId } = req.params
    const messageRepository = AppDataSource.getRepository(Message)

    try {
        const result = await messageRepository
        .find({where: {studyId: studyId}})

        res.json({
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddMessage(req: Request, res: Response) {
    try {
        const tempMessageObj = {
            ...req.body
        }
        await AppDataSource.createQueryBuilder()
        .insert()
        .into('message')
        .values(tempMessageObj)
        .execute()

        res.json({
            result: true,
            data: tempMessageObj
        })

    } catch (error) {
        console.log(error)
    }
}