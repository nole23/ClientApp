import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFriendsComponent } from './delete-friends.component';

describe('DeleteFriendsComponent', () => {
  let component: DeleteFriendsComponent;
  let fixture: ComponentFixture<DeleteFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
