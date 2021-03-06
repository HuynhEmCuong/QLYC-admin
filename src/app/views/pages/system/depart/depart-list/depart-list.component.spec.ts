/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepartListComponent } from './depart-list.component';

describe('DepartListComponent', () => {
  let component: DepartListComponent;
  let fixture: ComponentFixture<DepartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
