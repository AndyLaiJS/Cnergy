import { IsObject } from "class-validator";
import { Activity } from "../entity/Activity";
import { User } from "../entity/User";

class ActivityRequestDto {
     @IsObject()
     public activity: Activity;

     @IsObject()
     public user: User;
}

export default ActivityRequestDto;