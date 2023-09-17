import { Injectable } from '@nestjs/common';
import { LevelCompleteRequestDto, LevelCompleteResponseDto, ResourceResponseDto } from '../../../api/build';
import { LevelComplete } from '../models/level-complete.model';

@Injectable()
export class LevelsDtoConverter {
  public toModel(playerId: number, levelOrder: number, dto: LevelCompleteRequestDto): LevelComplete {
    return {
      playerId,
      levelOwnerProgression: {
        levelOrder,
        score: dto.score,
      },
      resourcesCollected: dto.resourcesCollected,
    };
  }

  public toDto(model: LevelComplete): LevelCompleteResponseDto {
    return {
      score: model.levelOwnerProgression.score,
      resourcesCollected: model.resourcesCollected as ResourceResponseDto[],
    };
  }
}
