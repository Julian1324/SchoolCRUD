import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEstudiantesDialogComponent } from './confirm-estudiantes-dialog.component';

describe('ConfirmEstudiantesDialogComponent', () => {
  let component: ConfirmEstudiantesDialogComponent;
  let fixture: ComponentFixture<ConfirmEstudiantesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEstudiantesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEstudiantesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
