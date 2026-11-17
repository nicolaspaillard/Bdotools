import { Component, inject, signal } from "@angular/core";
import { TableModule } from "@openng/optimus-ui/table";
import { ToastService } from "@services/toast.service";
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
  private toastService = inject(ToastService);
  constructor() {
    this.lightstonesService.getLightstones().subscribe(lightstones => this.lightstones.set(lightstones));
  }
  copy = (text: string) =>
    navigator.clipboard
      .writeText(text)
      .then(() => this.toastService.success("Success", `Copied "${text}"`))
      .catch(() => this.toastService.error("Error", `Couldn't copy "${text}"`));
}
