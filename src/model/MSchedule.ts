import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Attendance } from "./MAttendance";
import { Study } from "./MStudy";

@Entity()
export class Schedule {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    date: string;

    @Column()
    location: string;

    @Column()
    time: string;
    
    @CreateDateColumn({name: 'created_at'})
    created_at: Date;


    @OneToMany(() => Attendance, attendace => attendace.schedule, {cascade: true})
    attendances: Array<Attendance>;

    @ManyToOne(() => Study, study => study.schedules, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study

    @Column()
    studyId: string;
}