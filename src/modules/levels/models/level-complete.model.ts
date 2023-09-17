export class LevelComplete {
  playerId: number;
  levelOwnerProgression: LevelOwnerProgression;
  resourcesCollected: any;

  constructor(partial: Partial<LevelComplete>) {
    Object.assign(this, partial);
  }
}

export interface LevelOwnerProgression {
  levelOrder: number;
  score: number;
}
