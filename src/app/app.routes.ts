import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'BDO Tools',
    loadComponent: () => import('@routes/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'trade',
    title: 'Trade Calculator',
    loadComponent: () => import('@routes/trade/trade.component').then(m => m.TradeComponent),
  },
  {
    path: 'pearl',
    title: 'Pearl Items',
    loadComponent: () => import('@routes/pearl/pearl.component').then(m => m.PearlComponent),
  },
  {
    path: 'untile',
    title: 'Untile',
    loadComponent: () => import('@routes/untile/untile.component').then(m => m.UntileComponent),
  },
  // {
  //   path: "customizer",
  //   title: "Face Customizer",
  //   loadComponent: () => import("@routes/face-customizer/face-customizer.component").then((m) => m.FaceCustomizerComponent),
  // },
  { path: '**', redirectTo: '' },
];
