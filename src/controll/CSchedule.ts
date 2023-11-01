import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Schedule } from "../model/MSchedule";

export async function GetSchedules(req: Request, res: Response) {
    const { studyId } = req.params
    const scheduleRepository = AppDataSource.getRepository(Schedule)

    try {
        const result = await scheduleRepository
        .find({where: {studyId: studyId}})

        res.json({
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddSchedule(req: Request, res: Response) {
    try {
        const tempScheduleObj = {
            ...req.body
        }

        await AppDataSource.createQueryBuilder()
        .insert()
        .into('schedule')
        .values(tempScheduleObj)
        .execute()

        res.json({
            result: true,
            data: tempScheduleObj
        })

    } catch (error) {
        console.log(error)
    }
}
export async function DeleteSchedule(req: Request, res: Response) {
    const { id } = req.body

    try {
        await AppDataSource.createQueryBuilder()
        .delete()
        .from('schedule')
        .where('id= :id', {id: id})
        .execute()

        res.json({
            result: true
        })

    } catch (error) {
        console.log(error)
    }
}
export async function ModifySchedule(req: Request, res: Response) {
    const { id, name, date, location, time } = req.body
    const scheduleRepository = AppDataSource.getRepository(Schedule)

    try {
        await AppDataSource.createQueryBuilder()
        .update('schedule')
        .set({name, date, location, time})
        .where('id= :id', {id: id})
        .execute()

        const data = await scheduleRepository
        .findOne({where: {id: id}})

        res.json({
            result: true,
            data
        })
    } catch (error) {
        console.log(error)
    }
}