import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';

addParameters({
   options: {
      showRoots: true,
   },
   dependencies: {
      withStoriesOnly: true,
      hideEmpty: true,
   },
});

addDecorator(withKnobs);

export const client = new ApolloClient({
   ssrMode: false,
   connectToDevTools: true,
   cache: new InMemoryCache().restore({}),
   resolvers: {},
   credentials: 'same-origin',
});

window['_APOLLO_'] = client;

addDecorator(story => {
   return <ApolloProvider client={client}>{story()}</ApolloProvider>;
});
