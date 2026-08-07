import cors from "cors";
import express from "express";
import usersRoutes from "./modules/users/users.routes";
import eventsRoutes from "./modules/events/events.routes";
import rsvpsRoutes from "./modules/rsvps/rsvps.routes";
import healthRoute from "./modules/health/health.route";
import { errorHandler } from "./middleware/errorHandler";
import emailVerificationRoutes from "./modules/emailVerification/emailVerification.routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());

app.use( "/users",usersRoutes);
app.use("/events", eventsRoutes);
app.use("/rsvps", rsvpsRoutes);
app.use("/health", healthRoute);
app.use("/api", emailVerificationRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});