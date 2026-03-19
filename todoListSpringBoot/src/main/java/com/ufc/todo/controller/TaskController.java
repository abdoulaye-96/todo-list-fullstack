package com.ufc.todo.controller;

import com.ufc.todo.dto.TaskDTO;
import com.ufc.todo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*") // pour React
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // ✅ Ajouter une tâche
    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO) {
        return taskService.createTask(taskDTO);
    }

    // ✅ Lister toutes les tâches
    @GetMapping
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks();
    }

    // ✅ Modifier une tâche
    @PutMapping("/{id}")
    public TaskDTO updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        return taskService.updateTask(id, taskDTO);
    }

    // ✅ Supprimer une tâche
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    // ✅ Marquer comme terminée
    @PatchMapping("/{id}/done")
    public TaskDTO markTaskAsDone(@PathVariable Long id) {
        return taskService.markTaskAsDone(id);
    }
}