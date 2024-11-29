export const schema = `#graphql
type vuelos {
  id: ID!
  Origen: String!
  Destino: String!
  Fecha_hora: String!
}

type Query {
    getFlights(Origen: String,Destino: String): [vuelos!]!
    getFlight(id: ID!): vuelos
}

type Mutation {
    addFlight(Origen: String!, Destino:String!, Fecha_hora:String!): vuelos!
}
`;