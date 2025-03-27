package com.irrigation.irrigation.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.irrigation.irrigation.model.IrrigationData;
import com.irrigation.irrigation.repository.IrrigationDataRepository;

public interface IrrigationDataRepository  extends JpaRepository<IrrigationData, Long>{
    <S extends IrrigationData> S save(S entity);
}
