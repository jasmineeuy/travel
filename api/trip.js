const express = require("express");
const router = express.Router();
const Trip = require("../models").Trip;
const User = require("../models").User;

router.get("/:id/alltrips", async (req, res) => {
  const userId = req.params.id;

  try {
    const userTrip = await Trip.findAll({
      where: {
        userId,
      },
    });

    res.json({
      userTrip,
    });
  } catch (error) {
    res.status(409).json({
      message: "Error could not retrieve trips",
    });
  }
});

router.post("/:id/newtrip/", async (req, res) => {
  const { name, location, from, to, group, cost, imgUrl } = req.body;
  const userId = req.params.id;

  if ((!name || !location || !from || !to, !group || !cost || !imgUrl)) {
    return res.status(409).json({
      message: "All fields must be filled in",
    });
  }

  try {
    const [trip, created] = await Trip.findOrCreate({
      where: { userId, name },
      defaults: { location, from, to, group, cost, imgUrl },
    });

    if (!created) {
      return res.status(409).json({
        message: "Trip name in use",
      });
    }
    res.json({
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create trip",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const erase = await Trip.destroy({
      where: { id },
    });

    res.json({
      erase,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete trip",
    });
  }
});

module.exports = router;
