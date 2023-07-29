import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from '../controllers/players.controller';
import { PlayersService } from '../services/players.service';
import { PlayerEntity } from '../entities/player.entity';
import { PlayersEntityConverter } from '../services/players-entity.converter';
import { PlayersDtoConverter } from '../services/players-dto.converter';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService, PlayersDtoConverter, PlayersEntityConverter],
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  exports: [PlayersService],
})
export class PlayersModule {}
