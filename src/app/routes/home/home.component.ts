import { Component } from "@angular/core";
import { ButtonModule } from "@openng/optimus-ui/button";
@Component({
  selector: "app-home",
  imports: [ButtonModule],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  test = () => alert("eh");
}
