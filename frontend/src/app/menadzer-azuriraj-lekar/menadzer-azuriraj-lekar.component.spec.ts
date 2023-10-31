import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerAzurirajLekarComponent } from './menadzer-azuriraj-lekar.component';

describe('MenadzerAzurirajLekarComponent', () => {
  let component: MenadzerAzurirajLekarComponent;
  let fixture: ComponentFixture<MenadzerAzurirajLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerAzurirajLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerAzurirajLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
