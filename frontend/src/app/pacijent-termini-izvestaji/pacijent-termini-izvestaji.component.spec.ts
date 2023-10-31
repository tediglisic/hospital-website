import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentTerminiIzvestajiComponent } from './pacijent-termini-izvestaji.component';

describe('PacijentTerminiIzvestajiComponent', () => {
  let component: PacijentTerminiIzvestajiComponent;
  let fixture: ComponentFixture<PacijentTerminiIzvestajiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentTerminiIzvestajiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentTerminiIzvestajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
