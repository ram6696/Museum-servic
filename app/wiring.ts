import { VisitorsController } from "./controllers/v1/VisitorsController";
import VisitorsMiddleware from "./middlewares/VistorsMiddleware";
import VisitorsService from "./services/VisitorsService";

class Wiring {

    /**
     * Middlewares
     */
    public visitorsMiddleware = new VisitorsMiddleware();

    /**
     * Service
     */
    public visitorsService = new VisitorsService();

    /**
     * Controllers
     */
    public visitorsController = new VisitorsController(this.visitorsService);
}

export default new Wiring();