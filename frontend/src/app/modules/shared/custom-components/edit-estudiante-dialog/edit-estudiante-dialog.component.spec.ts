import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstudianteDialogComponent } from './edit-estudiante-dialog.component';

describe('EditEstudianteDialogComponent', () => {
  let component: EditEstudianteDialogComponent;
  let fixture: ComponentFixture<EditEstudianteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEstudianteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstudianteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
