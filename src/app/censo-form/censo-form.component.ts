import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatIcon } from "@angular/material/icon";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatOption, MatSelect } from "@angular/material/select";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatButton, MatFabButton, MatIconButton } from "@angular/material/button";
import { NgForOf, NgIf } from "@angular/common";
import { Subscription } from "rxjs";

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

  public cards: any[] = [];
  private radioButtonSubscription!: Subscription;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addCard();
  }

  ngOnDestroy() {
    this.cards.forEach(card => {
      if (card.radioButtonSubscription) {
        card.radioButtonSubscription.unsubscribe();
      }
    });
  }

  getFormGroup(index: number): FormGroup {
    if (!this.cards[index].formGroup) {
      this.cards[index].formGroup = this._formBuilder.group({
        radioButton: ['auto']
      });
      this.cards[index].dynamicControls = [];
      this.cards[index].radioButtonSubscription = this.cards[index].formGroup.get('radioButton')!.valueChanges.subscribe((value: string) => {
        if (value === 'auto') {
          this.clearAllOptions(index);
        }
      });
    }
    return this.cards[index].formGroup;
  }

  addCard() {
    this.cards.push({});
  }

  removeCard(index: number) {
    this.cards.splice(index, 1);
  }

  addOption(index: number) {
    const newControl = new FormControl('');
    this.cards[index].dynamicControls.push(newControl);
    this.getFormGroup(index).addControl(`option${this.cards[index].dynamicControls.length}`, newControl);
  }

  removeOption(cardIndex: number, optionIndex: number) {
    this.cards[cardIndex].dynamicControls.splice(optionIndex, 1);
    this.getFormGroup(cardIndex).removeControl(`option${optionIndex + 1}`);

    this.cards[cardIndex].dynamicControls.forEach((control: any, i: number) => {
      const oldName = `option${i + 2}`;
      const newName = `option${i + 1}`;
      if (this.getFormGroup(cardIndex).contains(oldName)) {
        this.getFormGroup(cardIndex).setControl(newName, control);
        this.getFormGroup(cardIndex).removeControl(oldName);
      }
    });
  }

  clearOption(cardIndex: number, optionIndex: number) {
    this.cards[cardIndex].dynamicControls[optionIndex].reset('');
  }

  clearAllOptions(index: number) {
    this.cards[index].dynamicControls.forEach((control: { reset: (arg0: string) => any; }) => control.reset(''));
    this.cards[index].dynamicControls = [];
    Object.keys(this.getFormGroup(index).controls).forEach(key => {
      if (key.startsWith('option')) {
        this.getFormGroup(index).removeControl(key);
      }
    });
  }
}
