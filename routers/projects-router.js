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

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(200).json(newProject);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
