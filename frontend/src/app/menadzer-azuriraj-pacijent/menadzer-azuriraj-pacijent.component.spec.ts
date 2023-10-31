import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerAzurirajPacijentComponent } from './menadzer-azuriraj-pacijent.component';

describe('MenadzerAzurirajPacijentComponent', () => {
  let component: MenadzerAzurirajPacijentComponent;
  let fixture: ComponentFixture<MenadzerAzurirajPacijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerAzurirajPacijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerAzurirajPacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
