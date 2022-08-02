import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DespesasModule } from './despesas/despesas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'DESKTOP-E88UU2H',
      port: 1433,
      username: 'sa',
      password: 'teste123!',
      database: 'TesteDespesas',
      entities: ['dist/**/*.entity{.ts,.js}'],//[UsuarioEntity, DespesaEntity],//[__dirname + '/../**/*.entity.js'],
      synchronize: false,
      options: {encrypt: false}  
    }),
    UsuariosModule,
    DespesasModule    
  ]  
})
export class AppModule {
  constructor(){
  
  }
}
