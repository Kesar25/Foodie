const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database successfully");

        const fetched_data = mongoose.connection.db.collection("foodItems");
        const data = await fetched_data.find({}).toArray();
        
    } catch (err) {
        console.log("Some error occurred", err);
    }
};

module.exports = dbConnection;
