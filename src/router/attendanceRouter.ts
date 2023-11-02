import express, { Router } from 'express'
import { AddAttendanceBySchedule, AddAttendanceByUser, CheckAttendance, GetAttendances } from "../controll/CAttendance";

const attendanceRouter: Router = express.Router()

//AttendanceAPI
attendanceRouter.get('/get', GetAttendances);
attendanceRouter.post('/add-schedule', AddAttendanceBySchedule);
attendanceRouter.post('/add-user', AddAttendanceByUser);
attendanceRouter.patch('/check', CheckAttendance);

export default attendanceRouter