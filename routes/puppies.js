import express from "express";
import { Puppy } from "../models/Puppy";
import { WiatingList } from "../models/WaitingList";
import mongoose from "mongoose";

const router = express.Router();

router.get("/get-daily-waiting-lists", async (req, res) => {
  try {
    const waitingLists = await Puppy.aggregate([
      {
        $group: {
          _id: "$waitingList",
          createdAt: { $first: "$createdAt" },
          totalPuppies: { $sum: 1 },
          statuses: {
            $push: {
              status: "$status",
              count: "$count",
            },
          },
        },
      },
      {
        $addFields: {
          waiting: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "WAITING"] },
              },
            },
          },
          done: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "DONE"] },
              },
            },
          },
          processing: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "PROCESSING"] },
              },
            },
          },
          missedTurn: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "MISSED TURN"] },
              },
            },
          },
        },
      },
      { $project: { statuses: 0 } },
    ]);
    return res.status(201).json(waitingLists);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/waiting-list/:listId/", async (req, res) => {
  try {
    const stats = await Puppy.aggregate([
      {
        $match: {
          waitingList: mongoose.Types.ObjectId(req.params.listId),
        },
      },
      {
        $group: {
          _id: null,
          totalPuppies: { $sum: 1 },
          statuses: {
            $push: {
              status: "$status",
              count: "$count",
            },
          },
        },
      },
      {
        $addFields: {
          waiting: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "WAITING"] },
              },
            },
          },
          done: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "DONE"] },
              },
            },
          },
          processing: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "PROCESSING"] },
              },
            },
          },
          missedTurn: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "MISSED TURN"] },
              },
            },
          },
        },
      },
      { $project: { statuses: 0, _id: 0 } },
    ]);

    const puppiesList = await WiatingList.findOne({
      _id: req.params.listId,
    }).populate({
      path: "puppiesList",
    });

    return res.status(200).json({
      puppiesList,
      stats: stats[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/get-today-waiting-list/:listId/:order", async (req, res) => {
  try {
    const search = req.query.search;
    const order = req.params.order === "ASC" ? "createdAt" : "-createdAt";
    const stats = await Puppy.aggregate([
      {
        $match: {
          waitingList: mongoose.Types.ObjectId(req.params.listId),
        },
      },
      {
        $group: {
          _id: null,
          totalPuppies: { $sum: 1 },
          statuses: {
            $push: {
              status: "$status",
              count: "$count",
            },
          },
        },
      },
      {
        $addFields: {
          waiting: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "WAITING"] },
              },
            },
          },
          done: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "DONE"] },
              },
            },
          },
          processing: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "PROCESSING"] },
              },
            },
          },
          missedTurn: {
            $size: {
              $filter: {
                input: "$statuses",
                as: "part",
                cond: { $eq: ["$$part.status", "MISSED TURN"] },
              },
            },
          },
        },
      },
      { $project: { statuses: 0, _id: 0 } },
    ]);

    const puppiesList = await WiatingList.findOne({
      _id: req.params.listId,
    }).populate({
      path: "puppiesList",
      match: {
        status: { $nin: ["DONE", "MISSED TURN"] },
        ...(search && { $text: { $search: search } }),
      },
      options: { sort: order },
    });

    return res.status(200).json({
      puppiesList,
      stats: stats[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/create-waiting-list", async (req, res) => {
  try {
    const todayWaitingList = new WiatingList();
    await todayWaitingList.save();

    return res.status(201).json(todayWaitingList);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/register-puppy", async (req, res) => {
  const { name, service, listId } = req.body;
  try {
    const p = new Puppy({
      name,
      service,
      status: "WAITING",
      waitingList: listId,
    });
    const pp = await p.save();
    await WiatingList.findByIdAndUpdate(listId, {
      $push: {
        puppiesList: pp._id,
      },
    });

    return res.status(201).json({ message: "Puppy Registered!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.patch("/update-puppy-status/:listId/:puppyId", async (req, res) => {
  const { listId, puppyId } = req.params;
  const { status } = req.body;
  try {
    await Puppy.updateOne(
      {
        _id: puppyId,
      },
      {
        $set: {
          status,
        },
      }
    );

    return res.status(201).json({ message: "Puppy Status updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default router;
