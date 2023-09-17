import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ResourcesProvider } from '../providers/resources-provider.service';
import { Resource } from '../models/resource.model';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourcesProvider: ResourcesProvider) {}

  async collectOrCreateResources(playerId: number, resources: Resource[]): Promise<Resource[]> {
    const resourcesToCollect: Resource[] = [];
    const resourcesToCreate: Resource[] = [];
    resources.forEach((resource) => {
      if (resource.id) {
        resourcesToCollect.push(resource);
      } else {
        resourcesToCreate.push(resource);
      }
    });
    const [collectedResources, createdResources] = await Promise.all([
      this.resourcesProvider.collectResources(resourcesToCollect),
      this.resourcesProvider.createResources(playerId, resourcesToCreate),
    ]).catch((error: { code: number }) => {
      if (error.code === HttpStatus.BAD_REQUEST || error.code === HttpStatus.CONFLICT) {
        throw new BadRequestException(error);
      }
      if (error.code === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(error);
      }
      throw new Error(`Failed to create level progression: ${error}`);
    });
    return [...collectedResources, ...createdResources];
  }
}
