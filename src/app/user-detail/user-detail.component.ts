import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usersService.getUser(id)
      .subscribe(user => { this.user = user });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.usersService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  delete(user: User): void {
    this.usersService.deleteUser(this.user)
      .subscribe(() => this.goBack());
  }
}
