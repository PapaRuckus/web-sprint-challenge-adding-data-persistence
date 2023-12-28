const db = require("../../data/dbConfig");

function getTasks() {
  return db("tasks as t")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    )
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .then((tasks) => {
      return tasks.map((task) => ({
        ...task,
        task_completed: task.task_completed === 0 ? false : true,
      }));
    });
}


async function createTasks(task) {
  const [task_id] = await db("tasks").insert(task);
  const newTask = await db("tasks").where({ task_id }).first();
  const updatedTask = {
    ...newTask,
    task_completed: task.task_completed === 0 ? true : false,
  };
  return updatedTask;
}

module.exports = {
  getTasks,
  createTasks,
};
