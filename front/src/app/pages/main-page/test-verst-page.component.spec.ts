import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVerstPageComponent } from './test-verst-page.component';

describe('TestVerstPageComponent', () => {
  let component: TestVerstPageComponent;
  let fixture: ComponentFixture<TestVerstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestVerstPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVerstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
