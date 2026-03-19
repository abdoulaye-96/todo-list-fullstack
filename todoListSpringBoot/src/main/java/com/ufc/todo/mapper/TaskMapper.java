package com.ufc.todo.mapper;

import com.ufc.todo.dto.TaskDTO;
import com.ufc.todo.entity.Task;
import com.ufc.todo.entity.TaskStatus;

public class TaskMapper {

    public static TaskDTO toDTO(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus().name())
                .build();
    }

    public static Task toEntity(TaskDTO dto) {
        return Task.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .status(TaskStatus.valueOf(dto.getStatus()))
                .build();
    }
}
