import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarPromenaLozinkeComponent } from './lekar-promena-lozinke.component';

describe('LekarPromenaLozinkeComponent', () => {
  let component: LekarPromenaLozinkeComponent;
  let fixture: ComponentFixture<LekarPromenaLozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarPromenaLozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarPromenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
