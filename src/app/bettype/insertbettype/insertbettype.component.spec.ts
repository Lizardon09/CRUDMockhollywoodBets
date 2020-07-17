import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertbettypeComponent } from './insertbettype.component';

describe('InsertbettypeComponent', () => {
  let component: InsertbettypeComponent;
  let fixture: ComponentFixture<InsertbettypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertbettypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertbettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
