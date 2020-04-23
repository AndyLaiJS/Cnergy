import { IsString, IsObject, IsOptional } from "class-validator";

class CreateClubDto {
     @IsString()
     public name: string;

     @IsString()
     public description: string;
}

export default CreateClubDto;