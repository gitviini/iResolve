import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedDetails } from './need-details';

describe('NeedDetails', () => {
  let component: NeedDetails;
  let fixture: ComponentFixture<NeedDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
