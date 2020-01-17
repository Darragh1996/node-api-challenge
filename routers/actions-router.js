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

router.post("/", (req, res) => {
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

module.exports = router;
