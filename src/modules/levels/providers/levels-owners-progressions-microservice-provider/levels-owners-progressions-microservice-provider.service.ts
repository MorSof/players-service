import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LevelOwnerProgressionDtoConverter } from './convertes/levels-owners-progressions-dto.converter';
import { LevelOwnerProgressionsProvider } from '../levels-owners-progressions-provider.service';
import { LevelOwnerProgressionsApi } from '@morsof/levels-service-api';
import { LevelOwnerProgression } from '../../models/level-complete.model';

@Injectable()
export class LevelOwnerProgressionsMicroserviceProvider extends LevelOwnerProgressionsProvider {
  constructor(
    @Inject('LevelOwnerProgressionsApi') private readonly levelOwnerProgressionsApi: LevelOwnerProgressionsApi,
    private readonly levelOwnerProgressionDtoConverter: LevelOwnerProgressionDtoConverter,
  ) {
    super();
  }

  async create(playerId: number, levelOwnerProgression: LevelOwnerProgression): Promise<LevelOwnerProgression> {
    const body = this.levelOwnerProgressionDtoConverter.toDto(playerId, levelOwnerProgression);
    const response = await this.levelOwnerProgressionsApi
      .v1LevelOwnerProgressionsPost(body)
      .catch((error: { code: number }) => {
        if (error.code === HttpStatus.BAD_REQUEST || error.code === HttpStatus.CONFLICT) {
          throw new BadRequestException(error);
        }
        if (error.code === HttpStatus.NOT_FOUND) {
          throw new NotFoundException(error);
        }
        throw new Error(`Failed to create level progression: ${error}`);
      });
    return this.levelOwnerProgressionDtoConverter.toModel(response);
  }
}
