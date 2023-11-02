import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Study } from "./MStudy";
import { User } from "./MUser";

@Entity()
export class Message {
    @PrimaryColumn()
    id: string;

    @Column()
    content: string;

    @Column()
    date: string;

    @Column()
    time: string;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @ManyToOne(() => User, user => user.messages, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @ManyToOne(() => Study, study => study.messages, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study;

    @Column()
    userId: string;

    @Column()
    studyId: string;
}