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
                let shallUpdate=false;
                if(exists.reps!==workout.reps)
                {
                    shallUpdate=true;
                    exists.reps=workout.reps;
                }
                    
                if(exists.load!==workout.load)
                {
                    shallUpdate=true;
                    exists.load=workout.load;
                }
                if(exists.image_path!==workout.image_path)
                {
                    shallUpdate=true;
                    exists.image_path=workout.image_path;
                }

                if(shallUpdate)
                {
                    await exists.save();   
                    console.log(`Updated successfuly: ${workout.title}`);
                }
                else
                {
                    console.log(`Skipping existing workout: ${workout.title}`);
                }

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
