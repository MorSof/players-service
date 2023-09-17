import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LevelOwnerProgressionsMicroserviceProvider } from './levels-owners-progressions-microservice-provider.service';
import { HttpModule } from '@nestjs/axios';
import { LevelOwnerProgressionsProvider } from '../levels-owners-progressions-provider.service';
import { ServerConfiguration, LevelOwnerProgressionsApi, createConfiguration } from '@morsof/levels-service-api';
import { LevelOwnerProgressionDtoConverter } from './convertes/levels-owners-progressions-dto.converter';

@Module({
  imports: [HttpModule],
  providers: [
    LevelOwnerProgressionDtoConverter,
    {
      provide: LevelOwnerProgressionsProvider,
      useClass: LevelOwnerProgressionsMicroserviceProvider,
    },
    {
      provide: 'LEVELS_BASE_URL',
      useFactory: (configService: ConfigService) => configService.get('LEVELS_PROVIDER_BASE_URL'),
      inject: [ConfigService],
    },
    {
      provide: 'LevelOwnerProgressionsApi',
      useFactory: (LEVELS_BASE_URL: string) => {
        return new LevelOwnerProgressionsApi(
          createConfiguration({
            baseServer: new ServerConfiguration(LEVELS_BASE_URL, {}),
          }),
        );
      },
      inject: ['LEVELS_BASE_URL'],
    },
  ],
  exports: [LevelOwnerProgressionsProvider],
})
export class LevelsMicroserviceProviderModule {}
