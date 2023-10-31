import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeregistrovanPocetnaComponent } from './neregistrovan-pocetna.component';

describe('NeregistrovanPocetnaComponent', () => {
  let component: NeregistrovanPocetnaComponent;
  let fixture: ComponentFixture<NeregistrovanPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeregistrovanPocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeregistrovanPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
