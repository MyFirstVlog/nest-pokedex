import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {ConfigService} from '@nestjs/config'
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagindation.dto';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = configService.get<number>('defaultLimit'); //tIPO T
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {

    const {limit = this.defaultLimit, offset= 0} = paginationDto;

    console.log({limit,offset})

    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      })
      .select('-__v')
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term});
    }

    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
    
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with id ${term} was not found on database`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {
    
    const pokemon = await this.findOne(term);

    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
    }

    await pokemon.updateOne(updatePokemonDto, {new: true});

    return {
      ...pokemon.toJSON(),
      ...updatePokemonDto
    };

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {

    // const result = await this.pokemonModel.findByIdAndDelete(id);

    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});

    if(deletedCount === 0) throw new BadRequestException(`Pokemon with id ${id} not found`);

    return;

  }


  private handleExceptions(error: any){
    if(error.code === 11000) {
        throw new BadRequestException(`Pokemon is already registered on DB - ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can't create pokemon - check server logs`)
  }
}
