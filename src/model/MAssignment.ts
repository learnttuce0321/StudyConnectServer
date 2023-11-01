import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Submit } from "./MSubmit";
import { Study } from "./MStudy";

@Entity()
export class Assignment {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    deadLine: string;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @OneToMany(() => Submit, submit => submit.assignment, {cascade: true})
    submits: Array<Submit>;

    @ManyToOne(() => Study, study => study.assignments, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study;

    @Column()
    studyId: string;
}