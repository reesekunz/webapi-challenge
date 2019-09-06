// helper methods from projectModel.js: get, insert, update, remove, getProjectActions,

const express = require("express");

const router = express.Router();

const projectDB = require("../data/helpers/projectModel");

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

router.get("/:id", (request, response) => {
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

// POST to /projects

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

router.put("/:id", validateProject, (request, response) => {
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

router.delete("/:id", (request, response) => {
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

module.exports = router;
