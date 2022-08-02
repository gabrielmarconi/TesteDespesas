import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuarios/usuario.entity';
import { DespesaController } from './despesa.controller';
import { DespesaEntity } from './despesa.entity';
import { DespesasService } from './despesas.service';

@Module({
  imports: [TypeOrmModule.forFeature([DespesaEntity, UsuarioEntity])],
  controllers: [DespesaController],
  providers: [DespesasService]
})
export class DespesasModule {}
