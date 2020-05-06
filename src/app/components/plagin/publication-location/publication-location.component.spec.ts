import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationLocationComponent } from './publication-location.component';

describe('PublicationLocationComponent', () => {
  let component: PublicationLocationComponent;
  let fixture: ComponentFixture<PublicationLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
