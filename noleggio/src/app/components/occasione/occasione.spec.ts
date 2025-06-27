import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Occasione } from './occasione';

describe('Occasione', () => {
  let component: Occasione;
  let fixture: ComponentFixture<Occasione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Occasione]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Occasione);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
