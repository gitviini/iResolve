import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyContractsComponent } from './my-contracts.component';
import { ContractService } from '../../../core/services/contract.service';
import { provideRouter } from '@angular/router';

describe('MyContractsComponent', () => {
  let component: MyContractsComponent;
  let fixture: ComponentFixture<MyContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyContractsComponent],
      providers: [ContractService, provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});