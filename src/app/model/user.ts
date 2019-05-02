import { Car } from './car';
import { Role } from './role';

export class User {
  id: number;
  roles: Array<Role>;
  firstName: string;
  lastName?: string;
  middleName?: string;
  car?: Car;
}
