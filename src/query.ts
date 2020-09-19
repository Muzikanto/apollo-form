import { gql } from '@apollo/client';

function makeApolloFormQuery(name: string) {
   return gql`query ApolloForm { ${name} @client }`;
}

export default makeApolloFormQuery;
