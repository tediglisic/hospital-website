import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerDodajSpecijalizacijuComponent } from './menadzer-dodaj-specijalizaciju.component';

describe('MenadzerDodajSpecijalizacijuComponent', () => {
  let component: MenadzerDodajSpecijalizacijuComponent;
  let fixture: ComponentFixture<MenadzerDodajSpecijalizacijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerDodajSpecijalizacijuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerDodajSpecijalizacijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
