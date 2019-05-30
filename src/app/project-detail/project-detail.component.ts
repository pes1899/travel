import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectsService.getProject(id)
      .subscribe(project => { this.project = project });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.projectsService.updateProject(this.project)
      .subscribe(() => this.goBack());
  }

  delete(project: Project): void {
    this.projectsService.deleteProject(this.project)
      .subscribe(() => this.goBack());
  }
}
