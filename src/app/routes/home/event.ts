export class Event {
  End: Date = new Date();
  ID = 0;
  Image = "";
  Tag = "";
  Title = "";
  Url = "";
  constructor(event: Event) {
    Object.assign(this, event);
    this.End = new Date(event.End);
  }
}
