import { User } from './user';

export class PlaceInQueue {
  id: number;
  number: number;
  driver: User;
  passengers: Array<User>;
  numberPassengers: number;
}
