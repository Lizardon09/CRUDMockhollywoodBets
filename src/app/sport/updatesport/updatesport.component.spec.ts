import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesportComponent } from './updatesport.component';

describe('UpdatesportComponent', () => {
  let component: UpdatesportComponent;
  let fixture: ComponentFixture<UpdatesportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
