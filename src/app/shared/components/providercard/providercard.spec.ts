import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Providercard } from './providercard';

describe('Providercard', () => {
  let component: Providercard;
  let fixture: ComponentFixture<Providercard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Providercard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Providercard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
