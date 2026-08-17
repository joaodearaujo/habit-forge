package joaodearaujo.habit_forge.taskgroup.repository;

import joaodearaujo.habit_forge.taskgroup.entity.TaskGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskGroupRepository extends JpaRepository<TaskGroup, String> {}
