import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonaDialogComponent } from './edit-persona-dialog.component';

describe('EditPersonaDialogComponent', () => {
  let component: EditPersonaDialogComponent;
  let fixture: ComponentFixture<EditPersonaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
