import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth0User {
  @Field()
  name: string;

  @Field()
  user_id: string;

  @Field()
  email: string;

  constructor(
    name: string,
    user_id: string,
    email: string
  ) {
    this.name = name;
    this.user_id = user_id;
    this.email = email;
  }
}