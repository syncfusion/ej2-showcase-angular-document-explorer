import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public dataSubject = new BehaviorSubject<string>('');
  //public data$ = this.dataSubject.asObservable();
  public dataUrl= new BehaviorSubject<string>('');

  public fileObject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  
}
