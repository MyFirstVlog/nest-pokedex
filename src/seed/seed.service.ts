import { Injectable, BadRequestException } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios'
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios; //? Aegurar de que sea  visible, dependencia de mi servicio
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}

  async executeSeed(){

    await this.pokemonModel.deleteMany({}); //? The same delete * from pokemons

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    // const promisesResponse = []; 
    const pokemonToInsert: {name: string, no: number}[] = [];

    try {
      
    data.results.forEach( ({name, url}) => {

      const urlSplitted = url.split('/');
      const no: number = +urlSplitted[urlSplitted.length - 2];

      // promisesResponse.push(this.pokemonModel.create({name,no}));
      pokemonToInsert.push({name,no});
    });


    await this.pokemonModel.insertMany(pokemonToInsert); //? Más eficientes que múltiples insersiones

    // await Promise.all(promisesResponse);

    return "Seed executed";

    } catch (error) {
      throw new BadRequestException("Ha ocurrido intente de nuevo más tarde");

    }
  }

}
