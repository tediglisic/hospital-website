import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarPredlogSpecijalizacijeComponent } from './lekar-predlog-specijalizacije.component';

describe('LekarPredlogSpecijalizacijeComponent', () => {
  let component: LekarPredlogSpecijalizacijeComponent;
  let fixture: ComponentFixture<LekarPredlogSpecijalizacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarPredlogSpecijalizacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarPredlogSpecijalizacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
