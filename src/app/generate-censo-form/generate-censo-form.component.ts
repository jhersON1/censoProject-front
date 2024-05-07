import { Component, effect } from '@angular/core';
import { CensoFormService } from "../services/censoForm/censo-form.service";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-generate-censo-form',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    ReactiveFormsModule,
    MatFormField,
    MatRadioGroup,
    MatRadioButton,
    NgIf,
    MatInput,
    MatLabel
  ],
  templateUrl: './generate-censo-form.component.html',
  styleUrl: './generate-censo-form.component.scss'
})
export class GenerateCensoFormComponent {

  data = { cards: [
      {"radioButton": "", "question":"", "options": []}
    ] };

  constructor(private censoFormService: CensoFormService<any>) {
    effect(() => {
      // Este efecto se reevaluará cada vez que el estado cambie
      this.data = this.censoFormService.getState();
      console.log('datos recibidos', this.data);
    });
  }
}
