import * as dotenv from 'dotenv';

dotenv.config();
import { ERROR_CODES, ERROR_MESSAGES } from '@app/constants/AppConstants';
import {Routes} from '@app/routes/routes';
import { AppResponse } from '@app/services/AppResponse';
import * as bodyParser from 'body-parser';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

export default class App {
    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routes.routes(this.app);
        this.swaggerSetup();
        this.errorHandler();
    }

    public startHttpServer = () => {
        this.app.listen(process.env.LISTEN_PORT, () => {
            console.log('Express server listening on port ' + process.env.LISTEN_PORT);
        });
    }

    private config(): void {
        this.app.use(bodyParser.json());
    }

    private swaggerSetup(): void {
        const swaggerDefinition = {
            info: {
                title: 'Bluepad Assignment Swagger',
                version: '1.0.0',
                description: 'API documentation of Bluepad Assignment',
            },
            host: process.env.APP_HOST,
            basePath: '/',
        };
        const options = {
            swaggerDefinition,
            apis: ['**/*Controller.ts'],
        };
        const swaggerSpec = swaggerJSDoc(options);
        this.app.get('/content_service/docs', (req, res) => {
            res.send(swaggerSpec);
        });
    }

    private errorHandler(): void {
        this.app.use((err, req, res, next) => {
            if (err) {
                const appResponse = new AppResponse();

                console.error(err.stack);

                appResponse.error(res,
                    ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                    ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
                    err.message);
            }
        });
    }
}
