import { IsDate, IsDateString, IsEmail, IsNumber, IsString, MaxLength, Min } from "class-validator"

export class DespesaValidator {
    @IsString()
    @MaxLength(191)
    descricao: string

    @IsDateString()    
    dataHora: string

    @IsNumber()
    usuario: number

    @IsNumber()
    @Min(0)    
    valor: number
}