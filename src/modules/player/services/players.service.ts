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
}
