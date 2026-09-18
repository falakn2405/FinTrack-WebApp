package com.falak.fintrack.repository;

import com.falak.fintrack.entity.ExpenseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    //select * from tbl_expenses where profile_id = ? order by date desc
    List<ExpenseEntity> findByProfileIdOrderByDateDesc(Long profileId);

    //select * from tbl_expenses where profile_id = ? order by date desc limit 5
    List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM ExpenseEntity e WHERE e.profile.id = :profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    //select * from tbl_expense where profile_id = ? and date between = ? and ? name = ?
    //select, filter, sort
    List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    //select * from tbl_expense where profile_id = ? and date between = ? and ?
    List<ExpenseEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);
}
