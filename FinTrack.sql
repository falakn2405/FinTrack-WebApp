CREATE DATABASE fintrack;

USE fintrack;

SELECT *
FROM tbl_profiles;

SELECT *
FROM tbl_categories;

SELECT *
FROM tbl_expenses;

SELECT *
FROM tbl_incomes;

DELETE FROM tbl_profiles WHERE id=4;

UPDATE tbl_incomes
SET amount = 3500
WHERE id = 5;