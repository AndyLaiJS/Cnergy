import { IsString, IsOptional, ValidateNested, IsNumber, IsBoolean, IsObject } from "class-validator"
import ActivityDto from "./createActivityDto";
import UserDto from "./userDto";

class JoinActivityDto {
    @IsNumber()
    public id: number;

    @IsString()
    public userId: string;

    @IsNumber()
    public activityId: number;

    @IsBoolean()
    public hasApproved: boolean;

    @IsObject()
    public activity: ActivityDto;

    @IsObject()
    public user: UserDto;
}

export default JoinActivityDto;