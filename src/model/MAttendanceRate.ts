import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./MUser";
import { Study } from "./MStudy";

@Entity()
export class AttendanceRate {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    rate: string;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;


    @OneToOne(() => User, user => user.attendanceRate, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;


    @ManyToOne(() => Study, study => study.attendanceRates, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study

    @Column()
    studyId: string;

    @Column()
    userId: string;
}