import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentPromenaLozinkeComponent } from './pacijent-promena-lozinke.component';

describe('PacijentPromenaLozinkeComponent', () => {
  let component: PacijentPromenaLozinkeComponent;
  let fixture: ComponentFixture<PacijentPromenaLozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentPromenaLozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentPromenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
