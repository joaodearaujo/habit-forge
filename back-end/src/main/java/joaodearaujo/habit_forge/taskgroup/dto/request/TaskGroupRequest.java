package joaodearaujo.habit_forge.taskgroup.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TaskGroupRequest(
   @NotBlank
   String routineId,

   @NotBlank
   @Size(min = 5, max = 50)
   String title,

   @Size(max = 355)
   String description
) {}
