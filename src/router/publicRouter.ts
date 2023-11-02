import express, { Router } from 'express'
import assignmentRouter from './assignmentRouter'
import attendanceRouter from './attendanceRouter'
import attendanceRateRouter from './attendanceRateRouter'
import fineRouter from './fineRouter'
import messageRouter from './messageRouter'
import scheduleRouter from './scheduleRouter'
import submitRouter from './submitRouter'
import submitRateRouter from './submitRateRouter'
import userRouter from './userRouter'

const publicRouter: Router = express.Router()

publicRouter.use('/assignment', assignmentRouter)
publicRouter.use('/attendance', attendanceRouter)
publicRouter.use('/attendance-rate', attendanceRateRouter)
publicRouter.use('/fine', fineRouter)
publicRouter.use('/message', messageRouter)
publicRouter.use('/schedule', scheduleRouter)
publicRouter.use('/submit', submitRouter)
publicRouter.use('/submit-rate', submitRateRouter)
publicRouter.use('/user', userRouter)

export default publicRouter