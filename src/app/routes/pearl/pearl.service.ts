import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PearlItem } from "@models/pearl-item";
import { catchError, map, of } from "rxjs";

const API_URL = "https://bdoapi.nicolaspaillard.fr/";

@Injectable({
  providedIn: "root",
})
export class PearlService {
  private http = inject(HttpClient);
  getPearlItems = (date: Date, type: "outfits" | "pets") => {
    date.setMinutes(0, 0, 0);
    return this.http.get<PearlItem[]>(API_URL + type + "?date=" + formatDate(date, "yyyy-MM-dd HH:00:00", "en-US")).pipe(
      map(res => (res ? res.map(item => new PearlItem(item, (Date.now() - date.getTime()) / 3600000)) : [])),
      catchError(err => {
        console.error(err);
        return of([] as PearlItem[]);
      }),
    );
  };
}
