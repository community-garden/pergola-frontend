import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Typography } from '@material-ui/core'
import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import configureStore from './configureStore'

const uri =
  process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4001/graphql'
const cache = new InMemoryCache()

export const client = new ApolloClient( {
  uri,
  cache,
} )

const { persistor, store } = configureStore()

export function ReduxRoot() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate
          loading={<Typography>Loading...</Typography>}
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}