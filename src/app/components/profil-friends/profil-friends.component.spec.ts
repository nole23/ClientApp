import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilFriendsComponent } from './profil-friends.component';

describe('ProfilFriendsComponent', () => {
  let component: ProfilFriendsComponent;
  let fixture: ComponentFixture<ProfilFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
