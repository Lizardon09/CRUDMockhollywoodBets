import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertmarketComponent } from './insertmarket.component';

describe('InsertmarketComponent', () => {
  let component: InsertmarketComponent;
  let fixture: ComponentFixture<InsertmarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertmarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
