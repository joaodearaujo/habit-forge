package joaodearaujo.habit_forge.auth.dto.response;

import joaodearaujo.habit_forge.user.dto.response.UserResponse;

public record LoginResponse(
        String token,
        UserResponse user
) {}