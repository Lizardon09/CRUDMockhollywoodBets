import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemarketComponent } from './deletemarket.component';

describe('DeletemarketComponent', () => {
  let component: DeletemarketComponent;
  let fixture: ComponentFixture<DeletemarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletemarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
