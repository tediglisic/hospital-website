import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeregistrovanRegistracijaComponent } from './neregistrovan-registracija.component';

describe('NeregistrovanRegistracijaComponent', () => {
  let component: NeregistrovanRegistracijaComponent;
  let fixture: ComponentFixture<NeregistrovanRegistracijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeregistrovanRegistracijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeregistrovanRegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
