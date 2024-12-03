export const prepareGanttData = (tasks) => {
    return Object.entries(tasks).flatMap(([status, tasksList]) => {
        // Проверяем, что tasksList является массивом
        if (!Array.isArray(tasksList)) {
            console.error(`Expected an array for status "${status}", but received:`, tasksList);
            return []; // Возвращаем пустой массив, если tasksList не массив
        }

        return tasksList.map(task => ({
            id: task.id,
            name: task.title,
            start: new Date(),  // Здесь можно использовать `task.startDate` (если есть)
            end: new Date(new Date().setDate(new Date().getDate() + 5)),  // Рассчитать конечную дату на основе данных задачи
            type: status === 'Done' ? 'task' : 'milestone',
            progress: status === 'Done' ? 100 : 0,
            dependencies: "",  // Если у задачи есть зависимости, можно их добавить здесь
        }));
    });
};
