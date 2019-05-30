import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectsService,
    private router: Router) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  add(): void {
    this.projectService.addProject(new Project())
      .subscribe(project => {
        this.projects.push(project);
        this.router.navigate(['project/' + project.id]);
      });
  }
}
