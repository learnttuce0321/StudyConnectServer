import { Request, Response } from "express";
import { Attendance } from "../model/MAttendance";
import { AppDataSource } from "../model/data-source";
import { AttendanceRate } from "../model/MAttendanceRate";
import { User } from "../model/MUser";

export async function GetAttendanceRates(req: Request, res: Response) {
    const { studyId } = req.params
    const attendnaceRateRepository = AppDataSource.getRepository(AttendanceRate)

    try {
        const result = await attendnaceRateRepository
        .find({where: {studyId: studyId}})

        res.json({
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddAttendanceRate(req: Request, res: Response) {
    try {
        const tempAttendanceRateObj = {
            ...req.body, 
            rate: '0.0'
        }
        
        await AppDataSource.createQueryBuilder()
        .insert()
        .into('attendance_rate')
        .values(tempAttendanceRateObj)
        .execute()

        res.json({
            result: true,
            data: tempAttendanceRateObj
        })

    } catch (error) {
        console.log(error)
    }
}
export async function CalCulateAttendanceRate(req: Request, res: Response) {
    const { userId, studyId } = req.body
    const attendanceRepository = AppDataSource.getRepository(Attendance)
    const attendnaceRateRepository = AppDataSource.getRepository(AttendanceRate)

    try {
        const result = await attendanceRepository.find({where: {userId: userId, studyId: studyId}})
    
        const totalCheckedAttendceLength: number = (result.filter(userAttendace => userAttendace.isAttended)).length
        const attendanceRate: string = (totalCheckedAttendceLength * 100 / result.length).toFixed(1)

        await AppDataSource.createQueryBuilder()
        .update('attendance_rate')
        .set({rate: attendanceRate})
        .where('userId= :userId and studyId= :studyId', {userId: userId, studyId: studyId})
        .execute()
        
        const data = await attendnaceRateRepository
        .findOne({where: {userId: userId, studyId: studyId}})

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}
export async function CalculateAllAttendanceRate(req: Request, res: Response) {
    const { studyId } = req.body
    const userRepository = AppDataSource.getRepository(User)
    const attendanceRepository = AppDataSource.getRepository(Attendance)
    const attendanceRateRepository = AppDataSource.getRepository(AttendanceRate)

    try {
        const userResult = await userRepository
        .find({where: {studyId: studyId}})

        for(let user of userResult) {
            const userAttendances = await attendanceRepository.find({where: {userId: user.id}})

            const totalCheckedAttendceLength: number = (userAttendances.filter(userAttendace => userAttendace.isAttended)).length
            const attendanceRate: string = (totalCheckedAttendceLength * 100 / userAttendances.length).toFixed(1)

            await AppDataSource.createQueryBuilder()
            .update('attendance_rate')
            .set({rate: attendanceRate})
            .where('userId= :userId and studyId= :studyId', {userId: user.id, studyId: studyId})
            .execute()
        }

        const data = await attendanceRateRepository
        .find({where: {studyId: studyId}})

        res.json({
            result: true,
            data
        })
        
    } catch (error) {
        console.log(error)
    }
}