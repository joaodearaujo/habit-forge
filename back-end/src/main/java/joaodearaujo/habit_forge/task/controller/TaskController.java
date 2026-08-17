package joaodearaujo.habit_forge.task.controller;

import jakarta.validation.Valid;
import joaodearaujo.habit_forge.user.entity.User;
import joaodearaujo.habit_forge.task.dto.request.TaskRequest;
import joaodearaujo.habit_forge.task.dto.request.TaskUpdateRequest;
import joaodearaujo.habit_forge.task.dto.response.TaskResponse;
import joaodearaujo.habit_forge.taskgroup.service.TaskService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    private TaskResponse createTask(@Valid @RequestBody TaskRequest taskRequest) {
        return taskService.createTask(taskRequest);
    }

    @GetMapping
    public List<TaskResponse> findAllByUser(@AuthenticationPrincipal User authenticatedUser) {
        return taskService.findAllByUser(authenticatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id, @AuthenticationPrincipal User authenticatedUser) {
        taskService.deleteTask(id, authenticatedUser);
    }

        @PatchMapping("/toggleComplete/{id}")
    public TaskResponse markTaskAsCompleted(@PathVariable String id, @AuthenticationPrincipal User authenticatedUser) {
        return taskService.markTaskAsComplete(id, authenticatedUser);
    }

    @PatchMapping("/{id}")
    public TaskResponse updateTask(@PathVariable String id, @RequestBody TaskUpdateRequest taskUpdateRequest,  @AuthenticationPrincipal User authenticatedUser) {
        return taskService.updateTask(id, taskUpdateRequest, authenticatedUser);
    }
}