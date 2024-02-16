import Agent from "../agent";
import ToDoTask, {ToDoTaskCreateUpdateRequest} from "../../../models/ToDoTasks/ToDoTask.model";
import {API_ROUTES} from "../../../common/constants/api-routes.constants";



const ToDoTasksApi = {
    getById: (id: number) => Agent.get<ToDoTask>(`${API_ROUTES.TO_DO_TASKS_CONTEXT.GET_BY_ID}/${id}`),

    getAll: () => Agent.get<ToDoTask[]>(`${API_ROUTES.TO_DO_TASKS_CONTEXT.GET_ALL}`),

    create: (toDoTask: ToDoTaskCreateUpdateRequest) => Agent.post<ToDoTask>(`${API_ROUTES.TO_DO_TASKS_CONTEXT.CREATE}`, toDoTask),

    update: (id: number, toDoTask: ToDoTaskCreateUpdateRequest) => Agent.put<ToDoTask>(`${API_ROUTES.TO_DO_TASKS_CONTEXT.UPDATE}/${id}`, toDoTask),

    delete: (id: number) => Agent.delete(`${API_ROUTES.TO_DO_TASKS_CONTEXT.DELETE}/${id}`),
};

export default ToDoTasksApi;
