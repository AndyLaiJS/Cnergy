import { IsString, IsNumber, IsDate, ValidateNested } from "class-validator"
import UserDto from "./userDto";

class ActivityDto {
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
}

export default ActivityDto;