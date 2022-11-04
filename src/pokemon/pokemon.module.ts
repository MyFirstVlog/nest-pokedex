import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ //* for feature solo se ejecuta cuando se resuelvan estos eventos asincronos
      name: Pokemon.name, //*Extends de document el valor de name, no viene de la entidad
      schema: PokemonSchema, //* El pokemons schema que exportamos
    }])
  ],
  exports: [MongooseModule]
})
export class PokemonModule {}
