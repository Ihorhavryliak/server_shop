import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fastifyCookie from '@fastify/cookie';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { PrismaService } from './prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'api/v1',
    prefix: '',
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.register(fastifyCsrf);
  await app.register(fastifyCookie, {
    secret: process.env.COOKIES_SECRET, // for cookies signature
  });
  app.useGlobalPipes(new ValidationPipe());

  //swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Shop App')
    .setDescription('Some response can be different, check please.')
    .setVersion('1.0')
    //.addTag('shop')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, '');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
