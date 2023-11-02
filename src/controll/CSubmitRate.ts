import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Submit } from "../model/MSubmit";
import { SubmitRate } from "../model/MSubmitRate";
import { User } from "../model/MUser";

//////////////////////////////
// GET
export async function GetSubmitRates(req: Request, res: Response) {
    const { studyId } = req.params
    const submitRateRepository = AppDataSource.getRepository(SubmitRate)

    try {
        const result = await submitRateRepository
        .find({where: {studyId: studyId}})

        res.json({
            data:result
        })

    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////
// POST
export async function AddSubmitRate(req: Request, res: Response) {
    try {
        const tempSubmitRateObj = {
            ...req.body, 
            rate: '0.0'
        }

        await AppDataSource.createQueryBuilder()
        .insert()
        .into('submit_rate')
        .values(tempSubmitRateObj)
        .execute()

        res.json({
            result: true,
            data: tempSubmitRateObj
        })

    } catch (error) {
        console.log(error)
    }
}
export async function CalCulateSubmitRate(req: Request, res: Response) {
    const { userId, studyId } = req.body
    const submitRepository = AppDataSource.getRepository(Submit)
    const submitRateRepository = AppDataSource.getRepository(SubmitRate)
    
    try {
        const result = await submitRepository.find({where: {userId: userId, studyId: studyId}})
    
        const totalCheckedSubmitLength: number = (result.filter(userAttendace => userAttendace.isSubmitted)).length
        const submitRate: string = (totalCheckedSubmitLength * 100 / result.length).toFixed(1)

        await AppDataSource.createQueryBuilder()
        .update('submit_rate')
        .set({rate: submitRate})
        .where('userId= :userId and studyId= :studyId', {userId: userId, studyId: studyId})
        .execute()

        const data = await submitRateRepository
        .findOne({where: {userId: userId, studyId: studyId}})
        
        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}
export async function CalculateAllSubmitRate(req: Request, res: Response) {
    const { studyId } = req.body
    const userRepository = AppDataSource.getRepository(User)
    const submitRepository = AppDataSource.getRepository(Submit)
    const submitRateRepository = AppDataSource.getRepository(SubmitRate)

    try {
        const userResult = await userRepository
        .find({where: {studyId: studyId}})

        for(let user of userResult) {
            const userAttendances = await submitRepository.find({where: {userId: user.id}})

            const totalCheckedSubmitLength: number = (userAttendances.filter(userAttendace => userAttendace.isSubmitted)).length
            const submitRate: string = (totalCheckedSubmitLength * 100 / userAttendances.length).toFixed(1)        

            await AppDataSource.createQueryBuilder()
            .update('submit_rate')
            .set({rate: submitRate})
            .where('userId= :userId and studyId= :studyId', {userId: user.id, studyId: studyId})
            .execute()
        }

        const data = await submitRateRepository
        .find({where: {studyId: studyId}})

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}