const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

// Purpose: To handle requests from the routes for goals
// Notes: @route GET /api/goals
// Notes: Private route
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

// Purpose: To handle requests from the routes for goals
// Notes: @route POST /api/goals
// Notes: Private route
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Please enter a goal");
  }

  const goal = await Goal.create({ text: req.body.text });

  res.status(200).json(goal);
});

// Purpose: To handle requests from the routes for goals
// Notes: @route PUT /api/goals/:id
// Notes: Private route
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// Purpose: To handle requests from the routes for goals
// Notes: @route Delete /api/goals/:id
// Notes: Private route
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
