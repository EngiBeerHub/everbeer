import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPageComponent } from './top-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RandomBeerComponent } from '../../containers/random-beer/random-beer.component';
import { BeerService } from 'src/app/services/beer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopPageComponent', () => {
  let component: TopPageComponent;
  let fixture: ComponentFixture<TopPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPageComponent, RandomBeerComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
      ],
      providers: [BeerService],
    });
    fixture = TestBed.createComponent(TopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
