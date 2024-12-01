import { HttpException, Injectable } from '@nestjs/common';
import { FootballAPIPlayer } from "./footballApiPlayer";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FootballService {

  constructor(
    private configService: ConfigService
  ){}

  async fetchPlayers(
    season: number,
    teamId: number,
    page: number
  ): Promise<FootballAPIPlayer[]> {

    try {
      
      // FootballAPIリクエストパラメータを含め、URLを作成
      const baseUrl = this.configService.get<string>('FOOTBALL_API_BASE');
      const url = new URL(`${baseUrl}/players`);
      url.searchParams.append('season', encodeURIComponent(season.toString()));
      url.searchParams.append('team', encodeURIComponent(teamId.toString()));
      url.searchParams.append('page', encodeURIComponent(page.toString()));

      // リクエストヘッダーの設定
      const apiKey = this.configService.get<string>('FOOTBALL_API_KEY');
      const headers = {
        'x-apisports-key': apiKey
      }

      // Football API呼び出し
      const response = await fetch(url.toString(), { headers });

      if (!response.ok) {
        throw new HttpException(
          `Failed to fetch players: ${response.status} ${response.statusText}`,
          response.status
        )
      }

      const data = await response.json();

      // エラーハンドリング：必要なプロパティがない場合
      if (!data.response || !Array.isArray(data.response)) {
        throw new HttpException(`Invalid response format: Missing "response" array`, 500);
      }

      return data.response.map( (item: any ) => {
        const player = item.player;

        return new FootballAPIPlayer(
          player.id,
          teamId.toString(),
          player.name || "Unknown",
          player.birth.date || "Unknown",
          player.nationality || "Unknown",
          player.height || "N/A",
          player.weight || "N/A"
        )
      });

    } catch (error) {
      throw new HttpException(
        `Error fetching players: ${error.message}`,
        error.status || 500
      )
    }
  }
}