import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PearlItem } from '@models/pearl-item';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SliderModule } from '@openng/optimus-ui/slider';
import { TableModule } from '@openng/optimus-ui/table';
import { MarketService } from '@services/market.service';

@Component({
  selector: 'app-pearl',
  imports: [TableModule, ButtonModule, SliderModule, FormsModule],
  templateUrl: './pearl.component.html',
  styles: ``,
})
export class PearlComponent {
  pearlItems = signal<PearlItem[]>([]);
  private marketService = inject(MarketService);
  constructor() {
    this.marketService.pearlItems().subscribe(items => this.pearlItems.set(items));
  }
  getPearlItems = (hours: number) => this.marketService.getPearlItems(new Date(Date.now() - hours * 3600000));
}
