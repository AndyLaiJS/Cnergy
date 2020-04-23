import { IsNumber, IsString } from "class-validator";

class ActivityRequestDto {
     @IsString()
     public userId: string;

     @IsNumber()
     public activityId: number;

}

export default ActivityRequestDto;