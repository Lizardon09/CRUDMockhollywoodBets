import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebettypeComponent } from './updatebettype.component';

describe('UpdatebettypeComponent', () => {
  let component: UpdatebettypeComponent;
  let fixture: ComponentFixture<UpdatebettypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatebettypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
