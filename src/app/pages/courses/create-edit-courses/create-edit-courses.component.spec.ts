import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCoursesComponent } from './create-edit-courses.component';

describe('CreateEditCoursesComponent', () => {
  let component: CreateEditCoursesComponent;
  let fixture: ComponentFixture<CreateEditCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
