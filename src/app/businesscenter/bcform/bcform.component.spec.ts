import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcformComponent } from './bcform.component';

describe('BcformComponent', () => {
  let component: BcformComponent;
  let fixture: ComponentFixture<BcformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
