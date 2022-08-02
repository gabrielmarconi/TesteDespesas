import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DespesaEntity } from './despesa.entity';

@Injectable()
export class DespesasService {
    constructor(
        @InjectRepository(DespesaEntity)
        private readonly despesaRepository: Repository<DespesaEntity>
    ) {}
}
