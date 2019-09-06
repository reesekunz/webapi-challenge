// helper methods from actionModel.js:  get, insert, update, remove

const express = require("express");

const router = express.Router();

const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");

// GET to /actions

router.get("/", (request, response) => {
  actionDB
    .get()
    .then(getActions => {
      // getprojs
      // compare projs
      // return those in both lists
      response.status(200).json(getActions);
    })
    .catch(error => {
      response.status(500).json({ message: "failed to get actions" });
    });
});

// GET w/ dynamic id to actions/:id

router.get("/:id", validateActionId, (request, response) => {
  const { id } = request.params;

  actionDB
    .get(id)
    .then(getAction => {
      response.status(200).json(getAction);
    })
    .catch(error => {
      response.status(500).json({ message: "failed to get action" });
    });
});

// POST to /actions

router.post(
  "/",
  validateActions,
  validateDescriptionLength,
  validateExistingProjectId,
  (request, response) => {
    const body = request.body;
    console.log(body);
    actionDB
      .insert(body)
      .then(success => {
        response.status(200).json(success);
      })
      .catch(error => {
        response.status(500).json({ message: "failed to add action" });
      });
  }
);

// PUT to /actions/:id

router.put(
  "/:id",
  validateActions,
  validateActionId,
  validateDescriptionLength,
  validateExistingProjectId,
  (request, response) => {
    const { id } = request.params;
    const body = request.body;
    actionDB
      .update(id, body)
      .then(success =>
        response.status(200).json({ message: `action updated for id ${id}` })
      )
      .catch(error =>
        response.status(500).json({ message: "failed to update action" })
      );
  }
);

// DELETE to /actions/:id

router.delete("/:id", validateActionId, (request, response) => {
  const { id } = request.params;
  actionDB
    .remove(id)
    .then(count =>
      response
        .status(200)
        .json({ message: `${count} action deleted for id ${id}` })
    )
    .catch(error =>
      response.status(500).json({ message: "failed to delete action" })
    );
});

// middleware functions
// Required Fields:

// project_id (must be id of existing project)
// description (up to 128 characters long)
// notes

function validateDescriptionLength(request, response, next) {
  const { description } = request.body;
  if (description.length > 128) {
    response
      .status(400)
      .json({ message: "description length can only be up to 128 characters" });
  } else {
    next();
  }
}

function validateActions(request, response, next) {
  if (!request.body) {
    response.status(400).json({ message: "action data not found" });
  } else if (!request.body.project_id) {
    response.status(400).json({ message: "project id is required" });
  } else if (!request.body.description) {
    response.status(400).json({ message: "description is required" });
  } else if (!request.body.notes) {
    response.status(400).json({ message: "notes is required" });
  }
  next();
}

function validateActionId(request, response, next) {
  const { id } = request.params;
  actionDB
    .get(id)
    .then(actionID => {
      console.log("action id validation success", actionID);
      if (actionID) {
        next();
      } else {
        response.status(400).json({ message: "action id not found" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "failed validation request" });
    });
}

// use getProjectActions() to get project id ?
function validateExistingProjectId(request, response, next) {
  const { project_id } = request.body.project_id;
  projectDB
    .get(project_id)
    .then(projectId => {
      console.log("project id exists", projectId);
      if (projectId) {
        next();
      } else {
        response.status(400).json({ message: "project id does not exist" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "failed validation request" });
    });
}

module.exports = router;
