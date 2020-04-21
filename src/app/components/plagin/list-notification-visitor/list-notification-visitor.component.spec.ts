import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotificationVisitorComponent } from './list-notification-visitor.component';

describe('ListNotificationVisitorComponent', () => {
  let component: ListNotificationVisitorComponent;
  let fixture: ComponentFixture<ListNotificationVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNotificationVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNotificationVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
