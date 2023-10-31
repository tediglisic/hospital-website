import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentPregledLekaraComponent } from './pacijent-pregled-lekara.component';

describe('PacijentPregledLekaraComponent', () => {
  let component: PacijentPregledLekaraComponent;
  let fixture: ComponentFixture<PacijentPregledLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentPregledLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentPregledLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
