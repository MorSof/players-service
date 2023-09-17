import { Inject, Injectable } from '@nestjs/common';
import { ResourcesProvider } from '../resources-provider.service';
import { Resource } from '../../models/resource.model';
import {
  BaseResourceRequestDto,
  BaseResourceRequestDtoOwnerTypeEnum,
  DefaultApi,
  ResourceTransactionDto,
  ResourceTransactionDtoArray,
} from '@morsof/resources-service-api';

@Injectable()
export class ResourcesMicroserviceProvider extends ResourcesProvider {
  constructor(@Inject('ResourcesApi') private readonly resourcesApi: DefaultApi) {
    super();
  }

  async createResources(playerId: number, resources: Resource[]): Promise<Resource[]> {
    if (!resources?.length) {
      return [];
    }
    const body: BaseResourceRequestDto[] = resources.map((resource) => {
      const { type, name, amount, resources, extraArgs } = resource;
      const baseResourceRequestDto = new BaseResourceRequestDto();
      baseResourceRequestDto.ownerId = playerId.toString();
      baseResourceRequestDto.ownerType = 'player';
      baseResourceRequestDto.type = type;
      baseResourceRequestDto.name = name;
      baseResourceRequestDto.amount = amount;
      baseResourceRequestDto.resources = resources;
      baseResourceRequestDto.extraArgs = extraArgs;
      return baseResourceRequestDto;
    });

    return (await this.resourcesApi.v1ResourcesPost(body)).map((dto) => {
      return new Resource({
        id: dto.id,
        type: dto.type,
        name: dto.name,
        amount: dto.amount,
        resources,
        extraArgs: dto.extraArgs,
      });
    });
  }

  async collectResources(resources: Resource[]): Promise<Resource[]> {
    if (!resources?.length) {
      return [];
    }
    const resourceTransactionDtos: ResourceTransactionDto[] = resources.map((resource) => {
      const { id, amount } = resource;
      const resourceTransactionDto = new ResourceTransactionDto();
      resourceTransactionDto.amount = amount;
      resourceTransactionDto.id = id;
      return resourceTransactionDto;
    });

    const body: ResourceTransactionDtoArray = new ResourceTransactionDtoArray();
    body.resources = resourceTransactionDtos;

    return (await this.resourcesApi.v1ResourcesCollectPut(body))?.resources.map((dto) => {
      return new Resource({
        id: dto.id,
        amount: dto.amount,
      });
    });
  }
}
