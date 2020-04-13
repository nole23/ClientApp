import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersChatComponent } from './list-users-chat.component';

describe('ListUsersChatComponent', () => {
  let component: ListUsersChatComponent;
  let fixture: ComponentFixture<ListUsersChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUsersChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
