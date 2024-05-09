import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVeiculoComponent } from './add-veiculo.component';

describe('AddVeiculoComponent', () => {
  let component: AddVeiculoComponent;
  let fixture: ComponentFixture<AddVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVeiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
