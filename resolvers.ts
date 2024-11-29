import { Collection, ObjectId } from "mongodb";
import { vuelos, vuelosModel } from "./types.ts";
import { formModelToVuelos } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      args: { Origen: string; Destino: string },
      context: { VuelosCollection: Collection<vuelosModel> },
    ): Promise<vuelos[]> => {
        if(args.Origen && args.Destino){
            const vuelosModel = await context.VuelosCollection.find({Origen: args.Origen, Destino: args.Destino}).toArray();
            return vuelosModel.map((vueloModel) =>
                formModelToVuelos(vueloModel)
            );
        }
        if(args.Origen)
        {
            const vuelosModel = await context.VuelosCollection.find({Origen: args.Origen}).toArray();
            return vuelosModel.map((vueloModel) =>
                formModelToVuelos(vueloModel)
            );
        }
        if(args.Destino)
        {
            const vuelosModel = await context.VuelosCollection.find({Destino: args.Destino}).toArray();
            return vuelosModel.map((vueloModel) =>
                formModelToVuelos(vueloModel)
            );
        }
        
            const vuelosModel = await context.VuelosCollection.find().toArray();
            return vuelosModel.map((vueloModel) =>
                formModelToVuelos(vueloModel)
        );
        
    },
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: {
        VuelosCollection: Collection<vuelosModel>;
      },
    ): Promise<vuelos | null> => {
      const vuelosModel = await context.VuelosCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!vuelosModel) {
        return null;
      }
      return formModelToVuelos(vuelosModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { Origen: string; Destino: string; Fecha_hora: string },
      context: {
        VuelosCollection: Collection<vuelosModel>;
      },
    ): Promise<vuelos> => {
        const { insertedId } = await context.VuelosCollection.insertOne({
            _id: new ObjectId(),
            Origen: args.Origen,
            Destino: args.Destino,
            Fecha_hora: args.Fecha_hora,
        });
        const vuelosModel = {
            _id: insertedId,
            Origen: args.Origen,
            Destino: args.Destino,
            Fecha_hora: args.Fecha_hora,
        };
        return formModelToVuelos(vuelosModel!);

    },
  },
};