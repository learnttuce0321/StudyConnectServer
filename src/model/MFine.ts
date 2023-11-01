import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./MUser";
import { Study } from "./MStudy";

@Entity()
export class Fine {
    @PrimaryColumn()
    id: string;

    @Column()
    deadLine: string;

    @Column()
    fine: number;

    @Column()
    isPaid: boolean;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;


    @ManyToOne(() => User, user => user.fines, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User

    @ManyToOne(() => Study, study => study.fines, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    study: Study

    @Column()
    userId: string;

    @Column()
    studyId: string;
}