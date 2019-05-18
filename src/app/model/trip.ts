import { User } from './user';

export class Trip {
  id: number;
  number: number;
  direction: string;
  driver: User;
  passengers: Array<User>;
  numberPassengers: number;
  startDT: Date;
  endDT: Date;
}
