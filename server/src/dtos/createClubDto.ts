import { IsString, IsObject, IsOptional } from "class-validator";

class CreateClubDto {
     @IsString()
     public name: string;

     @IsString()
     public description: string;

     @IsObject()
     @IsOptional()
     public avatar: Buffer;
}

export default CreateClubDto;