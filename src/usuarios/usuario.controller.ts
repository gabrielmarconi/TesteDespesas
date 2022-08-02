import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UsuarioEntity } from "./usuario.entity"
import { UsuarioValidator } from "./usuario.validator"

@Controller('/usuarios')
export class UsuarioController {
    constructor(
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>
    ){}

    @Post()
    public async create(@Body() body: UsuarioValidator): Promise<{ data: UsuarioEntity }> {
        const usuarioCriado = await this.usuarioRepository.save(body)
        return { data: usuarioCriado }
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) idUsuario: number): Promise<{ data: UsuarioEntity }> {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario } })
        if (!usuario) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com o id ${idUsuario}`)
        }
        return { data: usuario }
    }

    @Get()
    public async getAll(): Promise<{ data: UsuarioEntity[] }> {
        const list = await this.usuarioRepository.find()
        return { data: list }
    }

    @Put(':id')
    public async update(@Param('id', ParseIntPipe) idUsuario: number, @Body() body: UsuarioEntity): Promise<{ data: UsuarioEntity}> {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario } })

        if (!usuario) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com o id ${idUsuario}`)
        }

        await this.usuarioRepository.update({ idUsuario }, body)
        
        return { data: await this.usuarioRepository.findOne({ where: { idUsuario } })}
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) idUsuario: number): Promise<{ data: string}> {
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario } })

        if (!usuario) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com o id ${idUsuario}`)
        }

        this.usuarioRepository.delete(idUsuario)

        return { data: `O usuário com id ${idUsuario}, foi deletado com sucesso.` }
    }

}