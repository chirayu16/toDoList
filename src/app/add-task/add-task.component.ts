import { FormsModule } from '@angular/forms';
import { TodoService } from './../todo.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  taskName:string = '';
  warning: string ='';

  constructor(private todoService: TodoService) { }

  addTask(): void {
    if (this.taskName.trim()) {
      const tasksCount = this.todoService.getTasks().length;
      if (tasksCount >= 10) {
        this.warning = 'Cannot add more than 10 tasks!';
        return;
      }
      this.todoService.addTask(this.taskName);
      this.taskName = '';
      this.warning = '';
    }
  }
}

