import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationImageComponent } from './publication-image.component';

describe('PublicationImageComponent', () => {
  let component: PublicationImageComponent;
  let fixture: ComponentFixture<PublicationImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
