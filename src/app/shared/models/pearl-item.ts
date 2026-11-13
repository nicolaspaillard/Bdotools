export class PearlItem {
  EstimatedHours: number | null = null;
  ID = 0;
  Itemid = 0;
  Name = "";
  Percentage = 0;
  Preorders = 0;
  Sold = 0;
  constructor(pearlItem: PearlItem, windowHours = 3) {
    Object.assign(this, pearlItem);
    this.Percentage = Math.round((1 - Math.exp(-((this.Sold / windowHours) * 24) / (this.Preorders + 1))) * 1000) / 10;
    this.EstimatedHours = this.Sold ? Math.round(((this.Preorders + 1) * windowHours) / this.Sold) : null;
  }
}
