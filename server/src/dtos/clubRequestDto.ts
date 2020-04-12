import { IsObject } from "class-validator";
import JoinClubDto from "./joinClubDto";
import { Club } from "../entity/Club";
import { User } from "../entity/User";

class ClubRequestDto extends JoinClubDto {
     @IsObject()
     public club: Club;

     @IsObject()
     public user: User;
}

export default ClubRequestDto;