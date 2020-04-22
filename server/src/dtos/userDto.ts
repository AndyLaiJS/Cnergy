import { IsString, IsOptional, ValidateNested } from "class-validator"
import ActivityDto from "./createActivityDto";

class UserDto {
     @IsOptional()
     public id: string;

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

     @IsString()
     public major: string;

     @IsOptional()
     @IsString()
     public about: string;
     
     @IsOptional()
     @ValidateNested()
     public activities: ActivityDto[];
}

export default UserDto;