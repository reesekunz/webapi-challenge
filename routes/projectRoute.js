// helper methods from projectModel.js: get, insert, update, remove, getProjectActions,
// use getProjectActions() to get a project id and return a list of actions for that particular project

const express = require("express");

const router = express.Router();

const projectDB = require("../data/helpers/projectModel");
// const actionDB = require("../data/helpers/actionModel");

// GET to /projects

router.get("/", (request, response) => {
  projectDB
    .get()
    .then(getProjects => {
      response.status(200).json(getProjects);
    })
    .catch(error => {
      response.status(500).json({ message: "failed to get projects" });
    });
});

// GET w/ dynamic id to projects/:id

router.get("/:id", validateProjectId, (request, response) => {
  const { id } = request.params;

  projectDB
    .get(id)
    .then(getProject => {
      response.status(200).json(getProject);
    })
    .catch(error => {
      response.status(500).json({ message: "failed to get projects" });
    });
});

// GET w/ dynamic project id and the actions for that particular project

router.get("/actions/:project_id", (request, response) => {
  const { project_id } = request.params;
  projectDB
    .getProjectActions(project_id)
    .then(projectActions => {
      if (projectActions.length === 0) {
        response.status(404).json({ message: "No actions for that project" });
      }
      response.status(200).json(projectActions);
    })
    .catch(error => {
      response.status(500).json({ message: "failed to get project actions" });
    });
});

router.post("/", validateProject, (request, response) => {
  const body = request.body;
  console.log(body);
  projectDB
    .insert(body)
    .then(success => {
      response.status(200).json(success);
    })
    .catch(error => {
      response.status(500).json({ message: "failed to add project" });
    });
});

// PUT to /projects/:id

router.put("/:id", validateProject, validateProjectId, (request, response) => {
  const { id } = request.params;
  const body = request.body;
  projectDB
    .update(id, body)
    .then(success =>
      response.status(200).json({ message: `project updated for id ${id}` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to update project" })
    );
});

// DELETE to /projects/:id

router.delete("/:id", validateProjectId, (request, response) => {
  const { id } = request.params;
  projectDB
    .remove(id)
    .then(count =>
      response
        .status(200)
        .json({ message: `${count} project deleted for id ${id}` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete project" })
    );
});

// middleware functions
// name and description required
function validateProject(request, response, next) {
  if (!request.body) {
    response.status(400).json({ message: "project data not found" });
  } else if (!request.body.name) {
    response.status(400).json({ message: "name is required" });
  } else if (!request.body.description) {
    response.status(400).json({ message: "description is required" });
  }
  next();
}

function validateProjectId(request, response, next) {
  const { id } = request.params;
  projectDB
    .get(id)
    .then(projectID => {
      console.log("project id validation success", projectID);
      if (projectID) {
        next();
      } else {
        response.status(400).json({ message: "project id not found" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "failed validation request" });
    });
}

module.exports = router;
