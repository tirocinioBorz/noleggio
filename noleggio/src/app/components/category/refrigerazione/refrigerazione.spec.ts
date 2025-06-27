import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Refrigerazione } from './refrigerazione';

describe('Refrigerazione', () => {
  let component: Refrigerazione;
  let fixture: ComponentFixture<Refrigerazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Refrigerazione]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Refrigerazione);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
