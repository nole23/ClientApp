import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationShowDeleteComponent } from './publication-show-delete.component';

describe('PublicationShowDeleteComponent', () => {
  let component: PublicationShowDeleteComponent;
  let fixture: ComponentFixture<PublicationShowDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationShowDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationShowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
