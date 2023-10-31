import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerAzurirajPregledeComponent } from './menadzer-azuriraj-preglede.component';

describe('MenadzerAzurirajPregledeComponent', () => {
  let component: MenadzerAzurirajPregledeComponent;
  let fixture: ComponentFixture<MenadzerAzurirajPregledeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerAzurirajPregledeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerAzurirajPregledeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
