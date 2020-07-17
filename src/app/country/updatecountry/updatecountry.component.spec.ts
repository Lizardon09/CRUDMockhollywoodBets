import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecountryComponent } from './updatecountry.component';

describe('UpdatecountryComponent', () => {
  let component: UpdatecountryComponent;
  let fixture: ComponentFixture<UpdatecountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
