import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";

const router = express.Router();

const swaggerDocument = YAML.load("./server/swagger.yaml");

// Swagger UI route
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
