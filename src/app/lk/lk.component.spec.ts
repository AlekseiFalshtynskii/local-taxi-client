import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LKComponent } from './lk.component';

describe('LKComponent', () => {
  let component: LKComponent;
  let fixture: ComponentFixture<LKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LKComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
