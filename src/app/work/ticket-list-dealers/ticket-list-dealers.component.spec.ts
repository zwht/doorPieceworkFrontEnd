import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListDealersComponent } from './ticket-list-dealers.component';

describe('TicketListDealersComponent', () => {
  let component: TicketListDealersComponent;
  let fixture: ComponentFixture<TicketListDealersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketListDealersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
