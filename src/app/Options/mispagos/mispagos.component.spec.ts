import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MispagosComponent } from './mispagos.component';

describe('MispagosComponent', () => {
  let component: MispagosComponent;
  let fixture: ComponentFixture<MispagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MispagosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MispagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
