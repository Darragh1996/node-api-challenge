const express = require("express");

const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.status(200).json(newAction);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

router.put("/:id", (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong" });
    });
});

//middleware
function validateAction(req, res, next) {
  console.log("inside validateAction");
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "please include action" });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "both description and notes required" });
  } else {
    next();
  }
}

module.exports = router;
