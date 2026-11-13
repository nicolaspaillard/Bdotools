export class Lightstone {
  // l.itemid, l.name, l.stock, l.price, q.quantity, l.silver
  Itemid = 0;
  Name = "";
  Price = 0;
  Quantity = 0;
  Silver = 0;
  Stock = 0;
  constructor(lightstone: Lightstone) {
    Object.assign(this, lightstone);
  }
}
