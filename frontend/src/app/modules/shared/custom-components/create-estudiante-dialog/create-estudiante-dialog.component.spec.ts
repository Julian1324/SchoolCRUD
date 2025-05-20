import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstudianteDialogComponent } from './create-estudiante-dialog.component';

describe('CreateEstudianteDialogComponent', () => {
  let component: CreateEstudianteDialogComponent;
  let fixture: ComponentFixture<CreateEstudianteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEstudianteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEstudianteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
