import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapter{
     //Envoltorio del coddigo
    private axios: AxiosInstance = axios; //? Aegurar de que sea  visible, dependencia de mi servicio

    async get<T>(url: string): Promise<T> {
        try {

            const {data} = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error('This is an error - Check logs');
        }
    }
    
}