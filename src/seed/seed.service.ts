import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios'
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios; //? Aegurar de que sea  visible, dependencia de mi servicio

  async executeSeed(){
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    data.results.forEach( ({name, url}) => {

      const urlSplitted = url.split('/');
      const id: number = +urlSplitted[urlSplitted.length - 2];

      console.log({
        name, id
      });
    });

    return data.results;
  }

}
