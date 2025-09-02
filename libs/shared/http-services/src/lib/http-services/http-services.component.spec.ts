import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpServicesComponent } from './http-services.component';

describe('HttpServicesComponent', () => {
  let component: HttpServicesComponent;
  let fixture: ComponentFixture<HttpServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
