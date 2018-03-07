import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAddComponent } from './code-add.component';

describe('CodeAddComponent', () => {
  let component: CodeAddComponent;
  let fixture: ComponentFixture<CodeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
