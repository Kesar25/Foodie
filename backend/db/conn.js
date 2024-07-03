const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database successfully");

        const fetched_data = mongoose.connection.db.collection("foodItems");
        const fetched_data2=mongoose.connection.db.collection("foodCategory");
        const data2=await fetched_data2.find({}).toArray();
        const data = await fetched_data.find({}).toArray();
        global.food_category=data2;
        global.food_items=data;
        
    } catch (err) {
        console.log("Some error occurred", err);
    }
};

module.exports = dbConnection;
