import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPublicationComponent } from './model-publication.component';

describe('ModelPublicationComponent', () => {
  let component: ModelPublicationComponent;
  let fixture: ComponentFixture<ModelPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
