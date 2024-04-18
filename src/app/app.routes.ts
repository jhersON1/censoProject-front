import { Routes } from '@angular/router';
import { CensoFormComponent } from "./censo-form/censo-form.component";
import { GenerateCensoFormComponent } from "./generate-censo-form/generate-censo-form.component";

export const routes: Routes = [
  {
    path: "censo-form",
    component: CensoFormComponent,
  },
  {
    path: "generate-censo",
    component: GenerateCensoFormComponent
  }
];
