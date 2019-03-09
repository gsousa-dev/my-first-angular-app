import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TaskService } from './task.service';

import { Task } from './task';

@Component({
  selector: 'app-root',
  providers: [ TaskService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  uncompletedTasks: Task[] = [];
  completedTasks: Task[] = [];
    
  constructor(private taskService: TaskService) {
    this.taskService.getTasksByStatus(false).subscribe(tasks => {
      this.uncompletedTasks = tasks.map(task => {
        return {
          key: task.$key,
          body: task.body,
          completed: task.completed
        };
      });
    });

    this.taskService.getTasksByStatus(true).subscribe(tasks => {
      this.completedTasks = tasks.map(task => {
        return {
          key: task.$key,
          body: task.body,
          completed: task.completed
        };
      });
    });
  }

  addTask(body: string): void {
    body = body.trim();
    if (!body) { return; }
    this.taskService.create(body);
  }

  updateTask(id: string, newValue: Task): void {
    if (newValue.body == '') { return; }
    else if (newValue.body) {
      newValue.body = newValue.body.trim();
    }
    this.taskService.update(id, newValue)
  }

  deleteTask(key: string): void {
    if(!key) { return ;}
    this.taskService.delete(key);
  }

  deleteTasks(tasks: Task[]): void {
    tasks.forEach(task => {
      this.taskService.delete(task.key);
    });
  }
}
