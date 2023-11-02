import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Submit } from "../model/MSubmit";

//////////////////////////////
// GET
export async function GetSubmits(req: Request, res: Response) {
    const { studyId } = req.params
    const submitRepository = AppDataSource.getRepository(Submit)

    try {
        const result = await submitRepository
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
export async function AddSubmitByAssignment(req: Request, res: Response) {
    const { users, assignmentId, studyId } = req.body

    try {
        const data = []

        for(let user of users) {
            const tempAssignmentObj = {
                isSubmitted: false, 
                assignmentId, 
                studyId, 
                userId: user.id
            }
            data.push(tempAssignmentObj)

            await AppDataSource.createQueryBuilder()
            .insert()
            .into('submit')
            .values(tempAssignmentObj)
            .execute()
        }

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddSubmitByUser(req: Request, res: Response) {
    const { assignments, userId, studyId } = req.body

    try {
        const data = []

        for(let assignment of assignments) {
            const tempAssignmentObj = {
                isSubmitted: false, 
                userId, 
                studyId, 
                assignmentId: assignment.id
            }
            data.push(tempAssignmentObj)

            await AppDataSource.createQueryBuilder()
            .insert()
            .into('submit')
            .values(tempAssignmentObj)
            .execute()
        }

        res.json({
            result: true,
            data
        })
        
    } catch (error) {
        console.log(error)
    }
}
export async function CheckSubmit(req: Request, res: Response) {
    const { assignmentId, userId, isSubmitted } = req.body

    try {
        await AppDataSource.createQueryBuilder()
        .update('submit')
        .set({isSubmitted: !isSubmitted})
        .where('userId= :userId and assignmentId= :assignmentId', {userId: userId, assignmentId: assignmentId})
        .execute()

        res.json({
            result:true
        })

    } catch (error) {
        console.log(error)
    }
}