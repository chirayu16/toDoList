export interface Task {
  name: string;
  completed: boolean;
  subtasks: Subtask[];
}

export interface Subtask {
  name: string;
  completed: boolean;
}