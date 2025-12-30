import { FastifyReply, FastifyRequest } from "fastify";

class HealthController {
    public isOk(req: FastifyRequest, res: FastifyReply): void {
        res.status(200).send("OK")
    }
}

const healthController = new HealthController();
export default healthController;