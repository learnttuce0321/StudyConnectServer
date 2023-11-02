import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Study } from "./MStudy";
import { Schedule } from "./MSchedule";
import { User } from "./MUser";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isAttended: boolean;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @ManyToOne(() => User, user => user.attendances, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @ManyToOne(() => Schedule, schedule => schedule.attendances, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    schedule: Schedule;

    @ManyToOne(() => Study, study => study.attendaces, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study

    @Column()
    scheduleId: string;

    @Column()
    userId: string;

    @Column()
    studyId: string;
}