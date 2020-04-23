import { IsString, IsNumber } from "class-validator";

class ClubRequestDto {
     @IsString()
     public userId: string;

     @IsNumber()
     public clubId: number;
}

export default ClubRequestDto;