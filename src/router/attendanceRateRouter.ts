import express, { Router } from 'express'
import { AddAttendanceRate, CalCulateAttendanceRate, CalculateAllAttendanceRate, GetAttendanceRates } from "../controll/CAttendanceRate";

const attendanceRateRouter: Router = express.Router()

//AttendanceRateAPI
attendanceRateRouter.get('/get', GetAttendanceRates);
attendanceRateRouter.post('/add', AddAttendanceRate)
attendanceRateRouter.patch('/calculate', CalCulateAttendanceRate)
attendanceRateRouter.patch('/calculate-all', CalculateAllAttendanceRate)

export default attendanceRateRouter