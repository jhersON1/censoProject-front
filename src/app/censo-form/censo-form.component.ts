import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIcon } from "@angular/material/icon";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatOption, MatSelect } from "@angular/material/select";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatButton, MatFabButton, MatIconButton } from "@angular/material/button";
import { NgForOf, NgIf } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import { CensoFormService } from "../services/censoForm/censo-form.service";

@Component({
  selector: 'app-censo-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    MatCheckbox,
    MatLabel,
    MatSelect,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconButton,
    MatFabButton,
    NgForOf,
    MatButton,
    NgIf,
    MatCardActions
  ],
  templateUrl: './censo-form.component.html',
  styleUrl: './censo-form.component.scss'
})
export class CensoFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private censoFormService: CensoFormService<any>) {
    this.form = this.fb.group({
      cards: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addCard();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get cards(): FormArray {
    return this.form.get('cards') as FormArray;
  }

  addCard() {
    const cardGroup = this.fb.group({
      radioButton: ['auto'],
      question: ['', Validators.required],
      options: this.fb.array([])
    });

    cardGroup.get('radioButton')!.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      if (value === 'auto') {
        this.clearAllOptions(this.cards.length - 1);
      }
    });

    this.cards.push(cardGroup);
  }

  removeCard(index: number) {
    this.cards.removeAt(index);
  }

  addOption(cardIndex: number) {
    const options = this.cards.at(cardIndex).get('options') as FormArray;
    options.push(new FormControl(''));
  }

  removeOption(cardIndex: number, optionIndex: number) {
    const options = this.cards.at(cardIndex).get('options') as FormArray;
    options.removeAt(optionIndex);
  }

  clearAllOptions(cardIndex: number) {
    const options = this.cards.at(cardIndex).get('options') as FormArray;
    while (options.length !== 0) {
      options.removeAt(0);
    }
  }

  // Este método está correcto para obtener FormArrays:
  getOptions(card: AbstractControl): FormArray {
    return card.get('options') as FormArray;
  }

// Asegurando que cuando accedas a una 'card', la trates como FormGroup
  getCardFormGroup(index: number): FormGroup {
    return this.cards.at(index) as FormGroup;  // Casting a FormGroup
  }

  // Método para obtener un FormControl específico de un FormArray
  getFormControl(formArray: FormArray, index: number): FormControl {
    return formArray.at(index) as FormControl;
  }

  submitForm() {
    if (this.form.valid) {
      this.censoFormService.setState(this.form.value); // Envía los datos del formulario
      console.log('Form data submitted:', this.form.value);
    }
  }
}
