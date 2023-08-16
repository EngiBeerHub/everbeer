import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPageComponent } from './top-page.component';

describe('TopComponent', () => {
  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPageComponent],
    });
    fixture = TestBed.createComponent(TopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
