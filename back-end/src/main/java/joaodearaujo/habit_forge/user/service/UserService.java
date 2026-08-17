package joaodearaujo.habit_forge.user.service;

import joaodearaujo.habit_forge.routine.entity.Routine;
import joaodearaujo.habit_forge.task.entity.Task;
import joaodearaujo.habit_forge.taskgroup.entity.TaskGroup;
import joaodearaujo.habit_forge.user.entity.User;
import joaodearaujo.habit_forge.task.enums.TaskCategory;
import joaodearaujo.habit_forge.user.dto.request.UserRequest;
import joaodearaujo.habit_forge.user.dto.response.UserResponse;
import joaodearaujo.habit_forge.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public UserResponse createUser(UserRequest userRequest) {
        if (userRepository.findByEmail(userRequest.email()).isPresent()) {
            throw new IllegalArgumentException("Email already in use.");
        }

        User newUser = convertToEntity(userRequest);
        attachDefaultRoutine(newUser);

        userRepository.save(newUser);

        return convertToResponse(newUser);
    }

    private void attachDefaultRoutine(User user) {
        Routine dailyRoutine = new Routine("Daily", null, user);

        TaskGroup morningGroup = new TaskGroup("Morning", null, dailyRoutine);

        Task firstTask = new Task(
                TaskCategory.MIND,
                "First Good Task",
                null,
                true,
                morningGroup
        );

        morningGroup.getTasks().add(firstTask);
        dailyRoutine.getGroupList().add(morningGroup);
        user.getRoutines().add(dailyRoutine);
    }

    private User convertToEntity(UserRequest request) {
        String encryptedPassword = passwordEncoder.encode((request.password()));

        return new User(
                request.email(),
                request.name(),
                encryptedPassword
        );
    }

    private UserResponse convertToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
