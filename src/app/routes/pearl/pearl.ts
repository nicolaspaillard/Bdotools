import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "@openng/optimus-ui/button";
import { SelectModule } from "@openng/optimus-ui/select";
import { SliderModule } from "@openng/optimus-ui/slider";
import { TableModule } from "@openng/optimus-ui/table";
import { Item } from "@routes/pearl/item";
import { PearlService } from "@routes/pearl/pearl.service";

@Component({
  selector: "app-pearl",
  imports: [TableModule, ButtonModule, SliderModule, FormsModule, SelectModule],
  templateUrl: "./pearl.html",
  styles: ``,
})
export class Pearl {
  pearlItems = signal<Item[]>([]);
  private pearlService = inject(PearlService);
  constructor() {
    this.getPearlItems(3, "outfits");
  }
  getPearlItems = (hours: number, type: "outfits" | "pets") => this.pearlService.getPearlItems(new Date(Date.now() - hours * 3600000), type).subscribe(items => this.pearlItems.set(items));
}
