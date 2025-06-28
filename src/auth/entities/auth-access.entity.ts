import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Role } from "src/assets/role.enum";

@ObjectType()
export class AuthAccess {
  @Field(() => Int)
  id: number;

  @Field(() => Role)
  role: Role;

  @Field()
  token: string;
}
