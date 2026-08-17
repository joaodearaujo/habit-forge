package joaodearaujo.habit_forge.routine.service;

import jakarta.persistence.EntityNotFoundException;
import joaodearaujo.habit_forge.routine.entity.Routine;
import joaodearaujo.habit_forge.user.entity.User;
import joaodearaujo.habit_forge.routine.dto.request.RoutineRequest;
import joaodearaujo.habit_forge.shared.dto.request.UpdateNameRequest;
import joaodearaujo.habit_forge.routine.dto.response.RoutineResponse;
import joaodearaujo.habit_forge.taskgroup.dto.response.TaskGroupResponse;
import joaodearaujo.habit_forge.routine.repository.RoutineRepository;
import joaodearaujo.habit_forge.taskgroup.service.TaskGroupService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final TaskGroupService taskGroupService;

    public RoutineService(RoutineRepository routineRepository, TaskGroupService taskGroupService) {
        this.routineRepository = routineRepository;
        this.taskGroupService = taskGroupService;
    }

    public RoutineResponse createRoutine(RoutineRequest request, User authenticatedUser) {
        Routine routine = convertToEntity(request, authenticatedUser);

        routineRepository.save(routine);
        return convertToResponse(routine);
    }

    @Transactional(readOnly = true)
    public List<RoutineResponse> findAllByUser(User user) {
        return routineRepository.findByUser(user).stream()
                .map(this::convertToResponse)
                .toList();
    }

    public RoutineResponse updateTitle(String routineId, UpdateNameRequest updateNameRequest, User authenticatedUser) {
        Routine routine = routineRepository.findById(routineId)
                .orElseThrow(() -> new EntityNotFoundException("Routine not found" + routineId));

        if (!Objects.equals(routine.getUser().getId(), authenticatedUser.getId())) {
            throw new AccessDeniedException("You don't have permission for it.");
        }

        if (updateNameRequest.title() != null) {
            routine.setName(updateNameRequest.title());
        }

        return convertToResponse(routine);
    }


    public void deleteRoutine(String routineId, User authenticatedUser) {
        Routine routine = routineRepository.findById(routineId)
                .orElseThrow(() -> new EntityNotFoundException("Routine not found" + routineId));

        if (!Objects.equals(routine.getUser().getId(), authenticatedUser.getId())) {
            throw new AccessDeniedException("You don't have permission for it.");
        }

        routineRepository.deleteById(routineId);
    }

    Routine convertToEntity(RoutineRequest routineRequest, User user) {
        return new Routine(
                routineRequest.title(),
                routineRequest.description(),
                user
        );
    }

    RoutineResponse convertToResponse(Routine routine) {
        List<TaskGroupResponse> taskGroupResponseList = routine.getGroupList().stream()
                .map(taskGroupService::convertToResponse)
                .toList();
        return new RoutineResponse(
                routine.getId(),
                routine.getName(),
                routine.getDescription(),
                taskGroupResponseList
        );
    }
}