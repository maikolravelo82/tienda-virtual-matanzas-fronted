import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarbooksComponent } from './gestionarbooks.component';

describe('GestionarbooksComponent', () => {
  let component: GestionarbooksComponent;
  let fixture: ComponentFixture<GestionarbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarbooksComponent]
    });
    fixture = TestBed.createComponent(GestionarbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
