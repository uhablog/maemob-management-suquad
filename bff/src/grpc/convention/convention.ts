import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GetConventionsResponse {

  @Field(() => Int)
  page: number

  @Field(() => Int)
  total: number

  @Field(() => [Convention])
  conventions: Convention[]

  constructor(page: number, total: number, conventions) {
    this.page = page;
    this.total = total;
    this.conventions = conventions;
  }
}

@ObjectType()
export class Convention {

  @Field()
  conventionId: string

  @Field()
  conventionName: string

  @Field()
  heldDate: Date

  constructor(
    conventionId: string,
    conventionName: string,
    heldDate: { seconds: number | Long; nanos?: number }
  ) {
    // Long型を考慮して秒を数値型に変換
    const seconds = typeof heldDate.seconds === 'number'
      ? heldDate.seconds
      : heldDate.seconds.toNumber();

    const nanos = heldDate.nanos || 0;

    this.conventionId = conventionId;
    this.conventionName = conventionName;
    this.heldDate = new Date(seconds * 1000 + nanos / 1e6);
  }
}