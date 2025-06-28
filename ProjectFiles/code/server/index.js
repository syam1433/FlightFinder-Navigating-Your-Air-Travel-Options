const express=require("express");
const dotenv=require("dotenv");
const authroutes=require("./routes/auth");
const cors=require("cors");
dotenv.config();

const mongoose=require("mongoose");

const app=express();
const PORT =3000;
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const operatorRoutes = require('./routes/operatorRoutes');
const flightRoutes = require('./routes/flightRoutes');
app.use('/api/flights', flightRoutes);

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/operator', operatorRoutes);
app.use("/api/auth",authroutes);


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log("✅ MongoDB successfully connected");

    } catch (error) {
        console.error("❌ Error while connecting to MongoDB:", error);
    }
};


app.listen(PORT, () => {
    console.log("🚀 Server started at http://localhost:" + PORT);
    connectDb();
});