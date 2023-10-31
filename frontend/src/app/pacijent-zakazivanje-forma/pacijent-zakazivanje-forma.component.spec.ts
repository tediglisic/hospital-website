import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentZakazivanjeFormaComponent } from './pacijent-zakazivanje-forma.component';

describe('PacijentZakazivanjeFormaComponent', () => {
  let component: PacijentZakazivanjeFormaComponent;
  let fixture: ComponentFixture<PacijentZakazivanjeFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentZakazivanjeFormaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentZakazivanjeFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
