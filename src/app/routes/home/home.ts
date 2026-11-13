import { DatePipe } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { TimelineModule } from "@openng/optimus-ui/timeline";
import { Event } from "@routes/home/event";
import { HomeService } from "./events.service";

const DAY = 86_400_000;
const REM_PER_DAY = 2.5;

@Component({
  selector: "app-home",
  imports: [TimelineModule, DatePipe],
  templateUrl: "./home.html",
})
export class Home {
  chartWidth = computed(() => ((Math.max(this.today, ...this.events().map(e => e.End.getTime())) - this.today) / DAY) * REM_PER_DAY + 4);
  events = signal<Event[]>([]);
  ticks = computed(() => [...new Set(this.events().map(e => e.End.getTime()))].sort((a, b) => a - b).map(end => ({ end, left: Math.max(0, (end - this.today) / DAY) * REM_PER_DAY })));
  today = Math.floor(Date.now() / DAY) * DAY;
  private homeService = inject(HomeService);
  constructor() {
    this.homeService.getEvents().subscribe(events => this.events.set(events));
  }
}
