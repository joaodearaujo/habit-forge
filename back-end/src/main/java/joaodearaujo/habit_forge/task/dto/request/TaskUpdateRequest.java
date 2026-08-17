package joaodearaujo.habit_forge.task.dto.request;

import joaodearaujo.habit_forge.task.enums.TaskCategory;

public record TaskUpdateRequest(
        TaskCategory category,
        String title,
        String description,
        Boolean isCore
) {}