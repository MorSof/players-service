import { Body, Controller, Param, Post } from '@nestjs/common';
import { LevelsService } from '../services/levels.service';
import { LevelsDtoConverter } from '../services/levels-dto.converter';
import { LevelCompleteRequestDto, LevelCompleteResponseDto } from '../../../api/build';

@Controller('/v1/players/:id/levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService, private readonly levelsDtoConverter: LevelsDtoConverter) {}

  @Post(':levelOrder/complete')
  async levelComplete(
    @Body() levelCompleteRequest: LevelCompleteRequestDto,
    @Param('id') playerId: number,
    @Param('levelOrder') levelOrder: number,
  ): Promise<LevelCompleteResponseDto> {
    let levelCompleteModel = this.levelsDtoConverter.toModel(playerId, levelOrder, levelCompleteRequest);
    levelCompleteModel = await this.levelsService.levelComplete(levelCompleteModel);
    return this.levelsDtoConverter.toDto(levelCompleteModel);
  }
}
