import { Injectable } from '@nestjs/common';
import { Player } from '../../core/models/player.model';
import { PlayerEntity } from '../entities/player.entity';

@Injectable()
export class PlayersEntityConverter {
  public toModel(entity: PlayerEntity): Player {
    const { id, name } = entity;
    const model: Player = new Player({
      id,
      name,
    });
    return model;
  }

  public toEntity(model: Player): PlayerEntity {
    const { name } = model;
    const entity: PlayerEntity = new PlayerEntity({ name });
    return entity;
  }
}
