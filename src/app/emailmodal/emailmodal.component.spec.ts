import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailmodalComponent } from './emailmodal.component';

describe('EmailmodalComponent', () => {
  let component: EmailmodalComponent;
  let fixture: ComponentFixture<EmailmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
