import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerPromenaLozinkeComponent } from './menadzer-promena-lozinke.component';

describe('MenadzerPromenaLozinkeComponent', () => {
  let component: MenadzerPromenaLozinkeComponent;
  let fixture: ComponentFixture<MenadzerPromenaLozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerPromenaLozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerPromenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
