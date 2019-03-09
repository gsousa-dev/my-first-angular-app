import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Task } from './task';

@Injectable()
export class TaskService {

  private baseUrl: string = '/tasks';  // URL to web api
  private tasks: FirebaseListObservable<any>;

  constructor(private af: AngularFire) {
    this.tasks = af.database.list(this.baseUrl);
  }

  getTasksByStatus(status: boolean): FirebaseListObservable<any> {
    return this.af.database.list(this.baseUrl, {
      query: {
        orderByChild: 'completed',
        equalTo: status
      }
    });
  }

  create(body: string): void {
    this.tasks.push(new Task(body));
  }
      
  update(key: string, task: Task): void {
    this.tasks.update(key, task);
  }

  delete(key: string): void {
    this.tasks.remove(key);
  }
}

