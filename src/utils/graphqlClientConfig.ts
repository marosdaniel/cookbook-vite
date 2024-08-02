import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let uri = import.meta.env.VITE_SERVER_URI;

if (import.meta.env.DEV) {
  uri = import.meta.env.VITE_DEV_SERVER_URI ?? '';
  console.log('dev server uri: ', uri);
}

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('c_b_token');
  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
