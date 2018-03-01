import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GxAddComponent } from './gx-add.component';

describe('GxAddComponent', () => {
  let component: GxAddComponent;
  let fixture: ComponentFixture<GxAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GxAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
