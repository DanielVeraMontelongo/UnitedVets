import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreHistorialComponent } from './pre-historial.component';

describe('PreHistorialComponent', () => {
  let component: PreHistorialComponent;
  let fixture: ComponentFixture<PreHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
