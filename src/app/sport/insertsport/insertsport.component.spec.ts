import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertsportComponent } from './insertsport.component';

describe('InsertsportComponent', () => {
  let component: InsertsportComponent;
  let fixture: ComponentFixture<InsertsportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertsportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertsportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
