import { IsNumber, IsString } from "class-validator";

class JoinClubDto {
     @IsNumber()
     public id: number;

     @IsString()
     public reason: Text;
}

export default JoinClubDto;