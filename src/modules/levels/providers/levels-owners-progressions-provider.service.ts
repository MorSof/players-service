import { LevelOwnerProgression } from '../models/level-complete.model';

export abstract class LevelOwnerProgressionsProvider {
  abstract create(playerId: number, levelOwnerProgression: LevelOwnerProgression): Promise<LevelOwnerProgression>;
}
