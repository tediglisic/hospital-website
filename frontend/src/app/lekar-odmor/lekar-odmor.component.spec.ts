import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarOdmorComponent } from './lekar-odmor.component';

describe('LekarOdmorComponent', () => {
  let component: LekarOdmorComponent;
  let fixture: ComponentFixture<LekarOdmorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarOdmorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarOdmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
