package com.expensetracker.service;

import com.expensetracker.dto.ExpenseRequest;
import com.expensetracker.dto.ExpenseResponse;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.mapper.ExpenseMapper;
import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;


    public List<ExpenseResponse> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        return ExpenseMapper.toResponseList(expenses);
    }


    public ExpenseResponse getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense", "id", id));
        return ExpenseMapper.toResponse(expense);
    }


    public ExpenseResponse createExpense(ExpenseRequest request) {
        Expense expense = ExpenseMapper.toModel(request);
        Expense savedExpense = expenseRepository.save(expense);
        return ExpenseMapper.toResponse(savedExpense);
    }


    public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {
        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense", "id", id));


        existingExpense.setDescription(request.getDescription());
        existingExpense.setAmount(request.getAmount());
        existingExpense.setCategory(request.getCategory());
        existingExpense.setDate(request.getDate());

        Expense updatedExpense = expenseRepository.save(existingExpense);
        return ExpenseMapper.toResponse(updatedExpense);
    }


    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense", "id", id);
        }
        expenseRepository.deleteById(id);
    }
}