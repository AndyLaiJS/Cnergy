import { IsNumber, IsObject } from "class-validator"
import ActivityDto from "./createActivityDto";

class UpdateActivityDto extends ActivityDto {
     @IsNumber()
     public id: number;

     // TODO: Substitute any with other object
     @IsObject()
     public creator: any;
}

export default UpdateActivityDto;