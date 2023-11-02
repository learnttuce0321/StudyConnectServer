import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Fine } from "../model/MFine";

//////////////////////////////
// GET
export async function Getfines(req: Request, res: Response) {
    const { studyId } = req.params
    const fineRepository = AppDataSource.getRepository(Fine)

    try {
        const result = await fineRepository
        .find({where: {studyId: studyId}})

        res.json({
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////
// POST
export async function AddFine(req: Request, res: Response) {
    try {
        const tempFineObj = {
            ...req.body,
            isPaid: false
        }
        await AppDataSource.createQueryBuilder()
        .insert()
        .into('fine')
        .values(tempFineObj)
        .execute()

        res.json({
            result: true,
            data: tempFineObj
        })

    } catch (error) {
        console.log(error)
    }
}
export async function CheckFine(req: Request, res: Response) {
    const { id } = req.body
    const fineRepository = AppDataSource.getRepository(Fine)

    try {
        const result = await fineRepository
        .findOne({where: {id: id}})

        await AppDataSource.createQueryBuilder()
        .update('fine')
        .set({isPaid: !result?.isPaid})
        .execute()

        const data = await fineRepository
        .findOne({where: {id: id}})

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////
// DELETE
export async function DeleteFine(req: Request, res: Response) {
    const { id } = req.body

    try {
        await AppDataSource.createQueryBuilder()
        .delete()
        .from('fine')
        .where('id= :id', {id: id})
        .execute()

        res.json({
            result: true
        })

    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////
// UPDATE
export async function ModifyFine(req: Request, res: Response) {
    const { id, deadLine, fine } = req.body
    const fineRepository = AppDataSource.getRepository(Fine)

    try {
        await AppDataSource.createQueryBuilder()
        .update('fine')
        .set({deadLine, fine})
        .where('id= :id', {id: id})
        .execute()

        const data = await fineRepository
        .findOne({where: {id: id}})

        console.log(data)
        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}