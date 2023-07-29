import { Body, Controller, Param, Post } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { CreatePlayerRequestDto, PlayerResponseDto } from '../../../api/build';
import { Player } from '../../core/models/player.model';
import { PlayersDtoConverter } from '../services/players-dto.converter';

@Controller('/v1/players')
export class PlayersController {
  constructor(private playersService: PlayersService, private playersDtoConverter: PlayersDtoConverter) {}

  @Post('')
  async create(
    @Param('storeId') storeId: string,
    @Param('widgetType') widgetType: string,
    @Body() createPlayerRequestDto: CreatePlayerRequestDto,
  ): Promise<PlayerResponseDto> {
    let player: Player = this.playersDtoConverter.toModel(createPlayerRequestDto);
    player = await this.playersService.create(player);
    return this.playersDtoConverter.toDto(player);
  }
}
