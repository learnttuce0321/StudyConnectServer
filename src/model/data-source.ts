// import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from './MUser';
import { Assignment } from "./MAssignment";
import { Attendance } from "./MAttendance";
import { AttendanceRate } from "./MAttendanceRate";
import { Fine } from "./MFine";
import { Message } from "./MMessage";
import { Schedule } from "./MSchedule";
import { Study } from "./MStudy";
import { Submit } from "./MSubmit";
import { SubmitRate } from "./MSubmitRate";
import { info } from "../config/config";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: info.host,
    port: info.port,
    username: info.username,
    password: info.password,
    database: info.database,
    entities: [Assignment, Attendance, AttendanceRate, Fine, Message, Schedule, Study, Submit, SubmitRate, User],
    // Assignment, Attendance, AttendanceRate, Fine, Message, Schedule, Study, Submit, SubmitRate, User
    synchronize: true,
    logging: true,
    migrations: [],
  subscribers: [],
  });