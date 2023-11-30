import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightInfoComponent } from './copyright-info.component';

describe('CopyrightInfoComponent', () => {
  let component: CopyrightInfoComponent;
  let fixture: ComponentFixture<CopyrightInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyrightInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyrightInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
