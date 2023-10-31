import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentLekarProfilComponent } from './pacijent-lekar-profil.component';

describe('PacijentLekarProfilComponent', () => {
  let component: PacijentLekarProfilComponent;
  let fixture: ComponentFixture<PacijentLekarProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentLekarProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentLekarProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
