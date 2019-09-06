// helper methods from actionModel.js:  get, insert, update, remove

const express = require("express");

const router = express.Router();

// const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");

// GET to /actions

router.get("/", (request, response) => {
  actionDB
    .get()
    .then(getActions => {
      response.status(200).json(getActions);
    })
    .catch(error => {
      response.status(500).json({ message: "failed to get actions" });
    });
});

// GET w/ dynamic id to actions/:id

router.get("/:id", (request, response) => {
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

router.post("/", (request, response) => {
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
});

// PUT to /actions/:id

router.put("/:id", (request, response) => {
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
});

// DELETE to /actions/:id

router.delete("/:id", (request, response) => {
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
// function validateProjectID(request, response, next) {
//   next();
// }

// function validateDescription(request, response, next) {
//   next();
// }

// function validateNotes(request, response, next) {
//   next();
// }

module.exports = router;
