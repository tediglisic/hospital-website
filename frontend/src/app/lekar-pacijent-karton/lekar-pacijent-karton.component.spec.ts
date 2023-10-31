import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarPacijentKartonComponent } from './lekar-pacijent-karton.component';

describe('LekarPacijentKartonComponent', () => {
  let component: LekarPacijentKartonComponent;
  let fixture: ComponentFixture<LekarPacijentKartonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarPacijentKartonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarPacijentKartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
