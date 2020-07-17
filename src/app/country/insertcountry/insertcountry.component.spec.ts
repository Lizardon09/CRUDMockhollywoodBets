import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertcountryComponent } from './insertcountry.component';

describe('InsertcountryComponent', () => {
  let component: InsertcountryComponent;
  let fixture: ComponentFixture<InsertcountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertcountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
