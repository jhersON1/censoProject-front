import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CensoFormComponent } from './censo-form.component';

describe('CensoFormComponent', () => {
  let component: CensoFormComponent;
  let fixture: ComponentFixture<CensoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CensoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CensoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
