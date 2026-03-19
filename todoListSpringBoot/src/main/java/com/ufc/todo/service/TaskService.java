package com.ufc.todo.service;

import com.ufc.todo.dto.TaskDTO;
import java.util.List;

public interface TaskService {
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO updateTask(Long id, TaskDTO taskDTO);
    void deleteTask(Long id);
    List<TaskDTO> getAllTasks();
    TaskDTO markTaskAsDone(Long id);
}
