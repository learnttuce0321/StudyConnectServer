import express, { Router } from 'express'
import { AddStudy, DeleteStudy, GetStudies, GetStudyData, ModifyStudy } from "../controll/CStudy";

const studyRouter: Router = express.Router()

// StudyAPI
studyRouter.get('/get', GetStudies);
studyRouter.get('/study/:studyId/get', GetStudyData)
studyRouter.post('/add', AddStudy);
studyRouter.patch('/update', ModifyStudy);
studyRouter.delete('/delete', DeleteStudy);

export default studyRouter