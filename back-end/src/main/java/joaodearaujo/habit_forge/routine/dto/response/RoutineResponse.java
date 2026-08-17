package joaodearaujo.habit_forge.routine.dto.response;

import joaodearaujo.habit_forge.taskgroup.dto.response.TaskGroupResponse;

import java.util.List;

public record RoutineResponse(
        String id,
        String title,
        String description,
        List<TaskGroupResponse> groups
) {}
