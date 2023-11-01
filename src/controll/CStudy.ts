import { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { Study } from "../model/MStudy";
import { User } from "../model/MUser"
import { Attendance } from "../model/MAttendance";
import { Assignment } from "../model/MAssignment";
import { Fine } from "../model/MFine";
import { Message } from "../model/MMessage";
import { Schedule } from "../model/MSchedule";
import { Submit } from "../model/MSubmit";
import { AttendanceRate } from "../model/MAttendanceRate";
import { SubmitRate } from "../model/MSubmitRate";


const studyRepository = AppDataSource.getRepository(Study)
function GetData() {
    return studyRepository.find({order: {created_at: 'ASC'}})
}
export async function GetStudies(req: Request, res: Response) {
    try {
        const data = await GetData()

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}
export async function AddStudy(req:Request, res: Response) {
    try {
        await AppDataSource.createQueryBuilder()
        .insert()
        .into('study')
        .values(req.body)
        .execute()

        const data = await GetData()

        res.json({
            result: true,
            data
        })

    } catch (error) {
        console.log(error)
    }
}
export async function DeleteStudy(req:Request, res: Response) {
    const { id } = req.body

    try {
        await AppDataSource.createQueryBuilder()
        .delete()
        .from('study')
        .where('id= :id', {id: id})
        .execute()

        const data = await GetData()

        res.json({
            result: true,
            data
        })
        
    } catch (error) {
        console.log(error)
    }
}
export async function ModifyStudy(req:Request, res: Response) {
    const { id, name } = req.body

    try {
        await AppDataSource.createQueryBuilder()
        .update('study')
        .set({name})
        .where('id= :id', {id: id})
        .execute()

        res.json({
            result: true
        })

    } catch (error) {
        console.log(error)
    }
}


const assignmentRepository = AppDataSource.getRepository(Assignment);
const attendanceRepository = AppDataSource.getRepository(Attendance);
const fineRepository = AppDataSource.getRepository(Fine);
const messageRepository = AppDataSource.getRepository(Message);
const scheduleRepository = AppDataSource.getRepository(Schedule);
const userRepository = AppDataSource.getRepository(User);
const submitRepository = AppDataSource.getRepository(Submit);
const attendanceRateRepository = AppDataSource.getRepository(AttendanceRate)
const submitRateRepository = AppDataSource.getRepository(SubmitRate)

export async function GetStudyData(req:Request, res: Response) {
    const { studyId } = req.params

    try {
        const userData = await userRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const assignmentData = await assignmentRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const submitData = await submitRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const submitRateData = await submitRateRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const scheduleData = await scheduleRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const attendanceData = await attendanceRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const attendanceRateData = await attendanceRateRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const messageData = await messageRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})
        const fineData = await fineRepository.find({where: {studyId: studyId}, order: {created_at: 'ASC'}})

        res.json({
            result: true,
            userData,
            assignmentData,
            submitData,
            submitRateData,
            scheduleData,
            attendanceData,
            attendanceRateData,
            messageData,
            fineData
        })

    } catch (error) {
        console.log(error)
    }
}