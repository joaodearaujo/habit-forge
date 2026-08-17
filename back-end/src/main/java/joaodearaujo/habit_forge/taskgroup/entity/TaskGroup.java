package joaodearaujo.habit_forge.taskgroup.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import joaodearaujo.habit_forge.routine.entity.Routine;
import joaodearaujo.habit_forge.task.entity.Task;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "groups", uniqueConstraints = @UniqueConstraint(columnNames = {"name", "routine_id"}))
public class TaskGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 50)
    private String name;

    @Size(max = 150)
    private String description;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id", nullable = false)
    private Routine routine;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column
    private LocalDateTime updatedAt;

    public TaskGroup() { }

    public TaskGroup(String name, String description, Routine routine) {
        this.routine = routine;
        this.name = name;
        this.description = description;
        this.tasks = new ArrayList<>();
    }

    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) { this.name = name; }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public List<Task> getTasks() {
        return tasks;
    }
    public Routine getRoutine() { return routine; }
}
