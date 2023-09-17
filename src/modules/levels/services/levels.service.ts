import { Injectable } from '@nestjs/common';
import { LevelComplete } from '../models/level-complete.model';
import { LevelOwnerProgressionsProvider } from '../providers/levels-owners-progressions-provider.service';
import { ResourcesService } from '../../resources/services/resources.service';

@Injectable()
export class LevelsService {
  constructor(
    private readonly levelOwnerProgressionsProvider: LevelOwnerProgressionsProvider,
    private readonly resourcesService: ResourcesService,
  ) {}

  public async levelComplete(levelComplete: LevelComplete): Promise<LevelComplete> {
    levelComplete.levelOwnerProgression = await this.levelOwnerProgressionsProvider.create(
      levelComplete.playerId,
      levelComplete.levelOwnerProgression,
    );
    levelComplete.resourcesCollected = await this.resourcesService.collectOrCreateResources(
      levelComplete.playerId,
      levelComplete.resourcesCollected,
    );
    return levelComplete;
  }
}
