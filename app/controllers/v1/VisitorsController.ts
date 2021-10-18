import AppConstants from '@app/constants/AppConstants';
import BaseController from '@app/controllers/BaseController';
import VisitorsService from '@app/services/VisitorsService';
import {Response} from 'express';

export class VisitorsController extends BaseController {
    private visitorsService: VisitorsService;

    public constructor(visitorsService: VisitorsService) {
        super();
        this.visitorsService = visitorsService;
    }

    /**
     * @swagger
     *
     * /api/v1/visitors:
     *   put:
     *     summary: get visitors
     *     description: Like an article
     *     tags:
     *        - Likes
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: articleId
     *         in: path
     *         type: number
     *         required: true
     *     responses:
     *       200:
     *         description: ok
     */
    public getVisitors = async (req: any, res: Response, next) => {
        try {
            const {date, ignore} =  req.query;
            if(!date) {
                return this.appResponse.badRequest(
                    res,
                    AppConstants.ERROR_CODES.ERR_MISSING_REQUIRED_ATTRIBUTES,
                    AppConstants.ERROR_MESSAGES.ERR_MISSING_REQUIRED_ATTRIBUTES,
                )
            }
            const visitorData = await this.visitorsService.getVisitors(date, ignore);
            return this.appResponse.success(res, {visitorData});
        } catch (error) {
            next(error);
        }
    }
}

export default VisitorsController;
