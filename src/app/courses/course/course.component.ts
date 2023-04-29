import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course;
  courseId;
  RouteParamObs;
  editMode: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private service: CoursesService, private router: Router) { }

  ngOnInit(): void {
    // this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    // // this.courseId = this.activatedRoute.snapshot.params['id'];   
    // this.course = this.service.courses.find(x => x.id == this.courseId);

    this.RouteParamObs = this.activatedRoute.paramMap.subscribe((param) => {
      this.courseId = param.get('id');
      this.course = this.service.courses.find(x => x.id == this.courseId);
    });

    // snapshot
    // this.editMode = Boolean(this.activatedRoute.snapshot.queryParamMap.get('edit'));

    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.editMode = Boolean(param.get('edit'));
    })
    console.log(this.editMode);
  }

  ngOnDestroy(){
    this.RouteParamObs.unsubscribe();
  }

  appendQueryParam(){
    this.router.navigate(['Courses/Course', this.courseId], {queryParams: {edit: true}});
  }
}
