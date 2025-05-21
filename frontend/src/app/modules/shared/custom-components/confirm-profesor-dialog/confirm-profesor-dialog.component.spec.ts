import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProfesorDialogComponent } from './confirm-profesor-dialog.component';

describe('ConfirmProfesorDialogComponent', () => {
  let component: ConfirmProfesorDialogComponent;
  let fixture: ComponentFixture<ConfirmProfesorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmProfesorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmProfesorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
