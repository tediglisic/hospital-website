import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerOdobriPacijentaComponent } from './menadzer-odobri-pacijenta.component';

describe('MenadzerOdobriPacijentaComponent', () => {
  let component: MenadzerOdobriPacijentaComponent;
  let fixture: ComponentFixture<MenadzerOdobriPacijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerOdobriPacijentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerOdobriPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
