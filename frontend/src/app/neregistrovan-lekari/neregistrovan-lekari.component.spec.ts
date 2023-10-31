import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeregistrovanLekariComponent } from './neregistrovan-lekari.component';

describe('NeregistrovanLekariComponent', () => {
  let component: NeregistrovanLekariComponent;
  let fixture: ComponentFixture<NeregistrovanLekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeregistrovanLekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeregistrovanLekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
