import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorAddComponent } from './door-add.component';

describe('DoorAddComponent', () => {
  let component: DoorAddComponent;
  let fixture: ComponentFixture<DoorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
