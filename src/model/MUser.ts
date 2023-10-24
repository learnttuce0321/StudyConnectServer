import { Entity, PrimaryColumn, Column } from "typeorm";

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
}