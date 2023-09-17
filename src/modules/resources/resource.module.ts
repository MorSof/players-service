import { Module } from '@nestjs/common';
import { ResourcesService } from './services/resources.service';
import { ResourcesMicroserviceProviderModule } from './providers/resources-microservice-provider/resources-microservice-provider.module';

@Module({
  imports: [ResourcesMicroserviceProviderModule],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourceModule {}
