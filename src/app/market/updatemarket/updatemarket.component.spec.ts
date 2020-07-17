import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemarketComponent } from './updatemarket.component';

describe('UpdatemarketComponent', () => {
  let component: UpdatemarketComponent;
  let fixture: ComponentFixture<UpdatemarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
