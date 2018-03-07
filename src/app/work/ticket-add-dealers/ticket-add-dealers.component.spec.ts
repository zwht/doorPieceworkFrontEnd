import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddDealersComponent } from './ticket-add-dealers.component';

describe('TicketAddDealersComponent', () => {
  let component: TicketAddDealersComponent;
  let fixture: ComponentFixture<TicketAddDealersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAddDealersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
