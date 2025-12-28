import Fastify, { type FastifyInstance } from "fastify";
import cors from '@fastify/cors';

import audioController from "../controllers/AudioController.ts";

class Server {
    private fastifyInstance!: FastifyInstance;
    private PORT!: number;

    constructor() {
        this.fastifyInstance = Fastify({ logger: true });
        this.PORT = 3000

        this.registerRoute();
        this.registerCors();
    }

    public registerCors() {
        this.fastifyInstance.register(cors, {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        })
    }

    public registerRoute(): void {
        this.fastifyInstance.post('/info', audioController.getInfo);
        this.fastifyInstance.post('/download', audioController.downloadFile);
        this.fastifyInstance.get('/stream', audioController.streamFile);
    }

    public async start(): Promise<void> {
        try {
            await this.fastifyInstance.listen({ port: this.PORT });
        } catch (e) {
            this.fastifyInstance.log.error(e);
            process.exit(1);
        }
    }
}

const server = new Server();
export default server;