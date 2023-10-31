import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarIzvestajComponent } from './lekar-izvestaj.component';

describe('LekarIzvestajComponent', () => {
  let component: LekarIzvestajComponent;
  let fixture: ComponentFixture<LekarIzvestajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarIzvestajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarIzvestajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
