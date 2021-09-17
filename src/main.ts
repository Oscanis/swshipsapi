import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//swagger import
//először npm install --save @nestjs/swagger swagger-ui-express. Yarn add-al valamiért nem működött
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //validation pipe a teljes app-ra. Ez biztosít validator decorator-okat, pl. @IsArray(), @IsNegative(), @IsAlphaNumeric() stb.
  //először hozzá kell adni a package-t: yarn add class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe);

  //swagger setup. Először létre kell hozni egy configot
  const config = new DocumentBuilder()
    .setTitle('NestTest')
    .setDescription('Nest test api')
    .setVersion('0.0')
    .build();
  //majd létrehozni egy documentet az alap Nest app-ból és a configból
  const document = SwaggerModule.createDocument(app, config);
  //végül elindítani a swaggert a megadott route-on
  SwaggerModule.setup('/swagger', app, document);

  //a listen port itt módosítható
  await app.listen(3000);
}
bootstrap();
