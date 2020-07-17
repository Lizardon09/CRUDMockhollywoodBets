import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserttournamentComponent } from './inserttournament.component';

describe('InserttournamentComponent', () => {
  let component: InserttournamentComponent;
  let fixture: ComponentFixture<InserttournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserttournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserttournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
