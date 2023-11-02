import express, { Router } from 'express'
import { AddAssignment, DeleteAssignment, GetAssignments, ModifyAssignment } from "../controll/CAssignment";

const assignmentRouter: Router = express.Router()

//AssignmentAPI
assignmentRouter.get('/get', GetAssignments);
assignmentRouter.post('/add', AddAssignment)
assignmentRouter.patch('/update', ModifyAssignment)
assignmentRouter.delete('/delete', DeleteAssignment)

export default assignmentRouter