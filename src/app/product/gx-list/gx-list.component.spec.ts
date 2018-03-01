import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GxListComponent } from './gx-list.component';

describe('GxListComponent', () => {
  let component: GxListComponent;
  let fixture: ComponentFixture<GxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
