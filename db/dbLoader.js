const fs = require("fs");
const path = require("path");
const WorkoutModel = require("../models/workoutModel");

const convertImageToBase64 = (filePath) => {
    try {
      const absolutePath = path.resolve(__dirname, filePath);
      const data = fs.readFileSync(absolutePath); 
      const base64String = data.toString("base64");
      const mimeType = `image/${path.extname(absolutePath).substring(1)}`;
      return `data:${mimeType};base64,${base64String}`;
    } catch (error) {
      console.error(`Error converting image to Base64: ${filePath}`);
      console.error(error);
      return null; // Return null in case of an error
    }
  };  

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
                
                if(!exists.image_blob)
                {
                    shallUpdate=true;
                    exists.image_blob=convertImageToBase64(workout.image_blob);
                }

                if(shallUpdate)
                {
                    await exists.save();   
                    console.log(`Updated successfuly: ${workout.title}`);
                }
                else
                {
                    console.log(`Skipping existing workout: ${workout.title}`);
                    // console.log("Workout Already Existed")
                }

            } else {
                workout.image_blob=convertImageToBase64(workout.image_blob);
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
