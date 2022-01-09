import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDataModalComponent } from './update-user-data-modal.component';

describe('UpdateUserDataModalComponent', () => {
  let component: UpdateUserDataModalComponent;
  let fixture: ComponentFixture<UpdateUserDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserDataModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
