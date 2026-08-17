package joaodearaujo.habit_forge.task.dto.response;
import joaodearaujo.habit_forge.task.enums.TaskCategory;

public record TaskResponse(
        String id,
        TaskCategory category,
        String title,
        String description,
        Boolean isCompleted,
        Boolean isCore
) {}
