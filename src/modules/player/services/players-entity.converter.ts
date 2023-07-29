import { Injectable } from '@nestjs/common';
import { Player } from '../../core/models/player.model';
import { PlayerEntity } from '../entities/player.entity';

@Injectable()
export class PlayersEntityConverter {
  public toModel(entity: PlayerEntity): Player {
    const { id, name, avatarUrl } = entity;
    const model: Player = new Player({
      id,
      name,
      avatarUrl,
    });
    return model;
  }

  public toEntity(model: Player): PlayerEntity {
    const { name, avatarUrl } = model;
    const entity: PlayerEntity = new PlayerEntity({ name, avatarUrl });
    return entity;
  }
}
