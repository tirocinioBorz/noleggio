import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lavaggio } from './lavaggio';

describe('Lavaggio', () => {
  let component: Lavaggio;
  let fixture: ComponentFixture<Lavaggio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lavaggio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lavaggio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
