import CreateClubDto from "./createClubDto";
import { IsObject, IsNumber } from "class-validator";

class UpdateClubDto extends CreateClubDto {
     @IsNumber()
     public id: number;

     @IsObject()
     public president: any;
}

export default UpdateClubDto;