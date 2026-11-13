import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { Lightstone } from "./lightstone";

const API_URL = "https://bdoapi.nicolaspaillard.fr/";
@Service()
export class LightstonesService {
  private http = inject(HttpClient);
  getLightstones = () => {
    return this.http.get<Lightstone[]>(API_URL + "lightstones").pipe(
      map(res => (res ? res.map(item => new Lightstone(item)) : [])),
      catchError(err => {
        console.error(err);
        return of([] as Lightstone[]);
      }),
    );
  };
}
