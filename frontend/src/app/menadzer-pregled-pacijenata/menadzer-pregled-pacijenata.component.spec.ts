import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerPregledPacijenataComponent } from './menadzer-pregled-pacijenata.component';

describe('MenadzerPregledPacijenataComponent', () => {
  let component: MenadzerPregledPacijenataComponent;
  let fixture: ComponentFixture<MenadzerPregledPacijenataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerPregledPacijenataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerPregledPacijenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
