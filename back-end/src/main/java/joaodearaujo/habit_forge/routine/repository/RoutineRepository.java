package joaodearaujo.habit_forge.routine.repository;

import joaodearaujo.habit_forge.routine.entity.Routine;
import joaodearaujo.habit_forge.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, String> {
    List<Routine> findByUser(User user);
    boolean existsByName(String name);
}
