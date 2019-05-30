import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from './project';
import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      { id: 1, code: 'X123', name: 'vytvorenie appky', validFrom: '2019-05-12', validTill: null },
      { id: 2, code: '456', name: 'testovanie appky', validFrom: '2019-06-12', validTill: null },
      { id: 2, code: '879', name: 'pekny projekt', validFrom: '2019-08-12', validTill: '2020-10-10' }
    ];

    const users = [
      { id: 1, value: 'Admin', login: 'jozko', validFrom: '2019-05-12', validTill: null },
      { id: 2, value: 'Admin', login: 'ferko', validFrom: '2019-06-12', validTill: null },
      { id: 2, value: 'Admin', login: 'matus', validFrom: '2019-08-12', validTill: '2020-10-10' }
    ];

    return { projects, users };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId<T extends Project | User>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }
}