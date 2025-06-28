import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiClientComponent } from './api-client.component';

describe('ApiClientComponent', () => {
  let component: ApiClientComponent;
  let fixture: ComponentFixture<ApiClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiClientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
