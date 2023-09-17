import { Injectable } from '@nestjs/common';
import { LevelComplete } from '../models/level-complete.model';
import { LevelOwnerProgressionsProvider } from '../providers/levels-owners-progressions-provider.service';

@Injectable()
export class LevelsService {
  constructor(private readonly levelOwnerProgressionsProvider: LevelOwnerProgressionsProvider) {}

  public async levelComplete(levelComplete: LevelComplete): Promise<LevelComplete> {
    levelComplete.levelOwnerProgression = await this.levelOwnerProgressionsProvider.create(
      levelComplete.playerId,
      levelComplete.levelOwnerProgression,
    );
    return levelComplete;
  }
}
