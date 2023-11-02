import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinTable, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Submit } from "./MSubmit";
import { Attendance } from "./MAttendance";
import { SubmitRate } from "./MSubmitRate";
import { AttendanceRate } from "./MAttendanceRate";
import { Fine } from "./MFine";
import { Message } from "./MMessage";
import { Study } from "./MStudy";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    age: number;

    @Column()
    sex: string;

    @Column()
    info: string;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date

    @OneToOne(() => SubmitRate, submitRate => submitRate.user, {cascade: true})
    submitRate: SubmitRate;

    @OneToOne(() => AttendanceRate, attendanceRate => attendanceRate.user, {cascade: true})
    attendanceRate: AttendanceRate;

    @OneToMany(() => Submit, submit => submit.user, {cascade: true})
    submits: Array<Submit>;

    @OneToMany(() => Attendance, attendace => attendace.user, {cascade: true})
    attendances: Array<Attendance>;

    @OneToMany(() => Fine, fine => fine.user, {cascade: true})
    fines: Array<Fine>;

    @OneToMany(() => Message, message => message.user, {cascade: true})
    messages: Array<Message>;

    @ManyToOne(() => Study, study => study.users, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study

    @Column()
    studyId: string;
}