import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Study } from "./MStudy";
import { User } from "./MUser";

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

    @Column()
    userId: string;

    @ManyToOne(() => Study, study => study.attendanceRates, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study

    @Column()
    studyId: string;
}