import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Despesas' })
export class DespesaEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    idDespesa: number;

    @Column({ nullable: false })
    descricao: string;

    @Column({ type: 'datetime', nullable: false })
    dataHora: string;

    @Column({ type: 'integer', nullable: false })
    usuario: number;

    @Column({ type: 'float', nullable: false })
    valor: number;
}