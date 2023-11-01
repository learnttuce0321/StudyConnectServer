import { AppDataSource } from "../model/data-source";
import express, { Express } from "express";
import path from 'path'
import mainRouter from '../router/mainRouter'
import { _AddAssignment, _AddFine, _AddMessage, _AddSchedule, _AddS, _AddSubmit, _AddUser, _Addattendance, GetUserByID, deleteUser, updateUser, _AddAttendanceRate, _AddsubmitRate } from "../controll/CTemp";
import { AddUser, GetUsers, ModifyUserInfo } from "../controll/CUser";
import { AddStudy, DeleteStudy, GetStudies, GetStudyData, ModifyStudy } from "../controll/CStudy";
import { AddSchedule, DeleteSchedule, GetSchedules, ModifySchedule } from "../controll/CSchedule";
import { AddAttendanceBySchedule, AddAttendanceByUser, CheckAttendance, GetAttendances } from "../controll/CAttendance";
import { AddAssignment, DeleteAssignment, GetAssignments, ModifyAssignment } from "../controll/CAssignment";
import { AddSubmitByAssignment, AddSubmitByUser, CheckSubmit, GetSubmits } from "../controll/CSubmit";
import { AddMessage, GetMessages } from "../controll/CMessage";
import { AddFine, CheckFine, DeleteFine, Getfines, ModifyFine } from "../controll/CFine";
import { AddAttendanceRate, CalCulateAttendanceRate, CalculateAllAttendanceRate, GetAttendanceRates } from "../controll/CAttendanceRate";
import { AddSubmitRate, CalCulateSubmitRate, CalculateAllSubmitRate, GetSubmitRates } from "../controll/CSubmitRate";

const app: Express = express();
const PORT: number = 8000

AppDataSource.initialize().then(async () => {

    app.use(express.static(path.join(__dirname, '../../../client/build')))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../client/build/index.html'))
    })
    app.post('/finduser', GetUserByID)
    // app.post('/findusers', GetUsers)
    app.patch('/updateuser', updateUser)
    app.delete('/deleteuser', deleteUser)

    app.post('/user', _AddUser)
    app.post('/assignment', _AddAssignment);
    app.post('/attendance', _Addattendance);
    app.post('/message', _AddMessage);
    app.post('/schedule', _AddSchedule);
    app.post('/s', _AddS);
    app.post('/submit', _AddSubmit);
    app.post('/attendanceRate', _AddAttendanceRate)
    app.post('/submitRate', _AddsubmitRate)

    // StudyAPI
    app.get('/get', GetStudies);
    app.get('/study/:studyId/get', GetStudyData)
    app.post('/add', AddStudy);
    app.patch('/update', ModifyStudy);
    app.delete('/delete', DeleteStudy);

    // UserAPI
    app.get('/study/:studyId/user/get', GetUsers);
    app.post('/study/:studyId/user/add', AddUser);
    app.patch('/study/:studyId/user/modify', ModifyUserInfo);
    
    // ScheduleAPI
    app.get('/study/:studyId/schedule/get', GetSchedules);
    app.post('/study/:studyId/schedule/add', AddSchedule);
    app.patch('/study/:studyId/schedule/update', ModifySchedule);
    app.delete('/study/:studyId/schedule/delete', DeleteSchedule);

    //AttendanceAPI
    app.get('/study/:studyId/attendance/get', GetAttendances);
    app.post('/study/:studyId/attendance/add-schedule', AddAttendanceBySchedule);
    app.post('/study/:studyId/attendance/add-user', AddAttendanceByUser);
    app.patch('/study/:studyId/attendance/check', CheckAttendance);

    //AttendanceRateAPI
    app.get('/study/:studyId/attendance-rate/get', GetAttendanceRates);
    app.post('/study/:studyId/attendance-rate/add', AddAttendanceRate)
    app.patch('/study/:studyId/attendance-rate/calculate', CalCulateAttendanceRate)
    app.patch('/study/:studyId/attendance-rate/calculate-all', CalculateAllAttendanceRate)

    //AssignmentAPI
    app.get('/study/:studyId/assignment/get', GetAssignments);
    app.post('/study/:studyId/assignment/add', AddAssignment)
    app.patch('/study/:studyId/assignment/update', ModifyAssignment)
    app.delete('/study/:studyId/assignment/delete', DeleteAssignment)

    //SubmitAPI
    app.get('/study/:studyId/submit/get', GetSubmits);
    app.post('/study/:studyId/submit/add-assignment', AddSubmitByAssignment)
    app.post('/study/:studyId/submit/add-user', AddSubmitByUser)
    app.patch('/study/:studyId/submit/check', CheckSubmit)

    //SubmitRateAPI
    app.get('/study/:studyId/submit-rate/get', GetSubmitRates);
    app.post('/study/:studyId/submit-rate/add', AddSubmitRate)
    app.patch('/study/:studyId/submit-rate/calculate', CalCulateSubmitRate)
    app.patch('/study/:studyId/submit-rate/calculate-all', CalculateAllSubmitRate)

    //MessageAPI
    app.get('/study/:studyId/message/get', GetMessages);
    app.post('/study/:studyId/message/add', AddMessage)

    //FineAPI
    app.get('/study/:studyId/fine/get', Getfines);
    app.post('/study/:studyId/fine/add', AddFine);
    app.patch('/study/:studyId/fine/update', ModifyFine);
    app.patch('/study/:studyId/fine/check', CheckFine);
    app.delete('/study/:studyId/fine/delete', DeleteFine);

    app.listen(PORT, () => {
        console.log('localhost:8000');
    }) 

}).catch(error => console.log(error))
