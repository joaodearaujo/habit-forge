package joaodearaujo.habit_forge.routine.controller;

import jakarta.validation.Valid;
import joaodearaujo.habit_forge.routine.dto.request.RoutineRequest;
import joaodearaujo.habit_forge.shared.dto.request.UpdateNameRequest;
import joaodearaujo.habit_forge.routine.dto.response.RoutineResponse;
import joaodearaujo.habit_forge.routine.service.RoutineService;
import org.springframework.web.bind.annotation.*;
import joaodearaujo.habit_forge.user.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@RequestMapping("v1/routine")
public class RoutineController {

    private final RoutineService routineService;

    public RoutineController(RoutineService routineService) {
        this.routineService = routineService;
    }

    @PostMapping
    public RoutineResponse createRoutine(
            @Valid @RequestBody RoutineRequest request,
            @AuthenticationPrincipal User authenticatedUser) {
        return routineService.createRoutine(request, authenticatedUser);
    }
    @PatchMapping("/{id}")
    public RoutineResponse updateTitle(
            @PathVariable String id,
            @RequestBody UpdateNameRequest updateNameRequest,
            @AuthenticationPrincipal User authenticatedUser) {
        return routineService.updateTitle(id, updateNameRequest, authenticatedUser);
    }

    @GetMapping
    public List<RoutineResponse> listAll(@AuthenticationPrincipal User authenticatedUser) {
        return routineService.findAllByUser(authenticatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteRoutine(@PathVariable String id, @AuthenticationPrincipal User authenticatedUser) {
        routineService.deleteRoutine(id, authenticatedUser);
    }
}
