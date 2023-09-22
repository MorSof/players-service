import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PlayersEntityConverter } from './players-entity.converter';
import { Player } from '../../core/models/player.model';
import { PlayerEntity } from '../entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
    private readonly playersEntityConverter: PlayersEntityConverter,
  ) {}

  public async create(player: Player): Promise<Player> {
    let entity: PlayerEntity = this.playersEntityConverter.toEntity(player);

    entity = await this.playerRepository.save(entity);

    return this.playersEntityConverter.toModel(entity);
  }

  async login(playerId?: number): Promise<Player> {
    // if no playerId is provided, create a new player
    if (!playerId) {
      return this.create(new Player({}));
    }

    // if playerId is provided, try to find the player
    const entity = await this.playerRepository.findOneBy({ id: playerId });
    if (!entity) {
      // if no player is found, create a new player
      return this.create(new Player({}));
    }

    // if a player is found, return it
    return this.playersEntityConverter.toModel(entity);
  }
}
