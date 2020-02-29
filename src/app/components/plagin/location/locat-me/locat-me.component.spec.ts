import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatMeComponent } from './locat-me.component';

describe('LocatMeComponent', () => {
  let component: LocatMeComponent;
  let fixture: ComponentFixture<LocatMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
