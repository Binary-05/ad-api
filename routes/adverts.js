import { Router } from "express";
import { addAdvert, deleteAdvert, getAdvertById, getAdverts, updateAdvert } from "../controllers/adverts.js";
import { advertmediaUpload } from "../middlewares/upload.js";

// Create a router 
const advertRouter = Router();

// Define Routes
advertRouter.post("/adverts", advertmediaUpload.single("media"), addAdvert);

advertRouter.get("/adverts", getAdverts);

advertRouter.get("/adverts/:id", getAdvertById);

advertRouter.patch("/adverts/:id", advertmediaUpload.single("media"), updateAdvert);

advertRouter.delete("/adverts/:id", deleteAdvert);

// Export router
export default advertRouter;