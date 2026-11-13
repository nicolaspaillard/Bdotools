import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "BDO Tools",
    loadComponent: () => import("@routes/home/home").then(m => m.Home),
  },
  {
    path: "trade",
    title: "Trade Calculator",
    loadComponent: () => import("@routes/trade/trade").then(m => m.Trade),
  },
  {
    path: "pearl",
    title: "Pearl Items",
    loadComponent: () => import("@routes/pearl/pearl").then(m => m.Pearl),
  },
  {
    path: "lightstones",
    title: "Lightstone crystals",
    loadComponent: () => import("@routes/lightstones/lightstones").then(m => m.Lightstones),
  },
  {
    path: "untile",
    title: "Untile",
    loadComponent: () => import("@routes/untile/untile").then(m => m.Untile),
  },
  // {
  //   path: "customizer",
  //   title: "Face Customizer",
  //   loadComponent: () => import("@routes/face-customizer/face-customizer.component").then((m) => m.FaceCustomizerComponent),
  // },
  { path: "**", redirectTo: "" },
];
