import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./MUser";
import { Assignment } from "./MAssignment";
import { Study } from "./MStudy";

@Entity()
export class Submit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isSubmitted: boolean;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;


    @ManyToOne(() => User, user => user.submits, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @ManyToOne(() => Assignment, assignment => assignment.submits, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    assignment: Assignment;

    @ManyToOne(() => Study, study => study.submits, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study
    
    @Column()
    userId: string;

    @Column()
    studyId: string;

    @Column()
    assignmentId: string;
}