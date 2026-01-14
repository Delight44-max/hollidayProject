package com.todobackend.dto;

import lombok.Data;

@Data
public class TodoResponse {
    private Long id;
    private String text;
    private boolean completed;
}