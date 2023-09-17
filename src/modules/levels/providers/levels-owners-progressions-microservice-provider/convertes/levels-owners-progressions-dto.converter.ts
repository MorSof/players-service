import { Injectable } from '@nestjs/common';
import { LevelOwnerProgression } from '../../../models/level-complete.model';
import { LevelOwnerProgressionRequestDto, LevelOwnerProgressionResponseDto } from '@morsof/levels-service-api';

@Injectable()
export class LevelOwnerProgressionDtoConverter {
  public toModel(dto: LevelOwnerProgressionResponseDto): LevelOwnerProgression {
    return {
      levelOrder: dto.levelOrder,
      score: dto.score,
    };
  }

  public toDto(playerId: number, model: LevelOwnerProgression): LevelOwnerProgressionRequestDto {
    return {
      ownerId: playerId.toString(),
      ownerType: 'player',
      levelOrder: model.levelOrder,
      score: model.score,
    };
  }
}
