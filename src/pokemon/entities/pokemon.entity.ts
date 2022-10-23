import { Document } from "mongoose";
import {Schema, SchemaFactory, Prop} from '@nestjs/mongoose'

//Estructura de los regsitros en la base de datos

@Schema() //? El decorador es para indicar que es un esquema de base de datos
export class Pokemon extends Document {

    // id: string // Mongo me loda

    //?Index sirve para ubicar el registro en la base de datos
    //? Name para que sea único en la base de datos
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
