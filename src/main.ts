import { NestFactory } from '@nestjs/core'
import * as config from 'config'

import { AppModule } from './app.module'

const SERVER = config.get('server')

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule)

  app.enableCors()

  await app.listen(SERVER.port, SERVER.ip)
}

bootstrap()
