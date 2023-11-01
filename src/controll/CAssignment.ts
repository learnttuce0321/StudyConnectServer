import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Assignment } from "../model/MAssignment";

export async function GetAssignments(req: Request, res: Response) {
    const { studyId } = req.params
    const assignmentRepository = AppDataSource.getRepository(Assignment)

    try {
        const result = await assignmentRepository
        .find({where: {studyId: studyId}})

        res.json({
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddAssignment(req: Request, res: Response) {
    try {
        const tempAssignmentObj = {
            ...req.body
        }

        await AppDataSource.createQueryBuilder()
        .insert()
        .into('assignment')
        .values(tempAssignmentObj)
        .execute()

        res.json({
            result: true,
            data: tempAssignmentObj
        })

    } catch (error) {
        console.log(error)
    }
}
export async function DeleteAssignment(req: Request, res: Response) {
    const { id } = req.body

    try {
        await AppDataSource.createQueryBuilder()
        .delete()
        .from('assignment')
        .where('id= :id', {id: id})
        .execute()

        res.json({
            result: true
        })  

    } catch (error) {
        console.log(error)
    }
}
export async function ModifyAssignment(req: Request, res: Response) {
    const { id, title, content, deadLine } = req.body
    const assignmentRepository = AppDataSource.getRepository(Assignment)

    try {
        await AppDataSource.createQueryBuilder()
        .update('assignment')
        .set({title, content, deadLine})
        .where('id= :id', {id: id})
        .execute()

        const data = await assignmentRepository
        .findOne({where: {id: id}})

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}