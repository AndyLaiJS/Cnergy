import { IsString } from "class-validator"

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
}

export default UserDto;