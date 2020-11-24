import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuArribaComponent } from './menu-arriba.component';

describe('MenuArribaComponent', () => {
  let component: MenuArribaComponent;
  let fixture: ComponentFixture<MenuArribaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuArribaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuArribaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
