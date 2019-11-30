import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvuploadComponent } from './invupload.component';

describe('InvuploadComponent', () => {
  let component: InvuploadComponent;
  let fixture: ComponentFixture<InvuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
