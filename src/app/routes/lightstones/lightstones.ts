import { Component, inject, signal } from "@angular/core";
import { TableModule } from "@openng/optimus-ui/table";
import { Lightstone } from "./lightstone";
import { LightstonesService } from "./lightstones.service";

@Component({
  imports: [TableModule],
  selector: "app-lightstones",
  styles: ``,
  templateUrl: "./lightstones.html",
})
export class Lightstones {
  lightstones = signal<Lightstone[]>([]);
  private lightstonesService = inject(LightstonesService);
  constructor() {
    this.lightstonesService.getLightstones().subscribe(lightstones => this.lightstones.set(lightstones));
  }
}
