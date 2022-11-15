import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ICourseRes } from 'src/app/types/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: ICourseRes[] = [];

  constructor(
    private readonly coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.listCourses();
  }

  listCourses() {
    this.coursesService.getCourses().pipe(take(1)).subscribe({
      next: ({ data }) => {
        this.courses = data;
        console.log(this.courses)
      }
    })
  }

}
