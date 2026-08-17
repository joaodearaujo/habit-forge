package joaodearaujo.habit_forge.taskgroup.service;

import jakarta.persistence.EntityNotFoundException;
import joaodearaujo.habit_forge.task.entity.Task;
import joaodearaujo.habit_forge.taskgroup.entity.TaskGroup;
import joaodearaujo.habit_forge.user.entity.User;
import joaodearaujo.habit_forge.task.dto.request.TaskRequest;
import joaodearaujo.habit_forge.task.dto.request.TaskUpdateRequest;
import joaodearaujo.habit_forge.task.dto.response.TaskResponse;
import joaodearaujo.habit_forge.taskgroup.repository.TaskGroupRepository;
import joaodearaujo.habit_forge.task.repository.TaskRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskGroupRepository taskGroupRepository;

    public TaskService(TaskRepository taskRepository, TaskGroupRepository taskGroupRepository) {
        this.taskRepository = taskRepository;
        this. taskGroupRepository = taskGroupRepository;
    }

    public TaskResponse createTask(TaskRequest taskRequest) {

        TaskGroup group = taskGroupRepository.findById(taskRequest.groupId())
                .orElseThrow(() -> new EntityNotFoundException("Group not found" + taskRequest.groupId()));

        Task newTask = convertToEntity(taskRequest, group);

        taskRepository.save(newTask);
        return convertToResponse(newTask);
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> findAllByUser(User authenticatedUser) {
        List<Task> tasks = taskRepository.findByGroup_Routine_User(authenticatedUser);
        return tasks.stream().
                map(this::convertToResponse)
                .toList();
    }

    public TaskResponse updateTask(String taskId, TaskUpdateRequest taskUpdateRequest, User authenticatedUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found" + taskId));

        String ownerId = task.getGroup().getRoutine().getUser().getId();

        if (!Objects.equals(ownerId, authenticatedUser.getId())) {
            throw new AccessDeniedException("You don't have permission for it.");
        }

        if (taskUpdateRequest.title() != null) {
            task.setName(taskUpdateRequest.title());
        }

        if (taskUpdateRequest.isCore() != null) {
            task.setCore(taskUpdateRequest.isCore());
        }

        if (taskUpdateRequest.category() != null) {
            task.setCategory(taskUpdateRequest.category());
        }

        if (taskUpdateRequest.description() != null) {
            task.setDescription(taskUpdateRequest.description());
        }

        return convertToResponse(task);
    }

    public void deleteTask(String taskId, User authenticatedUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found" + taskId));

        String ownerId = task.getGroup().getRoutine().getUser().getId();

         if (!Objects.equals(ownerId, authenticatedUser.getId())) {
             throw new AccessDeniedException("You don't have permission for it.");
         }

         taskRepository.deleteById(taskId);
    }

    public TaskResponse markTaskAsComplete(String taskId, User authenticatedUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with ID: " + taskId));

        String ownerId = task.getGroup().getRoutine().getUser().getId();

        if (!Objects.equals(ownerId, authenticatedUser.getId())) {
            throw new AccessDeniedException("You don't have permission for it.");
        }

        task.setIsCompleted(!task.getIsCompleted());
        taskRepository.save(task);

        return convertToResponse(task);
    }

    public Task convertToEntity(TaskRequest taskRequest, TaskGroup group) {
        return new Task(
                taskRequest.category(),
                taskRequest.title(),
                taskRequest.description(),
                taskRequest.isCore(),
                group
        );
    }

    public TaskResponse convertToResponse(Task task) {
        return new TaskResponse(
            task.getId(),
            task.getCategory(),
            task.getName(),
            task.getDescription(),
            task.getIsCompleted(),
            task.getIsCore()
        );
    }
}
