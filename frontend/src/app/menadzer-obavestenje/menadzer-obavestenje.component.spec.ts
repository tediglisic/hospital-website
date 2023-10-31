import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerObavestenjeComponent } from './menadzer-obavestenje.component';

describe('MenadzerObavestenjeComponent', () => {
  let component: MenadzerObavestenjeComponent;
  let fixture: ComponentFixture<MenadzerObavestenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerObavestenjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerObavestenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
