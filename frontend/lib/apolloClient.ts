import { ApolloClient, InMemoryCache } from '@apollo/client';
console.log(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;