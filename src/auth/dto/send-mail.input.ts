import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UserSendMail {
    @IsEmail()
    @IsEmpty()
    @IsString()
    @Field()
    email: string;
}