import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisviajesComponent } from './misviajes.component';

describe('MisviajesComponent', () => {
  let component: MisviajesComponent;
  let fixture: ComponentFixture<MisviajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisviajesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
