export class PearlItem {
  Date: Date = new Date();
  EstimatedHours: number | null = null;
  ID: number = 0;
  Itemid: number = 0;
  Name: string = '';
  Percentage: number = 0;
  Preorders: number = 0;
  Sold: number = 0;
  constructor(pearlItem: PearlItem, windowHours = 3) {
    Object.assign(this, pearlItem);
    this.Percentage = Math.round((1 - Math.exp(-((this.Sold / windowHours) * 24) / (this.Preorders + 1))) * 1000) / 10;
    this.EstimatedHours = this.Sold ? Math.round(((this.Preorders + 1) * windowHours) / this.Sold) : null;
  }
}
