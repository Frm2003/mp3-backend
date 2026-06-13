import { Component } from "@midnightjd/core";
import { HttpRequest, HttpServerAdapter, ParameterResolver, RouteDefinition } from "@midnightjd/web";
import fastify, { FastifyReply, FastifyRequest } from "fastify";

@Component
export default class FastifyAdapter extends HttpServerAdapter {
    private fastifyInstance = fastify({ logger: true });

    public  registerRoute({ httpMethod, method, path, controller }: RouteDefinition): void {
        const handler = async (req: FastifyRequest, res: FastifyReply) => {
            const HttpRequest: HttpRequest = {
                body: req.body,
                query: req.query as any,
                path: req.params as any,
                headers: req.headers as any
            };
            
            const args = ParameterResolver.getArgs(HttpRequest, controller!, method)

            return await controller![method](...args);
        };

        this.fastifyInstance.route({
            handler,
            method: httpMethod,
            url: path,
        })
    }
    
    public async listen(port: number): Promise<void> {
        this.fastifyInstance.listen({
            port: port,
            host: '0.0.0.0'
        });
    }

    public logError(err: any): void {
        this.fastifyInstance.log.error(err);
    }
}