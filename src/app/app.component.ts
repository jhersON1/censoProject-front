import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NabbarComponent } from "./navbar/nabbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NabbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
