import { IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  sub: string;

  @IsString()
  email: string;

  @IsString()
  role: string;
}
