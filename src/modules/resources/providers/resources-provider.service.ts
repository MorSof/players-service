import { Resource } from '../models/resource.model';

export abstract class ResourcesProvider {
  abstract createResources(playerId: number, resource: Resource[]): Promise<Resource[]>;
  abstract collectResources(resource: Resource[]): Promise<Resource[]>;
}
