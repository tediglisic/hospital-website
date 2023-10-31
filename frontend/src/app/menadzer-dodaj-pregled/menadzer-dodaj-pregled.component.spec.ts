import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerDodajPregledComponent } from './menadzer-dodaj-pregled.component';

describe('MenadzerDodajPregledComponent', () => {
  let component: MenadzerDodajPregledComponent;
  let fixture: ComponentFixture<MenadzerDodajPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerDodajPregledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerDodajPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
