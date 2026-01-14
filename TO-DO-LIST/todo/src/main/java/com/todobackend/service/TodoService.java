package com.todobackend.service;

import com.todobackend.dto.TodoRequest;
import com.todobackend.dto.TodoResponse;
import com.todobackend.exception.ResourceNotFoundException;
import com.todobackend.mapper.TodoMapper;
import com.todobackend.model.Todo;
import com.todobackend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;


    public List<TodoResponse> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();
        return TodoMapper.toResponseList(todos);
    }


    public TodoResponse createTodo(TodoRequest request) {
        Todo todo = TodoMapper.toModel(request);
        Todo savedTodo = todoRepository.save(todo);
        return TodoMapper.toResponse(savedTodo);
    }

    public TodoResponse toggleTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo", "id", id));

        todo.setCompleted(!todo.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);
        return TodoMapper.toResponse(updatedTodo);
    }


    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Todo", "id", id);
        }
        todoRepository.deleteById(id);
    }
}