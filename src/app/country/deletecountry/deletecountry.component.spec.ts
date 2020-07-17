import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecountryComponent } from './deletecountry.component';

describe('DeletecountryComponent', () => {
  let component: DeletecountryComponent;
  let fixture: ComponentFixture<DeletecountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletecountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
