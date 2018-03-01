import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersAddComponent } from './dealers-add.component';

describe('DealersAddComponent', () => {
  let component: DealersAddComponent;
  let fixture: ComponentFixture<DealersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
