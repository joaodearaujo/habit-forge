package joaodearaujo.habit_forge.routine.RoutineService;

import joaodearaujo.habit_forge.routine.dto.request.RoutineRequest;
import joaodearaujo.habit_forge.routine.dto.response.RoutineResponse;
import joaodearaujo.habit_forge.routine.entity.Routine;
import joaodearaujo.habit_forge.routine.exceptions.RoutineAlreadyExistsException;
import joaodearaujo.habit_forge.routine.repository.RoutineRepository;
import joaodearaujo.habit_forge.routine.service.RoutineService;
import joaodearaujo.habit_forge.taskgroup.service.TaskGroupService;
import joaodearaujo.habit_forge.user.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoutineServiceTest {

    @Mock
    RoutineRepository routineRepository;

    @Mock
    TaskGroupService taskGroupService;

    @InjectMocks
    RoutineService routineService;

    @Test
    void shouldCreateRoutineWhenRoutineTitleDoesntExists() {
        RoutineRequest request = new RoutineRequest(
                "Daily",
                null
        );

        User user =  new User(
                "password",
                "user@email.com",
                "user"
        );

        when(routineRepository.existsByName("Daily")).thenReturn(false);
        when(routineRepository.save(any(Routine.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArgument(0));

        RoutineResponse routineResponse = routineService.createRoutine(request, user);

        assertEquals("Daily", routineResponse.title());
        assertNull(routineResponse.description());
        verify(routineRepository, atLeastOnce()).save(any(Routine.class));
    }

    @Test
    void shouldThrowWhenRoutineTitleAlreadyExists() {
        RoutineRequest request = new RoutineRequest(
                "Daily",
                null
        );

        User user =  new User(
                "password",
                "user@email.com",
                "user"
        );

        when(routineRepository.existsByName("Daily")).thenReturn(true);

        assertThrows(RoutineAlreadyExistsException.class, () -> routineService.createRoutine(request, user));
    }
}
