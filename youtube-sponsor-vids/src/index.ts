import { Hono } from "hono";
import { cors } from "hono/cors";
import sponsorRouter from "./routers/sponsorRouter";


const app = new Hono<{
  Bindings: {
    GROQ_API_KEY: string;
  };
}>();



// cross origin site referencing
app.use(cors());

// routers

app.route("/api/v1/sponsoredDetails", sponsorRouter);

export default app;
