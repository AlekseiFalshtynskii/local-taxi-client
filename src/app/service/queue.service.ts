import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { PlaceInQueue } from '../model/place-in-queue';
import * as config from '../config';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private queueFVPath = 'queue/f/v';

  private queueVFPath = 'queue/v/f';

  private queueFVDriverPath = 'queue/f/v/driver/';

  private queueVFDriverPath = 'queue/v/f/driver/';

  private queueFVPassengerPath = 'queue/f/v/passenger/';

  private queueVFPassengerPath = 'queue/v/f/passenger/';

  private queueFVPiqPassengerPath = 'queue/f/v/{piqId}/passenger';

  private queueVFPiqPassengerPath = 'queue/v/f/{piqId}/passenger';

  constructor(private http: HttpClient) {
  }

  public getAllPlaceInQueueFV(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(config.BASE_URL + this.queueFVPath, config.httpOptions);
  }

  public getAllPlaceInQueueVF(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(config.BASE_URL + this.queueVFPath, config.httpOptions);
  }

  public getPlaceInQueueFVByDriverId(driverId: number): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(config.BASE_URL + this.queueFVDriverPath + driverId, config.httpOptions);
  }

  public getPlaceInQueueVFByDriverId(driverId: number): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(config.BASE_URL + this.queueVFDriverPath + driverId, config.httpOptions);
  }

  public getPlaceInQueueFVByPassengerId(passengerId: number): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(config.BASE_URL + this.queueFVPassengerPath + passengerId, config.httpOptions);
  }

  public getPlaceInQueueVFByPassengerId(passengerId: number): Observable<PlaceInQueue> {
    return this.http.get<PlaceInQueue>(config.BASE_URL + this.queueVFPassengerPath + passengerId, config.httpOptions);
  }

  public addDriverInQueueFV(driverId: number): Observable<Array<PlaceInQueue>> {
    return this.http.post<Array<PlaceInQueue>>(config.BASE_URL + this.queueFVDriverPath + driverId, config.httpOptions);
  }

  public addDriverInQueueVF(driverId: number): Observable<Array<PlaceInQueue>> {
    return this.http.post<Array<PlaceInQueue>>(config.BASE_URL + this.queueVFDriverPath + driverId, config.httpOptions);
  }

  public removeDriverFromQueueFV(driverId: number): Observable<Array<PlaceInQueue>> {
    return this.http.delete<Array<PlaceInQueue>>(config.BASE_URL + this.queueFVDriverPath + driverId, config.httpOptions);
  }

  public removeDriverFromQueueVF(driverId: number): Observable<Array<PlaceInQueue>> {
    return this.http.delete<Array<PlaceInQueue>>(config.BASE_URL + this.queueVFDriverPath + driverId, config.httpOptions);
  }

  public addPassengerInQueueFV(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    return this.http.post<Array<PlaceInQueue>>(config.BASE_URL
      + this.queueFVPiqPassengerPath.replace('{piqId}', String(piqId)) + (passengerId ? '/' + passengerId : ''), config.httpOptions);
  }

  public addPassengerInQueueVF(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    return this.http.post<Array<PlaceInQueue>>(config.BASE_URL
      + this.queueVFPiqPassengerPath.replace('{piqId}', String(piqId)) + (passengerId ? '/' + passengerId : ''), config.httpOptions);
  }

  public removePassengerFromQueueFV(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    return this.http.delete<Array<PlaceInQueue>>(config.BASE_URL
      + this.queueFVPiqPassengerPath.replace('{piqId}', String(piqId)) + (passengerId ? '/' + passengerId : ''), config.httpOptions);
  }

  public removePassengerFromQueueVF(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    return this.http.delete<Array<PlaceInQueue>>(config.BASE_URL
      + this.queueVFPiqPassengerPath.replace('{piqId}', String(piqId)) + (passengerId ? '/' + passengerId : ''), config.httpOptions);
  }
}
