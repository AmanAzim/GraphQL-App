import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

import './index.css';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_SERVER_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  console.log('env', )
  return (
    <ApolloProvider client={client}>
      <div id="main" className="App">
        <h1>Books</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
