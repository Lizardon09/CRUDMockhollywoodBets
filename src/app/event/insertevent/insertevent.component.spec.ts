import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserteventComponent } from './insertevent.component';

describe('InserteventComponent', () => {
  let component: InserteventComponent;
  let fixture: ComponentFixture<InserteventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserteventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
