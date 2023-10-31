import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerPocetnaComponent } from './menadzer-pocetna.component';

describe('MenadzerPocetnaComponent', () => {
  let component: MenadzerPocetnaComponent;
  let fixture: ComponentFixture<MenadzerPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerPocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
