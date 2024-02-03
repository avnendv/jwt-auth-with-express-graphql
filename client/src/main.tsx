import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import './assets/styles/index.css'
import router from './router'
import { SERVER_GRAPHQL } from './config/env'
import JWTManager from './utils/jwt'
import AuthContextProvider from './contexts/AuthContext'

const httpLink = createHttpLink({
  uri: SERVER_GRAPHQL,
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from JWTManager if it exists
  const token = JWTManager.getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>
)
