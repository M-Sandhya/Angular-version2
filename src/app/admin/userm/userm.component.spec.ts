/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsermComponent } from './userm.component';

describe('UsermComponent', () => {
  let component: UsermComponent;
  let fixture: ComponentFixture<UsermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
