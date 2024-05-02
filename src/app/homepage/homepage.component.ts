import { Component } from '@angular/core';
import { NabbarComponent } from '../navbar/nabbar.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NabbarComponent, MatCardModule, ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  imageUrl: string = "src/logo.png";
}
