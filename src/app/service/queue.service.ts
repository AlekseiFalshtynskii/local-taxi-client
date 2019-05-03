import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { PlaceInQueue } from '../model/place-in-queue';
import { BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private queueFVPath = 'queue/f/v';

  private queueVFPath = 'queue/v/f';

  private queueFVDriverPath = 'queue/f/v/driver';

  private queueVFDriverPath = 'queue/v/f/driver';

  private queueFVPassengerPath = 'queue/f/v/passenger';

  private queueVFPassengerPath = 'queue/v/f/passenger';

  private queueFVPiqPassengerPath = 'queue/f/v/$piqId/passenger';

  private queueVFPiqPassengerPath = 'queue/v/f/$piqId/passenger';

  constructor(private http: HttpClient) {
  }

  public getAllPlaceInQueueFV(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(BASE_URL + this.queueFVPath);
  }

  public getAllPlaceInQueueVF(): Observable<Array<PlaceInQueue>> {
    return this.http.get<Array<PlaceInQueue>>(BASE_URL + this.queueVFPath);
  }

  public getPlaceInQueueFVByDriverId(driverId: number): Observable<PlaceInQueue> {
    const options = {params: new HttpParams().append('driverId', String(driverId))};
    return this.http.get<PlaceInQueue>(BASE_URL + this.queueFVDriverPath, options);
  }

  public getPlaceInQueueVFByDriverId(driverId: number): Observable<PlaceInQueue> {
    const options = {params: new HttpParams().append('driverId', String(driverId))};
    return this.http.get<PlaceInQueue>(BASE_URL + this.queueVFDriverPath, options);
  }

  public getPlaceInQueueFVByPassengerId(passengerId: number): Observable<PlaceInQueue> {
    const options = {params: new HttpParams().append('passengerId', String(passengerId))};
    return this.http.get<PlaceInQueue>(BASE_URL + this.queueFVPassengerPath, options);
  }

  public getPlaceInQueueVFByPassengerId(passengerId: number): Observable<PlaceInQueue> {
    const options = {params: new HttpParams().append('passengerId', String(passengerId))};
    return this.http.get<PlaceInQueue>(BASE_URL + this.queueVFPassengerPath, options);
  }

  public addDriverInQueueFV(driverId: number): Observable<Array<PlaceInQueue>> {
    const options = {params: new HttpParams().append('driverId', String(driverId))};
    return this.http.post<Array<PlaceInQueue>>(BASE_URL + this.queueFVDriverPath, null, options);
  }

  public addDriverInQueueVF(driverId: number): Observable<Array<PlaceInQueue>> {
    const options = {params: new HttpParams().append('driverId', String(driverId))};
    return this.http.post<Array<PlaceInQueue>>(BASE_URL + this.queueVFDriverPath, null, options);
  }

  public removeDriverFromQueueFV(driverId: number): Observable<Array<PlaceInQueue>> {
    const options = {params: new HttpParams().append('driverId', String(driverId))};
    return this.http.delete<Array<PlaceInQueue>>(BASE_URL + this.queueFVDriverPath, options);
  }

  public removeDriverFromQueueVF(driverId: number): Observable<Array<PlaceInQueue>> {
    const options = {params: new HttpParams().append('driverId', String(driverId))};
    return this.http.delete<Array<PlaceInQueue>>(BASE_URL + this.queueVFDriverPath, options);
  }

  public addPassengerInQueueFV(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    let options = {};
    if (passengerId) {
      options = {params: new HttpParams().append('passengerId', String(passengerId))};
    }
    return this.http.post<Array<PlaceInQueue>>(BASE_URL
      + this.queueFVPiqPassengerPath.replace('$piqId', String(piqId)), null, options);
  }

  public addPassengerInQueueVF(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    let options = {};
    if (passengerId) {
      options = {params: new HttpParams().append('passengerId', String(passengerId))};
    }
    return this.http.post<Array<PlaceInQueue>>(BASE_URL
      + this.queueVFPiqPassengerPath.replace('$piqId', String(piqId)), null, options);
  }

  public removePassengerFromQueueFV(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    let options = {};
    if (passengerId) {
      options = {params: new HttpParams().append('passengerId', String(passengerId))};
    }
    return this.http.delete<Array<PlaceInQueue>>(BASE_URL
      + this.queueFVPiqPassengerPath.replace('$piqId', String(piqId)), options);
  }

  public removePassengerFromQueueVF(piqId: number, passengerId?: number): Observable<Array<PlaceInQueue>> {
    let options = {};
    if (passengerId) {
      options = {params: new HttpParams().append('passengerId', String(passengerId))};
    }
    return this.http.delete<Array<PlaceInQueue>>(BASE_URL
      + this.queueVFPiqPassengerPath.replace('$piqId', String(piqId)), options);
  }
}
