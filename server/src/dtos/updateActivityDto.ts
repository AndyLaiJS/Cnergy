import { IsNumber, IsObject } from "class-validator"
import ActivityDto from "./createActivityDto";

class UpdateActivityDto extends ActivityDto {
     @IsNumber()
     public id: number;

     @IsObject()
     public creator: any;
}

export default UpdateActivityDto;