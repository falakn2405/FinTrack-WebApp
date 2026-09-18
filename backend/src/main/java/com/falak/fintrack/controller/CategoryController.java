package com.falak.fintrack.controller;

import com.falak.fintrack.dto.CategoryDTO;
import com.falak.fintrack.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")

public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> saveCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO savedCategory = categoryService.saveCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<CategoryDTO> categories = categoryService.getCategoriesForCurrentUser();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesByType(@PathVariable String type) {
        List<CategoryDTO> categoryList = categoryService.getCategoriesByType(type);
        return ResponseEntity.ok(categoryList);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO updateCategory = categoryService.updateCategory(categoryId, categoryDTO);
        return ResponseEntity.ok(updateCategory);
    }
}
