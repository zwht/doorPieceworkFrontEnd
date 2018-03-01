/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoorComponent } from './door.component';

describe('DoorComponent', () => {
  let component: DoorComponent;
  let fixture: ComponentFixture<DoorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
