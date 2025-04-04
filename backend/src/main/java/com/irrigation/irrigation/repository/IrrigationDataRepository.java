package com.irrigation.irrigation.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.irrigation.irrigation.model.IrrigationData;
import com.irrigation.irrigation.repository.IrrigationDataRepository;
import com.irrigation.irrigation.model.User;

public interface IrrigationDataRepository  extends JpaRepository<IrrigationData, Long>{
    <S extends IrrigationData> S save(S entity);
    IrrigationData findTopByUserOrderByTimestampDesc(User user); // Custom query method to fetch the latest irrigation data for a user
}
