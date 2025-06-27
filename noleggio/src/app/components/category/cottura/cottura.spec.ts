import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cottura } from './cottura';

describe('Cottura', () => {
  let component: Cottura;
  let fixture: ComponentFixture<Cottura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cottura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cottura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
