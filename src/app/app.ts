import { Component } from "@angular/core";
import { Route, RouterModule, RouterOutlet } from "@angular/router";
import { ButtonModule } from "@openng/optimus-ui/button";
import { ToastModule } from "@openng/optimus-ui/toast";
import { routes } from "./app.routes";

@Component({
  imports: [RouterOutlet, ButtonModule, RouterModule, ToastModule],
  selector: "app-root",
  templateUrl: "./app.html",
})
export class App {
  routes: Route[] = routes.filter(route => route.path && route.path != "**");
}
