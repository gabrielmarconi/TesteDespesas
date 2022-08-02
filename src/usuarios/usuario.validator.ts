import { IsEmail, IsString, MaxLength } from "class-validator"

export class UsuarioValidator {
    @IsString()
    @MaxLength(100)
    nomeUsuario: string

    @IsString()
    @MaxLength(255)
    senha: string

    @IsString()
    @MaxLength(255)
    @IsEmail()
    email: string
}