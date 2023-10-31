import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentZakazivanjeKalendarComponent } from './pacijent-zakazivanje-kalendar.component';

describe('PacijentZakazivanjeKalendarComponent', () => {
  let component: PacijentZakazivanjeKalendarComponent;
  let fixture: ComponentFixture<PacijentZakazivanjeKalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentZakazivanjeKalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentZakazivanjeKalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
