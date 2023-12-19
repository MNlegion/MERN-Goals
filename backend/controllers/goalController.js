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

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404)
    throw new Error("Goal not found");
  } 

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true, runValidators: true }
  );
  

  res.status(200).json(updatedGoal);
});

// Purpose: To handle requests from the routes for goals
// Notes: @route Delete /api/goals/:id
// Notes: Private route
const deleteGoal = asyncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404)
    throw new Error("Goal not found");
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Goal deleted" });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
