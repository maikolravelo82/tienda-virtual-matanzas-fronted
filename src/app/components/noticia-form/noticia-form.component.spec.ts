import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaFormComponent } from './noticia-form.component';

describe('NoticiaFormComponent', () => {
  let component: NoticiaFormComponent;
  let fixture: ComponentFixture<NoticiaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiaFormComponent]
    });
    fixture = TestBed.createComponent(NoticiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
