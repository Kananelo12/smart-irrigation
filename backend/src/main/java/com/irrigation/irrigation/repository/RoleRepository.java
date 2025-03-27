package com.irrigation.irrigation.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.irrigation.irrigation.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role>findByName(String name);

    <S extends Role> S save(S entity);
}
    

