export class Event {
  End: Date = new Date();
  ID = "";
  Image = "";
  Tag = "";
  Title = "";
  Url = "";
  constructor(event: Event) {
    Object.assign(this, event);
    this.End = new Date(event.End);
  }
}
