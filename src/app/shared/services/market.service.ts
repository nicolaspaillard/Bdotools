import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PearlItem } from '@models/pearl-item';
import { ReplaySubject, Subject } from 'rxjs';

const API_URL = 'https://bdoapi.nicolaspaillard.fr/';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private _pearlItems: Subject<PearlItem[]> = new ReplaySubject(1);
  private http = inject(HttpClient);
  constructor() {
    this.getPearlItems(new Date(Date.now() - 3 * 3600000));
  }
  getPearlItems = (date: Date) => {
    date.setMinutes(0, 0, 0);
    this.http.get<PearlItem[]>(API_URL + 'outfits?date=' + formatDate(date, 'yyyy-MM-dd HH:00:00', 'en-US')).subscribe({
      next: res => this._pearlItems.next(res ? res.map(item => new PearlItem(item, (Date.now() - date.getTime()) / 3600000)) : []),
      error: err => console.log(err),
    });
  };
  pearlItems = () => this._pearlItems.asObservable();
}
