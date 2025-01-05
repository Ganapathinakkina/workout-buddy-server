const fs = require("fs");
const path = require("path");
const WorkoutModel = require("../models/workoutModel");

const loadData = async () => {
    try {
        const filePath = path.join(__dirname, "workoutData.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        for (const workout of data) {
            const exists = await WorkoutModel.findOne({ title: workout.title });
            if (exists) {
                console.log(`Skipping existing workout: ${workout.title}`);
            } else {
                await WorkoutModel.create(workout);
                console.log(`Added workout: ${workout.title}`);
            }
        }

        console.log("Data loading process completed.");
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

module.exports = loadData;
