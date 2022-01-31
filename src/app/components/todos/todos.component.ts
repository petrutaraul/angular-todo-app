import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] | undefined;

  todosCookie = JSON.parse(localStorage.getItem('todos') || '[]');

  inputTodo: string = '';

  constructor() {}

  ngOnInit(): void {
    this.todos = this.todosCookie;
  }

  setCookie() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  toggleDone(id: number) {
    this.todos?.map((v, i) => {
      if (i == id) v.completed = !v.completed;

      return v;
    });

    this.setCookie();
  }

  deleteTodo(id: number) {
    this.todos = this.todos?.filter((v, i) => i !== id);

    this.setCookie();
  }

  addTodo() {
    if (this.inputTodo.length <= 0) {
      alert('Please enter a todo!');
    } else if (this.todos?.some((e) => e.contet === this.inputTodo)) {
      alert('Todo already added');
    } else {
      this.todos?.push({
        contet: this.inputTodo,
        completed: false,
      });

      this.setCookie();

      this.inputTodo = '';
    }
  }
}
