import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCensoFormComponent } from './generate-censo-form.component';

describe('GenerteCensoFormComponent', () => {
  let component: GenerateCensoFormComponent;
  let fixture: ComponentFixture<GenerateCensoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateCensoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateCensoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
