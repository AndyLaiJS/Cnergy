import { IsNumber } from "class-validator"

class JoinActivityDto {
    @IsNumber()
    public id: number;
}

export default JoinActivityDto;