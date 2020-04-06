import { IsString, IsNumber, ValidateNested, IsJSON, IsObject } from "class-validator"
import UserDto from "./userDto";
import ActivityDto from "./activityDto";
import { isObject } from "util";

class UpdateActivityDto extends ActivityDto {
     @IsNumber()
     public id: number;

     // TODO: Substitute any with other object
     @IsObject()
     public creator: any;
}

export default UpdateActivityDto;