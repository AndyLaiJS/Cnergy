import { IsString, IsNumber, IsOptional } from "class-validator"

class CreateActivityDto {
     @IsString()
     public name: string;

     @IsString()
     public description: string;

     @IsString()
     public activityDate: string;

     @IsNumber()
     public maxParticipants: number;

     @IsNumber()
     public minParticipants: number;

     @IsOptional()
     @IsNumber()
     public participantsCount: number;

     @IsString()
     public type: string;
}

export default CreateActivityDto;