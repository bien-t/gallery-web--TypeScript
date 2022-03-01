import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from
} from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyle from './components/styles/GlobalStyle'
import { createUploadLink } from 'apollo-upload-client'
import { onError } from "@apollo/client/link/error";


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {

    graphQLErrors.forEach(({ message }) => {
      if (message === 'Context creation failed: you must be logged in') {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('id');
        client.clearStore();
       window.location.reload()
      }
    })
  }
});

const client = new ApolloClient({
  link: from([errorLink, createUploadLink({
    uri: (process.env.API_SERVER || 'http://localhost:4000')+'/api',
    credentials: 'include'
  })]),
  cache: new InMemoryCache(),
})

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))