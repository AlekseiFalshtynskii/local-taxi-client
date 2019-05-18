import { User } from './user';

export class PlaceInQueue {
  id: number;
  number: number;
  driver: User;
  passengers: Array<User>;
  numberPassengers: number;
  startDT: Date;
  startFirstDT: Date;
  endDT: Date;
}
