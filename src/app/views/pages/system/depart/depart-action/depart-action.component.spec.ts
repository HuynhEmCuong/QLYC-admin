/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepartActionComponent } from './depart-action.component';

describe('DepartActionComponent', () => {
  let component: DepartActionComponent;
  let fixture: ComponentFixture<DepartActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
