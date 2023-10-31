import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeregistrovanLoginComponent } from './neregistrovan-login.component';

describe('NeregistrovanLoginComponent', () => {
  let component: NeregistrovanLoginComponent;
  let fixture: ComponentFixture<NeregistrovanLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeregistrovanLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeregistrovanLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
