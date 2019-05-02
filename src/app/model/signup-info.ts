import { Car } from './car';

export class SignUpInfo {
  username: string;
  password: string;
  email: string;
  roles: Array<string>;
  firstName: string;
  lastName?: string;
  middleName?: string;
  car?: Car;

  constructor(username: string, password: string, email: string, role: string, firstName: string, lastName?: string, middleName?: string, car?: Car) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.roles = [role];
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.car = car;
  }
}
