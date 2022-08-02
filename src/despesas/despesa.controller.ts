import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { sendMail } from "src/rotinas/enviarEmail/enviarEmail"
import { UsuarioEntity } from "src/usuarios/usuario.entity"
import { Repository } from "typeorm"
import { DespesaEntity } from "./despesa.entity"
import { DespesaValidator } from "./despesa.validator"

@Controller('/despesas')
export class DespesaController {
    constructor(
        @InjectRepository(DespesaEntity) private despesaRepository: Repository<DespesaEntity>,
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>
    ){}

    @Post()
    public async create(@Body() body: DespesaValidator): Promise<{ data: DespesaEntity }> {
        let idUsuario = body.usuario;
        let dataAtual = new Date();        

        const usuarioExistente = await this.usuarioRepository.findOne({ where: {idUsuario} })
        if (!usuarioExistente) {
            throw new NotFoundException(`Não existe usuário cadastrado com o id ${idUsuario}`)
        }
        
        //trata a dataHora Informada
        if (body.dataHora) {
            let data = new Date(body.dataHora)
            if (data > dataAtual)
                throw new NotFoundException('A data não pode ser uma data futura.')
        }        

        const despesaCriada = await this.despesaRepository.save(body)
        if (despesaCriada){
            // Envia o e-mail para o usuário da despesa
            await sendMail(usuarioExistente.email);
        }
        
        return { data: despesaCriada }
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) idDespesa: number): Promise<{ data: DespesaEntity }> {
        const despesa = await this.despesaRepository.findOne({ where: { idDespesa } })
        if (!despesa) {
            throw new NotFoundException(`Não foi encontrada nenhuma despesa com o id ${idDespesa}`)
        }
        return { data: despesa }
    }

    @Get()
    public async getAll(): Promise<{ data: DespesaEntity[] }> {
        const list = await this.despesaRepository.find()
        return { data: list }
    }

    @Put(':id')
    public async update(@Param('id', ParseIntPipe) idDespesa: number, @Body() body: DespesaEntity): Promise<{ data: DespesaEntity}> {
        let idUsuario = body.usuario;
        let dataAtual = new Date();  
        const despesa = await this.despesaRepository.findOne({ where: { idDespesa } })

        if (!despesa) {
            throw new NotFoundException(`Não foi encontrada nenhuma despesa com o id ${idDespesa}`)
        }

        const usuarioExistente = await this.usuarioRepository.findOne({ where: {idUsuario} })
        if (!usuarioExistente) {
            throw new NotFoundException(`Não existe usuário cadastrado com o id ${idUsuario}`)
        }
        //trata a dataHora Informada
        if (body.dataHora) {
            let data = new Date(body.dataHora)
            if (data > dataAtual)
                throw new NotFoundException('A data não pode ser uma data futura.')
        }

        await this.despesaRepository.update({ idDespesa }, body)
        
        return { data: await this.despesaRepository.findOne({ where: { idDespesa } })}
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) idDespesa: number): Promise<{ data: string}> {
        const despesa = await this.despesaRepository.findOne({ where: { idDespesa } })

        if (!despesa) {
            throw new NotFoundException(`Não foi encontrada nenhuma despesa com o id ${idDespesa}`)
        }

        this.despesaRepository.delete(idDespesa)

        return { data: `A despesa com id ${idDespesa}, foi deletada com sucesso.` }
    }

}