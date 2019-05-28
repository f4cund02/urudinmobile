import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisviajesPage } from './misviajes.page';

describe('MisviajesPage', () => {
  let component: MisviajesPage;
  let fixture: ComponentFixture<MisviajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisviajesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisviajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
