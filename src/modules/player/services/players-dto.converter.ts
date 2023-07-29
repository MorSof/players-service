import { Injectable } from '@nestjs/common';
import { CreatePlayerRequestDto, PlayerResponseDto } from '../../../api/build';
import { Player } from '../../core/models/player.model';

@Injectable()
export class PlayersDtoConverter {
  public toModel(dto: CreatePlayerRequestDto): Player {
    const { name, avatarUrl } = dto;
    const model: Player = new Player({
      name,
      avatarUrl,
    });
    return model;
  }

  public toDto(model: Player): PlayerResponseDto {
    const { id, name, avatarUrl } = model;
    const dto: PlayerResponseDto = new PlayerResponseDto();
    dto.id = id;
    dto.name = name;
    dto.avatarUrl = avatarUrl;
    return dto;
  }
}
