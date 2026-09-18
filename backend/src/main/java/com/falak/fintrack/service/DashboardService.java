package com.falak.fintrack.service;

import com.falak.fintrack.dto.ExpenseDTO;
import com.falak.fintrack.dto.IncomeDTO;
import com.falak.fintrack.dto.TransactionDTO;
import com.falak.fintrack.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor

public class DashboardService {
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    // Concat incomes & expenses b
    public Map<String, Object> getDashboardData() {

        ProfileEntity profile = profileService.getCurrentProfile();
        Map<String, Object> returnValue = new LinkedHashMap<>();

        List<IncomeDTO> latestIncomes = incomeService.getLatestIncomes();
        List<ExpenseDTO> latestExpenses = expenseService.getLatestExpenses();

        // Merge incomes and expenses into a single transaction list
        List<TransactionDTO> transactions = concat(
                latestIncomes.stream().map(income ->
                        TransactionDTO.builder()
                                .id(income.getId())
                                .profileId(profile.getId())
                                .icon(income.getIcon())
                                .name(income.getName())
                                .amount(income.getAmount())
                                .date(income.getDate())
                                .createdAt(income.getCreatedAt())
                                .updatedAt(income.getUpdatedAt())
                                .type("income")
                                .build()
                ),
                latestExpenses.stream().map(expense ->
                        TransactionDTO.builder()
                                .id(expense.getId())
                                .profileId(profile.getId())
                                .icon(expense.getIcon())
                                .name(expense.getName())
                                .amount(expense.getAmount())
                                .date(expense.getDate())
                                .createdAt(expense.getCreatedAt())
                                .updatedAt(expense.getUpdatedAt())
                                .type("expense")
                                .build()
                )
        )
                // Sorting transactions: By date or If same date → sort by createdAt (latest first)
                .sorted((a, b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if (cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                }).collect(Collectors.toList());

        returnValue.put("totalBalance", incomeService.getTotalIncomes()
                .subtract(expenseService.getTotalExpenses()));
        returnValue.put("totalIncomes", incomeService.getTotalIncomes());
        returnValue.put("totalExpenses", expenseService.getTotalExpenses());
        returnValue.put("recentIncomes", latestIncomes);
        returnValue.put("recentExpenses", latestExpenses);
        returnValue.put("recentTransaction", transactions);

        return returnValue;
    }
}
