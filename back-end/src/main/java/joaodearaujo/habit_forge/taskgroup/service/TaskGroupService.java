package joaodearaujo.habit_forge.taskgroup.service;

import jakarta.persistence.EntityNotFoundException;
import joaodearaujo.habit_forge.routine.entity.Routine;
import joaodearaujo.habit_forge.taskgroup.entity.TaskGroup;
import joaodearaujo.habit_forge.user.entity.User;
import joaodearaujo.habit_forge.taskgroup.dto.request.TaskGroupRequest;
import joaodearaujo.habit_forge.shared.dto.request.UpdateNameRequest;
import joaodearaujo.habit_forge.taskgroup.dto.response.TaskGroupResponse;
import joaodearaujo.habit_forge.task.dto.response.TaskResponse;
import org.springframework.security.access.AccessDeniedException;
import joaodearaujo.habit_forge.routine.repository.RoutineRepository;
import joaodearaujo.habit_forge.taskgroup.repository.TaskGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TaskGroupService {

    private final TaskGroupRepository taskGroupRepository;
    private final TaskService taskService;
    private final RoutineRepository routineRepository;

    public TaskGroupService(TaskGroupRepository taskGroupRepository, TaskService taskService, RoutineRepository routineRepository) {
        this.taskGroupRepository = taskGroupRepository;
        this.taskService = taskService;
        this.routineRepository = routineRepository;
    }

    public TaskGroupResponse createGroup(TaskGroupRequest request, User authenticatedUser) throws AccessDeniedException {
        Routine routine = routineRepository.findById(request.routineId())
                .orElseThrow(() -> new EntityNotFoundException("Route not found."));

        if (!routine.getUser().getId().equals(authenticatedUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }

        TaskGroup group = convertToEntity(request, routine);

        taskGroupRepository.save(group);
        return convertToResponse(group);
    }

    public TaskGroupResponse updateTitle(String groupId, UpdateNameRequest updateNameRequest, User authenticatedUser) {
        TaskGroup group = taskGroupRepository.findById(groupId)
                .orElseThrow(()-> new EntityNotFoundException("Group not found" + groupId));

        String ownerId = group.getRoutine().getUser().getId();

        if (!Objects.equals(ownerId, authenticatedUser.getId())) {
            throw new AccessDeniedException("You don't have permission for it.");
        }
        if (updateNameRequest.title() != null) {
            group.setName(updateNameRequest.title());
        }

        return convertToResponse(group);
    }


    public void deleteGroup(String groupId, User authenticatedUser) {
        TaskGroup group = taskGroupRepository.findById(groupId)
                        .orElseThrow(()-> new EntityNotFoundException("Group not found" + groupId));

        String ownerId = group.getRoutine().getUser().getId();

        if (!Objects.equals(ownerId, authenticatedUser.getId())) {
            throw new AccessDeniedException("You don't have permission for it.");
        }

        taskGroupRepository.deleteById(groupId);
    }

    public TaskGroup convertToEntity(TaskGroupRequest taskGroupRequest, Routine routine) {
        return new TaskGroup(
                taskGroupRequest.title(),
                taskGroupRequest.description(),
                routine
        );
    }

    public TaskGroupResponse convertToResponse(TaskGroup taskGroup) {
        List<TaskResponse> taskResponseList = taskGroup.getTasks().stream()
                .map(taskService::convertToResponse)
                .toList();
        return new TaskGroupResponse(
                taskGroup.getId(),
                taskGroup.getName(),
                taskGroup.getDescription(),
                taskResponseList
        );
    }
}