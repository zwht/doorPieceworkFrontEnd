import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineAddComponent } from './line-add.component';

describe('LineAddComponent', () => {
  let component: LineAddComponent;
  let fixture: ComponentFixture<LineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
