import { Car } from './car';
import { Authority } from './authority';

export class User {
  id: number;
  username: string;
  enabled: boolean;
  authorities: Array<Authority>;
  email: string;
  firstName: string;
  lastName?: string;
  middleName?: string;
  car?: Car;
}
