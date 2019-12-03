import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvlistComponent } from './invlist.component';

describe('InvlistComponent', () => {
  let component: InvlistComponent;
  let fixture: ComponentFixture<InvlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
