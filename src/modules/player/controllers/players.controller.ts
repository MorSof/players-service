import { Body, Controller, Param, Post } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { AnonymousLoginRequestDto, CreatePlayerRequestDto, PlayerResponseDto } from '../../../api/build';
import { Player } from '../../core/models/player.model';
import { PlayersDtoConverter } from '../services/players-dto.converter';

@Controller('/v1/players')
export class PlayersController {
  constructor(private playersService: PlayersService, private playersDtoConverter: PlayersDtoConverter) {}

  @Post('')
  async create(@Body() createPlayerRequestDto: CreatePlayerRequestDto): Promise<PlayerResponseDto> {
    let player: Player = this.playersDtoConverter.toModel(createPlayerRequestDto);
    player = await this.playersService.create(player);
    return this.playersDtoConverter.toDto(player);
  }

  @Post('login')
  async login(@Body() dto: AnonymousLoginRequestDto): Promise<PlayerResponseDto> {
    const player = await this.playersService.login(dto.playerId);
    return this.playersDtoConverter.toDto(player);
  }
}
