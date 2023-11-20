import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginbtnComponent } from './loginbtn.component';

describe('LoginbtnComponent', () => {
  let component: LoginbtnComponent;
  let fixture: ComponentFixture<LoginbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginbtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
