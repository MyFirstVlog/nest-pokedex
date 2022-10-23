import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([{
      name: Pokemon.name, //*Extends de document
      schema: PokemonSchema, //* El pokemons schema que exportamos
    }])
  ]
})
export class PokemonModule {}
