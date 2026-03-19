package com.ufc.todo.service.impl;

import com.ufc.todo.dto.TaskDTO;
import com.ufc.todo.entity.Task;
import com.ufc.todo.entity.TaskStatus;
import com.ufc.todo.mapper.TaskMapper;
import com.ufc.todo.repository.TaskRepository;
import com.ufc.todo.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        taskDTO.setStatus("EN_COURS"); // nouvelle tâche par défaut
        Task task = TaskMapper.toEntity(taskDTO);
        return TaskMapper.toDTO(taskRepository.save(task));
    }

    @Override
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(TaskStatus.valueOf(taskDTO.getStatus()));
        return TaskMapper.toDTO(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO markTaskAsDone(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(TaskStatus.TERMINE);
        return TaskMapper.toDTO(taskRepository.save(task));
    }
}