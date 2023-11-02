import express, { Router } from 'express'
import { AddSchedule, DeleteSchedule, GetSchedules, ModifySchedule } from "../controll/CSchedule";

const scheduleRouter: Router = express.Router()

// ScheduleAPI
scheduleRouter.get('/get', GetSchedules);
scheduleRouter.post('/add', AddSchedule);
scheduleRouter.patch('/update', ModifySchedule);
scheduleRouter.delete('/delete', DeleteSchedule);

export default scheduleRouter