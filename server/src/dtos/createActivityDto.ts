import { IsString, IsNumber, IsDate, ValidateNested, IsOptional } from "class-validator"
import UserDto from "./userDto";

class ActivityDto {
     @IsOptional()
     public id: number;

     @ValidateNested()
     public creator: UserDto;

     @IsString()
     public name: string;

     @IsString()
     public description: string;

     // TODO: Consider other possible format
     @IsString()
     public activityDate: string;

     @IsNumber()
     public maxParticipants: number;

     @IsNumber()
     public minParticipants: number;

     @IsNumber()
     public participantsCount: number;

     @IsString()
     public type: string;
}

export default ActivityDto;