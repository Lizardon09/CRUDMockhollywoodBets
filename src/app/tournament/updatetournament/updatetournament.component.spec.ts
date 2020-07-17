import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetournamentComponent } from './updatetournament.component';

describe('UpdatetournamentComponent', () => {
  let component: UpdatetournamentComponent;
  let fixture: ComponentFixture<UpdatetournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatetournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
