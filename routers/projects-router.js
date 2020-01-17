const express = require("express");

const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.getProject);
});

router.post("/", validateProect, (req, res) => {
  Projects.insert(req.project)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

router.put("/:id", validateProect, (req, res) => {
  Projects.update(req.params.id, req.user)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

//middleware
function validateProect(req, res, next) {
  console.log("inside validateProject");
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing project data" });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "both name and description required" });
  } else {
    req.project = req.body;
    next();
  }
}

function validateProjectId(req, res, next) {
  console.log("inside validateProjectId");
  Projects.get(req.params.id)
    .then(project => {
      if (project === null) {
        res.status(404).json({ message: `no project at ${req.params.id}` });
      } else {
        req.getProject = project;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
}

module.exports = router;
