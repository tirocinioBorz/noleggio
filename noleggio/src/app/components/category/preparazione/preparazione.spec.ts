import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preparazione } from './preparazione';

describe('Preparazione', () => {
  let component: Preparazione;
  let fixture: ComponentFixture<Preparazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Preparazione]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Preparazione);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
