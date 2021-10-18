import wiring from '@app/wiring';

export class Routes {

    public routes(app: any): void {
        /**
         * Visitors
         */
        app.get('/api/v1/visitors',
            wiring.visitorsController.getVisitors);
    }
}