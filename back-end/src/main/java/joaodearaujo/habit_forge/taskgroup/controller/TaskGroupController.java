package joaodearaujo.habit_forge.taskgroup.controller;

import jakarta.validation.Valid;
import joaodearaujo.habit_forge.user.entity.User;
import joaodearaujo.habit_forge.taskgroup.dto.request.TaskGroupRequest;
import joaodearaujo.habit_forge.shared.dto.request.UpdateNameRequest;
import joaodearaujo.habit_forge.taskgroup.dto.response.TaskGroupResponse;
import joaodearaujo.habit_forge.taskgroup.service.TaskGroupService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/v1/task-group")
public class TaskGroupController {

    private final TaskGroupService taskGroupService;

    public TaskGroupController(TaskGroupService taskGroupService) {
        this.taskGroupService = taskGroupService;
    }

    @PostMapping
    public TaskGroupResponse createGroup(
            @Valid @RequestBody TaskGroupRequest request,
            @AuthenticationPrincipal User authenticatedUser) throws AccessDeniedException {

        return taskGroupService.createGroup(request, authenticatedUser);
    }

    @PatchMapping("/{id}")
    public TaskGroupResponse updateTitle(
            @PathVariable String id,
            @RequestBody UpdateNameRequest updateNameRequest,
            @AuthenticationPrincipal User authenticatedUser) {
        return taskGroupService.updateTitle(id, updateNameRequest, authenticatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id, @AuthenticationPrincipal User authenticatedUser) {
        taskGroupService.deleteGroup(id, authenticatedUser);
    }
}
