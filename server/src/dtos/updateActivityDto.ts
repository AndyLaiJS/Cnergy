import { IsNumber, IsObject } from "class-validator"
import CreateActivityDto from "./createActivityDto";

class UpdateActivityDto extends CreateActivityDto {
     @IsNumber()
     public id: number;

     @IsObject()
     public creator: any;
}

export default UpdateActivityDto;