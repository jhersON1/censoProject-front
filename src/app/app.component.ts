import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CensoFormComponent } from "./censo-form/censo-form.component";
import { GenerateCensoFormComponent } from "./generate-censo-form/generate-censo-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CensoFormComponent, GenerateCensoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
