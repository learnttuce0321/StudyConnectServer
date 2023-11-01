import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Assignment } from "./MAssignment";
import { Attendance } from "./MAttendance";
import { AttendanceRate } from "./MAttendanceRate";
import { Fine } from "./MFine";
import { Message } from "./MMessage";
import { Schedule } from "./MSchedule";
import { Submit } from "./MSubmit";
import { SubmitRate } from "./MSubmitRate";
import { User } from "./MUser";

@Entity()
export class Study {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;


    @OneToMany(() => Assignment, assignment => assignment.study, {cascade: true})
    assignments: Array<Assignment>;

    @OneToMany(() => Attendance, attendace => attendace.study, {cascade: true})
    attendaces: Array<Attendance>;

    @OneToMany(() => AttendanceRate, attendanceRate => attendanceRate.study, {cascade: true})
    attendanceRates: Array<AttendanceRate>

    @OneToMany(() => Fine, fine => fine.study, {cascade: true})
    fines: Array<Fine>

    @OneToMany(() => Message, message => message.study, {cascade: true})
    messages: Array<Message>

    @OneToMany(() => Schedule, schedule => schedule.study, {cascade: true})
    schedules: Array<Schedule>

    @OneToMany(() => Submit, submit => submit.study, {cascade: true})
    submits: Array<Submit>

    @OneToMany(() => SubmitRate, submitRate => submitRate.study, {cascade: true})
    submitRates: Array<SubmitRate>

    @OneToMany(() => User, user => user.study, {cascade: true})
    users: Array<User>
}

