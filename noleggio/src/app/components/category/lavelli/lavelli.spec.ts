import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lavelli } from './lavelli';

describe('Lavelli', () => {
  let component: Lavelli;
  let fixture: ComponentFixture<Lavelli>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lavelli]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lavelli);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
