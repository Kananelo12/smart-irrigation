package com.irrigation.irrigation.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.irrigation.irrigation.model.Crop;
import com.irrigation.irrigation.repository.CropRepository;
import java.util.*;

public interface CropRepository extends JpaRepository<Crop, Long> {
    Optional<Crop> findByName(String name);
    
    <S extends Crop> S save(S entity);

}
