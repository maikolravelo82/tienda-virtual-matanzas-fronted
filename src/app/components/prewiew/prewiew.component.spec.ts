import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrewiewComponent } from './prewiew.component';

describe('PrewiewComponent', () => {
  let component: PrewiewComponent;
  let fixture: ComponentFixture<PrewiewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrewiewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrewiewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
