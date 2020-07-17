import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesportComponent } from './deletesport.component';

describe('DeletesportComponent', () => {
  let component: DeletesportComponent;
  let fixture: ComponentFixture<DeletesportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletesportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
