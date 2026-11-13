import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Event } from "@models/event";
import { catchError, map, of } from "rxjs";

const API_URL = "https://bdoapi.nicolaspaillard.fr/";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  private http = inject(HttpClient);
  getEvents = () => {
    return this.http.get<Event[]>(API_URL + "events").pipe(
      map(res => (res ? res.map(item => new Event(item)) : [])),
      catchError(err => {
        console.error(err);
        return of([] as Event[]);
      }),
    );
  };
}
