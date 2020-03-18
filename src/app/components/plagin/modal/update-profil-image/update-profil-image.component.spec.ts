import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilImageComponent } from './update-profil-image.component';

describe('UpdateProfilImageComponent', () => {
  let component: UpdateProfilImageComponent;
  let fixture: ComponentFixture<UpdateProfilImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfilImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
