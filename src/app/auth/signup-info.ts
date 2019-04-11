import { Car } from '../model/car';

export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  car: Car;

  constructor(name: string, username: string, email: string, password: string, car?: Car) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ['driver'];
    this.car = car;
  }
}
