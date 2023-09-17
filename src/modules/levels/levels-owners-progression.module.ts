import { Module } from '@nestjs/common';
import { LevelsService } from './services/levels.service';
import { LevelsMicroserviceProviderModule } from './providers/levels-owners-progressions-microservice-provider/levels-owners-progressions-microservice-provider.module';
import { LevelsController } from './controllers/levels.controller';
import { LevelsDtoConverter } from './services/levels-dto.converter';
import { ResourceModule } from '../resources/resource.module';

@Module({
  imports: [LevelsMicroserviceProviderModule, ResourceModule],
  providers: [LevelsService, LevelsDtoConverter],
  exports: [LevelsService],
  controllers: [LevelsController],
})
export class LevelsOwnersProgressionModule {}
