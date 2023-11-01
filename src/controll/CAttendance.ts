import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Attendance } from "../model/MAttendance";
import { ConnectionPoolClosedEvent } from "typeorm";

export async function GetAttendances(req: Request, res: Response) {
    const { studyId } = req.params
    const attendanceRepository = AppDataSource.getRepository(Attendance)

    try {
        const result = await attendanceRepository
        .find({where: {studyId: studyId}})

        res.json({
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddAttendanceBySchedule(req: Request, res: Response) {
    const { users, scheduleId, studyId } = req.body

    try {
        const data = []

        for(let user of users) {
            const tempAttendanceObj = {
                isAttended: false, 
                scheduleId, 
                studyId,
                userId: user.id
            }
            data.push(tempAttendanceObj)

            await AppDataSource.createQueryBuilder()
            .insert()
            .into('attendance')
            .values(tempAttendanceObj)
            .execute()

            console.log(user)
        }

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddAttendanceByUser(req: Request, res: Response) {
    const { schedules, userId, studyId } = req.body

    try {
        const data = []

        for(let schedule of schedules) {
            const tempAttendanceObj = {
                isAttended: false, 
                userId, studyId, 
                scheduleId: schedule.id
            }
            data.push(tempAttendanceObj)

            await AppDataSource.createQueryBuilder()
            .insert()
            .into('attendance')
            .values(tempAttendanceObj)
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
export async function CheckAttendance(req: Request, res: Response) {
    const { scheduleId, userId, isAttended } = req.body

    try {        
        await AppDataSource.createQueryBuilder()
        .update('attendance')
        .set({ isAttended: !isAttended })
        .where('userId= :userId and scheduleId= :scheduleId', {userId: userId, scheduleId: scheduleId})
        .execute()

        res.json({
            result: true
        })

    } catch (error) {
        console.log(error)
    }
}