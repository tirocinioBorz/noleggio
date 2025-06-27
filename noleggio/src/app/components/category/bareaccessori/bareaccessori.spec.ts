import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bareaccessori } from './bareaccessori';

describe('Bareaccessori', () => {
  let component: Bareaccessori;
  let fixture: ComponentFixture<Bareaccessori>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bareaccessori]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bareaccessori);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
