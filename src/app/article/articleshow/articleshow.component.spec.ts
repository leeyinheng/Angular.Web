import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleshowComponent } from './articleshow.component';

describe('ArticleshowComponent', () => {
  let component: ArticleshowComponent;
  let fixture: ComponentFixture<ArticleshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
