import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    //? PARA SERVISBLE Y ACCESIBLE EN OTROS MODULOS
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule {}
