import { Injectable } from '@nestjs/common';
import { CreatePlayerRequestDto, PlayerResponseDto } from '../../../api/build';
import { Player } from '../../core/models/player.model';

@Injectable()
export class PlayersDtoConverter {
  public toModel(dto: CreatePlayerRequestDto): Player {
    const { name } = dto;
    const model: Player = new Player({
      name,
    });
    return model;
  }

  public toDto(model: Player): PlayerResponseDto {
    const { id, name } = model;
    const dto: PlayerResponseDto = new PlayerResponseDto();
    dto.id = id;
    dto.name = name;
    return dto;
  }
}
