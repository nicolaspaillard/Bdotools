import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "@openng/optimus-ui/button";
import { SelectModule } from "@openng/optimus-ui/select";
import { SliderModule } from "@openng/optimus-ui/slider";
import { TableModule } from "@openng/optimus-ui/table";
import { Item } from "@routes/pearl/item";
import { PearlService } from "@routes/pearl/pearl.service";
import { ToastService } from "@services/toast.service";

@Component({
  selector: "app-pearl",
  imports: [TableModule, ButtonModule, SliderModule, FormsModule, SelectModule],
  templateUrl: "./pearl.html",
  styles: ``,
})
export class Pearl {
  pearlItems = signal<Item[]>([]);
  private pearlService = inject(PearlService);
  private toastService = inject(ToastService);
  copy = (text: string) =>
    navigator.clipboard
      .writeText(text)
      .then(() => this.toastService.success("Success", `Copied "${text}"`))
      .catch(() => this.toastService.error("Error", `Couldn't copy "${text}"`));
  getPearlItems = (hours: number, type: "outfits" | "pets") => this.pearlService.getPearlItems(new Date(Date.now() - hours * 3600000), type).subscribe(items => this.pearlItems.set(items));
}
