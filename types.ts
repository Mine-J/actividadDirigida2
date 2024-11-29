import { ObjectId } from "mongodb";

export type vuelos = {
    id: string,
    Origen: string,
    Destino: string,
    Fecha_hora: string
}

export type vuelosModel = {
    
    _id: ObjectId,
    Origen: string,
    Destino: string,
    Fecha_hora: string
}

