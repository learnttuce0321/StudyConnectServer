// import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from './MUser';
import { Assignment } from './MAssignment';
import { Attendance } from './MAttendance';
import { AttendanceRate } from './MAttendanceRate';
import { Fine } from './MFine';
import { Message } from './MMessage';
import { Schedule } from './MSchedule';
import { Study } from './MStudy';
import { Submit } from './MSubmit';
import { SubmitRate } from './MSubmitRate';
import { info } from '../config/config';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'Jutee0415!',
    database: 'studyuser',
    entities: [
        Assignment,
        Attendance,
        AttendanceRate,
        Fine,
        Message,
        Schedule,
        Study,
        Submit,
        SubmitRate,
        User,
    ],
    synchronize: true,
    logging: true,
    migrations: [],
    subscribers: [],
});
