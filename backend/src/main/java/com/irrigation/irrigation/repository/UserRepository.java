package com.irrigation.irrigation.repository;
import com.irrigation.irrigation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    

    // Save a new user or update an existing one (already exists)
    <S extends User> S save(S entity);
}