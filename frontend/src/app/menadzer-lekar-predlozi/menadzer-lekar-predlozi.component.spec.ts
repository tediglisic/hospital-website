import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerLekarPredloziComponent } from './menadzer-lekar-predlozi.component';

describe('MenadzerLekarPredloziComponent', () => {
  let component: MenadzerLekarPredloziComponent;
  let fixture: ComponentFixture<MenadzerLekarPredloziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerLekarPredloziComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerLekarPredloziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
