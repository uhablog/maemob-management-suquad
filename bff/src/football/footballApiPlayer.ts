import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FootballAPIPlayer {

  @Field()
  footballapi_player_id: string;

  @Field()
  footballapi_team_id: string;

  @Field()
  player_name: string;

  @Field()
  birth_date: string;

  @Field()
  nationality: string;

  @Field()
  height: string;

  @Field()
  weight: string;

  constructor(
    footballapi_player_id: string,
    footballapi_team_id: string,
    player_name: string,
    birth_date: string,
    nationality: string,
    height: string,
    weight: string,
  ) {
    this.footballapi_player_id = footballapi_player_id;
    this.footballapi_team_id = footballapi_team_id;
    this.player_name = player_name;
    this.birth_date = birth_date;
    this.nationality = nationality;
    this.height = height;
    this.weight = weight;
  }
}
