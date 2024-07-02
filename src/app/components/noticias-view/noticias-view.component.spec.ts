import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasViewComponent } from './noticias-view.component';

describe('NoticiasViewComponent', () => {
  let component: NoticiasViewComponent;
  let fixture: ComponentFixture<NoticiasViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiasViewComponent]
    });
    fixture = TestBed.createComponent(NoticiasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
