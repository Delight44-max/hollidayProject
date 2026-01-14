package com.todobackend.mapper;

import com.todobackend.dto.TodoRequest;
import com.todobackend.dto.TodoResponse;
import com.todobackend.model.Todo;
import java.util.List;
import java.util.stream.Collectors;

public class TodoMapper {

    public static TodoResponse toResponse(Todo todo) {
        TodoResponse response = new TodoResponse();
        response.setId(todo.getId());
        response.setText(todo.getText());
        response.setCompleted(todo.isCompleted());
        return response;
    }

    public static List<TodoResponse> toResponseList(List<Todo> todos) {
        return todos.stream().map(TodoMapper::toResponse).collect(Collectors.toList());
    }

    public static Todo toModel(TodoRequest request) {
        Todo todo = new Todo();
        todo.setText(request.getText());
        return todo;
    }
}