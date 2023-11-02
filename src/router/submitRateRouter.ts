import express, { Router } from 'express'
import { AddSubmitRate, CalCulateSubmitRate, CalculateAllSubmitRate, GetSubmitRates } from "../controll/CSubmitRate";

const submitRateRouter: Router = express.Router()

//SubmitRateAPI
submitRateRouter.get('/get', GetSubmitRates);
submitRateRouter.post('/add', AddSubmitRate)
submitRateRouter.patch('/calculate', CalCulateSubmitRate)
submitRateRouter.patch('/calculate-all', CalculateAllSubmitRate)

export default submitRateRouter