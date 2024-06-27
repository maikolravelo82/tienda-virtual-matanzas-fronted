import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarNavComponent } from './var-nav.component';

describe('VarNavComponent', () => {
  let component: VarNavComponent;
  let fixture: ComponentFixture<VarNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
