import { vuelos, vuelosModel } from "./types.ts";

export const formModelToVuelos = (vuelosModel: vuelosModel): vuelos => {
  return {
    id: vuelosModel._id.toString(),
    Origen: vuelosModel.Origen,
    Destino: vuelosModel.Destino,
    Fecha_hora: vuelosModel.Fecha_hora
  };
}