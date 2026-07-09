import cors from "cors";
import express from "express";
import usersRoutes from "./modules/users/users.routes";
import eventsRoutes from "./modules/events/events.routes";
import rsvpsRoutes from "./modules/rsvps/rsvps.routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    })
);
app.use(express.json());

app.use( "/users",usersRoutes);
app.use("/events", eventsRoutes);
app.use("/rsvps", rsvpsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running`);
});