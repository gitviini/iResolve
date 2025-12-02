import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Needcard } from './needcard';

describe('Needcard', () => {
  let component: Needcard;
  let fixture: ComponentFixture<Needcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Needcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Needcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
