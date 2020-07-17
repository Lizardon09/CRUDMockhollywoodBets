import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetournamentComponent } from './deletetournament.component';

describe('DeletetournamentComponent', () => {
  let component: DeletetournamentComponent;
  let fixture: ComponentFixture<DeletetournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletetournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
