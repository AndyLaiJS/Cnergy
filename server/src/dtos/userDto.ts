import { IsString, IsOptional, ValidateNested } from "class-validator"
import ActivityDto from "./activityDto";

class UserDto {
     @IsString()
     public firstName: string;
     
     @IsString()
     public lastName: string;

     @IsString()
     public email: string;

     @IsString()
     public password: string;

     @IsString()
     public college: string;
     
     @IsOptional()
     @ValidateNested()
     public activities: ActivityDto[];
}

export default UserDto;