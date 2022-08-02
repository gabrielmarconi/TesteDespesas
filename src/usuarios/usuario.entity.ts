import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Usuarios' })
export class UsuarioEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    idUsuario: number;

    @Column({ nullable: false, length: 100 })
    nomeUsuario: string;

    @Column({ nullable: false, length: 255 })
    senha: string;

    @Column({ nullable: false, length: 255 })
    email: string;
}