import { Router } from "express";
import { addAdvert, deleteAdvert, getAdvert, getAdverts, updateAdvert } from "../controllers/adverts.js";
import { advertmediaUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";

// Create a router 
const advertRouter = Router();

// Define Routes
advertRouter.post("/adverts", isAuthenticated, hasPermission("add_advert"), advertmediaUpload.single("media"), addAdvert);

advertRouter.get("/adverts", getAdverts);

advertRouter.get("/adverts/:id", getAdvert);

advertRouter.patch("/adverts/:id", isAuthenticated, hasPermission("update_advert"), advertmediaUpload.single("media"), updateAdvert);

advertRouter.delete("/adverts/:id", isAuthenticated, hasPermission("delete_advert"), deleteAdvert);

// Export router
export default advertRouter;