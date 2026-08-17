package joaodearaujo.habit_forge.taskgroup.dto.response;

import joaodearaujo.habit_forge.task.dto.response.TaskResponse;

import java.util.List;

public record TaskGroupResponse(
        String id,
        String title,
        String description,
        List<TaskResponse> tasks
) {}
