import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviajeComponent } from './enviaje.component';

describe('EnviajeComponent', () => {
  let component: EnviajeComponent;
  let fixture: ComponentFixture<EnviajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviajeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
