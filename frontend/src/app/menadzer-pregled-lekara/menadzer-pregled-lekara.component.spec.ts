import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerPregledLekaraComponent } from './menadzer-pregled-lekara.component';

describe('MenadzerPregledLekaraComponent', () => {
  let component: MenadzerPregledLekaraComponent;
  let fixture: ComponentFixture<MenadzerPregledLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerPregledLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerPregledLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
