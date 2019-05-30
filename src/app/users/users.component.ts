import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  add(): void {
    this.userService.addUser(new User())
      .subscribe(user => {
        this.users.push(user);
        this.router.navigate(['user/' + user.id]);
      });
  }

}
