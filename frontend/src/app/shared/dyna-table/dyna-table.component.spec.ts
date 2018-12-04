import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaTableComponent } from './dyna-table.component';

describe('DynaTableComponent', () => {
  let component: DynaTableComponent;
  let fixture: ComponentFixture<DynaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
