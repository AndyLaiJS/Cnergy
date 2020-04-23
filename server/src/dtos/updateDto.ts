import { IsNumber, IsString } from "class-validator"

class UpdateActivityDto  {
     @IsNumber()
     public id: number;

     @IsString()
     public description: string;
}

export default UpdateActivityDto;