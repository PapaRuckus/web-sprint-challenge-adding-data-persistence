const db = require("../../data/dbConfig");

function getProjects() {
  return db("projects")
    .select("*")
    .then((projects) => {
      return projects.map((project) => ({
        ...project,
        project_completed: project.project_completed === 0 ? false : true,
      }));
    });
}

async function createProjects(project) {
  const [project_id] = await db("projects").insert(project);
  const newProject = await db("projects").where({ project_id }).first();
  const updatedProject = {
    ...newProject,
    project_completed: newProject.project_completed === 0 ? false : true,
  };

  return updatedProject;
}

// function getProjectsById(project_id) {
//   return db("projects").where("project_id", project_id).first();
// }

module.exports = {
  getProjects,
  createProjects,
};
