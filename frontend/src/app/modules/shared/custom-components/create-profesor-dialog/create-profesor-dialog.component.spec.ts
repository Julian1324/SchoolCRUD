import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfesorDialogComponent } from './create-profesor-dialog.component';

describe('CreateProfesorDialogComponent', () => {
  let component: CreateProfesorDialogComponent;
  let fixture: ComponentFixture<CreateProfesorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProfesorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfesorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
