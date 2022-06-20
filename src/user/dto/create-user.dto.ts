import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { regexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(regexHelper.password, {
    message:
      'Password must be at least 8 characters long and contain at least one number, one uppercase one lowercase letter and special character',
  })
  password: string;
}
