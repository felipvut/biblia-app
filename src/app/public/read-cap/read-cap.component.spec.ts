import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCapComponent } from './read-cap.component';

describe('ReadCapComponent', () => {
  let component: ReadCapComponent;
  let fixture: ComponentFixture<ReadCapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadCapComponent]
    });
    fixture = TestBed.createComponent(ReadCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
