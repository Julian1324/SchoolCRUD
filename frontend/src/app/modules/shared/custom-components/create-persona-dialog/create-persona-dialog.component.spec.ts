import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonaDialogComponent } from './create-persona-dialog.component';

describe('CreatePersonaDialogComponent', () => {
  let component: CreatePersonaDialogComponent;
  let fixture: ComponentFixture<CreatePersonaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
