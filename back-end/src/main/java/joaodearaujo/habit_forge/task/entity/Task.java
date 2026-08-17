    package joaodearaujo.habit_forge.task.entity;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.Size;
    import joaodearaujo.habit_forge.taskgroup.entity.TaskGroup;
    import joaodearaujo.habit_forge.task.enums.TaskCategory;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.annotations.UpdateTimestamp;

    import java.time.LocalDateTime;

    @Entity
    public class Task {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private String id;

        @Column
        @Enumerated(EnumType.STRING)
        private TaskCategory category;

        @Column(nullable = false, length = 50)
        private String name;

        @Size(max = 150)
        private String description;

        @Column
        private Boolean isCompleted;

        @Column
        private Boolean isCore;


        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "group_id", nullable = false)
        private TaskGroup group;

        @CreationTimestamp
        @Column(updatable = false)
        private LocalDateTime createdAt;

        @UpdateTimestamp
        @Column
        private LocalDateTime updatedAt;

        public Task() {}

        public Task(TaskCategory category, String name, String description, Boolean isCore, TaskGroup group) {
            this.group = group;
            this.name = name;
            this.category = category;
            this.description = description;
            this.isCompleted = false;
            this.isCore = isCore;
        }

        public String getId() {
            return id;
        }


        public TaskCategory getCategory() {
            return category;
        }

        public void setCategory(TaskCategory category) {
            this.category = category;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Boolean getIsCompleted() {
            return isCompleted;
        }

        public void setIsCompleted(Boolean completed) {
            isCompleted = completed;
        }

        public Boolean getIsCore() {
            return isCore;
        }

        public void setCore(Boolean core) {
            isCore = core;
        }

        public TaskGroup getGroup() {
            return group;
        }
    }
