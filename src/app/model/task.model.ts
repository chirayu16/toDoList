export interface Subtask {
  name: string;
  completed: boolean;
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks: Subtask[];
  newSubtaskName?: string; // Change: Optional property for input binding
}
