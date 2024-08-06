import { FormsModule } from '@angular/forms';
import { TodoService } from './../todo.service';
import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit, AfterViewInit {

  taskName:string = '';
  warning: string ='';
  @Output() taskAdded = new EventEmitter<void>();

  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.focusInput();
  }

  addTask(): void {
    if (this.taskName.trim() === '') {
      this.warning = 'Cannot add empty task!';
      return;
    }

    const tasksCount = this.todoService.getTasks().length;
    if (tasksCount >= 10) {
      this.warning = 'Cannot add more than 10 tasks!';
      return;
    }

    // Check for duplicate tasks
    const existingTasks = this.todoService.getTasks();
    if (existingTasks.some(task => task.name.toLowerCase() === this.taskName.trim().toLowerCase())) {
      this.warning = 'Task already exists!';
      return;
    }

    this.todoService.addTask(this.taskName);
    this.taskName = '';
    this.warning = '';
    this.taskAdded.emit();
  }

  focusInput(): void {
    if(this.taskInput) {
      this.taskInput.nativeElement.focus();
    }
  }
}

