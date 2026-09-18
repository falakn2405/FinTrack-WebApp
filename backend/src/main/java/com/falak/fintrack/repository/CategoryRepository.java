package com.falak.fintrack.repository;

import com.falak.fintrack.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    //select * from tbl_category where profile_id = ?
    List<CategoryEntity> findByProfileId(Long profileId);

    //select * from tbl_category where id = ? and profile_id = ?
    Optional<CategoryEntity> findByIdAndProfileId(Long id, Long profileId);

    //select * from tbl_category where type = ? and profile_id = ?
    List<CategoryEntity> findByTypeAndProfileId(String type, Long profileId);

    //check records and return true or false
    Boolean existsByNameAndProfileId(String name, Long profileId);
}
