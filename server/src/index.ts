import 'reflect-metadata'
import express, { Express } from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { GreetingResolver } from '@/resolvers/greeting'
import { UserResolver } from '@/resolvers/user'
import { PORT, PORT_CLIENT } from '@/config/env'
import { AppDataSource } from '@/config/database'
import refreshTokenRouter from '@/routes/refreshTokenRouter'

// create and setup express app
const main = async () => {
  const app: Express = express()

  const httpServer = http.createServer(app)

  app.use(express.json())
  app.use(cookieParser())

  app.use('/refresh_token', refreshTokenRouter)

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [GreetingResolver, UserResolver],
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    context: ({ req, res }) => ({
      req,
      res,
    }),
  })

  await apolloServer.start()

  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch(err => {
      console.error('Error during Data Source initialization:', err)
    })

  apolloServer.applyMiddleware({ app, cors: { origin: `http://localhost:${PORT_CLIENT}`, credentials: true } })

  // start express server
  httpServer.listen(PORT, () => {
    console.log(`[Server]: Server is running on port ${PORT}`)
    console.log(
      `Server is running, GraphQL Playground available at http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  })
}

main().catch(error => console.error('ERROR STARTING ERROR', error))
