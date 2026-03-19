import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

const CheckIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const TrashIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const PlusIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const PencilIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await taskService.createTask({
        title: newTaskTitle,
        description: newTaskDescription,
        status: 'EN_COURS'
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleToggleDone = async (id, currentStatus) => {
    try {
      if (currentStatus === 'TERMINE') {
        const targetTask = tasks.find(t => t.id === id);
        const updated = await taskService.updateTask(id, { ...targetTask, status: 'EN_COURS' });
        setTasks(tasks.map(task => task.id === id ? updated : task));
      } else {
        const updated = await taskService.markTaskAsDone(id);
        setTasks(tasks.map(task => task.id === id ? updated : task));
      }
    } catch (error) {
      console.error('Failed to update task', error);
      fetchTasks();
    }
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleSaveEdit = async (id, currentTask) => {
    try {
      const updatedTask = await taskService.updateTask(id, {
        ...currentTask,
        title: editTitle,
        description: editDescription
      });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Task Master
          </h1>
          <p className="text-slate-400 text-lg">Organize your workflow, achieve your goals.</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10">
          <form onSubmit={handleAddTask} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-slate-400 transition-all font-medium text-lg"
              />
              <button
                type="submit"
                disabled={!newTaskTitle.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                <PlusIcon />
                <span>Add Task</span>
              </button>
            </div>
            <input
              type="text"
              placeholder="Description (optional)"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-300 placeholder-slate-500 text-sm transition-all"
            />
          </form>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-16 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl">
              <p className="text-slate-400 text-lg">You're all caught up! No tasks left.</p>
            </div>
          ) : (
            tasks.map((task, index) => {
              const isDone = task.status === 'TERMINE';
              const isEditing = editingId === task.id;
              
              return (
                <div
                  key={task.id}
                  className={`group relative flex items-center gap-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/10 ${
                    isDone && !isEditing ? 'opacity-60' : ''
                  }`}
                  style={{ animation: `fade-in-up ${0.1 * index}s ease-out forwards` }}
                >
                  <button
                    onClick={() => handleToggleDone(task.id, task.status)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'border-slate-500 text-transparent hover:border-indigo-400 group-hover:bg-indigo-500/10'
                    }`}
                  >
                    <CheckIcon />
                  </button>

                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="flex flex-col gap-3 animate-fade-in-down">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 font-semibold"
                          autoFocus
                        />
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-slate-300 text-sm focus:outline-none focus:border-indigo-500"
                          placeholder="Description"
                        />
                        <div className="flex gap-3 mt-1">
                          <button onClick={() => handleSaveEdit(task.id, task)} className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20">
                            Save Changes
                          </button>
                          <button onClick={handleCancelEdit} className="bg-slate-700 hover:bg-slate-600 transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className={`text-lg font-semibold truncate transition-all duration-300 ${isDone ? 'text-slate-400 line-through decoration-slate-500' : 'text-slate-100'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-sm mt-1 truncate ${isDone ? 'text-slate-500 line-through' : 'text-slate-400'}`}>
                            {task.description}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {!isEditing && (
                    <div className="flex items-center">
                      <button
                        onClick={() => handleStartEdit(task)}
                        className="flex-shrink-0 p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 mr-1"
                        title="Edit Task"
                      >
                        <PencilIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="flex-shrink-0 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Delete Task"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default TodoPage;
