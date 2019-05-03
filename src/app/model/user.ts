import { Car } from './car';
import { Role } from './role';

export class User {
  id: number;
  username: string;
  email: string;
  roles: Array<Role>;
  firstName: string;
  lastName?: string;
  middleName?: string;
  car?: Car;
}
