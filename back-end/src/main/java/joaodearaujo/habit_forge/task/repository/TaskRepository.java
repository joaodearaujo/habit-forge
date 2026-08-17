package joaodearaujo.habit_forge.task.repository;

import joaodearaujo.habit_forge.task.entity.Task;
import joaodearaujo.habit_forge.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findByGroup_Routine_User(User user);
}
