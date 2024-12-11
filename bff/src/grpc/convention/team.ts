import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GetTeamsResponse {
  
  @Field(() => [Team])
  teams: Team[]
}

@ObjectType()
export class Team {

  @Field()
  teamId: string

  @Field()
  teamName: string

  constructor(
    teamId: string,
    teamName: string
  ) {
    this.teamId = teamId;
    this.teamName = teamName;
  }
}