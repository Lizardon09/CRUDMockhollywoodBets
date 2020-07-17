import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebettypeComponent } from './deletebettype.component';

describe('DeletebettypeComponent', () => {
  let component: DeletebettypeComponent;
  let fixture: ComponentFixture<DeletebettypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletebettypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletebettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
