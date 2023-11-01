import type { Request, Response } from "express";
import { AppDataSource } from "../model/data-source";
import { User } from "../model/MUser"
import { Attendance } from "../model/MAttendance";
import { Assignment } from "../model/MAssignment";
import { Fine } from "../model/MFine";
import { Message } from "../model/MMessage";
import { Schedule } from "../model/MSchedule";
import { Study } from "../model/MStudy";
import { Submit } from "../model/MSubmit";
import { AttendanceRate } from "../model/MAttendanceRate";
import { SubmitRate } from "../model/MSubmitRate";

const userRepository = AppDataSource.getRepository(User);


export async function GetUserByID(req:Request, res: Response) {
    const { id } = req.body
    await userRepository
    .findOne({where: {id: id}})
    .then(user => {
        res.send(user)
    })
    .catch(error => {
        console.log(error)
    })
}
export async function GetUsers(req: Request, res: Response) {
    await userRepository
    .find()
    .then(users => {
        res.send(users)
        console.log(users)
    })
    .catch(error => {
        console.log(error)
    })
}
export async function updateUser(req: Request, res: Response) {
    const { id } = req.body
    await AppDataSource.createQueryBuilder()
    .update('user')
    .set({name: 'Ju'})
    .where('id= :id', {id: id})
    .execute()
}
export async function deleteUser(req: Request, res: Response) {
    const { id } = req.body
    await AppDataSource.createQueryBuilder()
    .delete()
    .from('user')
    .where('id= :id', {id: id})
    .execute()
}

const assignmentRepository = AppDataSource.getRepository(Assignment);
const attendanceRepository = AppDataSource.getRepository(Attendance);
const fineRepository = AppDataSource.getRepository(Fine);
const messageRepository = AppDataSource.getRepository(Message);
const scheduleRepository = AppDataSource.getRepository(Schedule);
const studyRepository = AppDataSource.getRepository(Study);
const submitRepository = AppDataSource.getRepository(Submit);
const attendanceRateRepository = AppDataSource.getRepository(AttendanceRate)
const submitRateRepository = AppDataSource.getRepository(SubmitRate)
export async function _AddAssignment (req: Request, res: Response) {
    await assignmentRepository.save(req.body).then(data => res.send(data))
}
export async function _Addattendance (req: Request, res: Response) {
    const attendance = new Attendance()

    attendance.isAttended = req.body.isAttended
    attendance.scheduleId = req.body.scheduleId
    attendance.userId = req.body.userId
    attendance.studyId = req.body.studyId
    
    await attendanceRepository.save(attendance).then(data => res.json(data))
}
export async function _AddFine (req: Request, res: Response) {
    await fineRepository.save(req.body).then(data => res.send(data))
}
export async function _AddMessage (req: Request, res: Response) {
    await messageRepository.save(req.body).then(data => res.send(data))
}
export async function _AddSchedule (req: Request, res: Response) {
    await scheduleRepository.save(req.body).then(data => res.send(data))
}
export async function _AddS (req: Request, res: Response) {
    await studyRepository.save(req.body).then(data => res.send(data))
}
export async function _AddSubmit (req: Request, res: Response) {
    await submitRepository.save(req.body).then(data => res.send(data))
}
export async function _AddUser (req: Request, res: Response){
    await userRepository
    .save(req.body) //DB저장
    .then((user) => {
        res.send(user); //저장된 정보 response
    })
    .catch((err) => console.log(err));
}
export async function _AddAttendanceRate(req: Request, res: Response){
    console.log(req.body)
    await attendanceRateRepository.save(req.body)
    .then(data => res.json(data))
    
}
export async function _AddsubmitRate(req: Request, res: Response){
    await submitRateRepository.save(req.body).then(data => res.json(data))
}