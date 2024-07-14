import { Hono } from "hono";
import { Context } from "hono/jsx";
import { sponsoredDetails } from "../controllers/sponsorController";

const sponsorRouter=new Hono()

sponsorRouter.post("/",sponsoredDetails)



export default sponsorRouter