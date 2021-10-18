import request from 'request-promise';
export default class VisitorsService {

    public getVisitors = async (dateInMilliseconds: string, ignore: string) => {
        try {
            // get date attribute
            const {year, month, startDate, monthEndDate} = this.getDateAttributes(dateInMilliseconds);
            // get the visitors for the month from the time stamp
            const visitor = await this.getMuseumVisitorForMonth(startDate, monthEndDate);
            // format the response
            return this.formatVisitorsResponse(year, month, visitor, ignore)        
        } catch (error) {
            throw error;
        }
    }

    public formatVisitorsResponse = (year, month, visitor, ignored) => {
        const visitorsData = {
            month,
            year,
            ignored: {},
        }
        delete visitor.month;

        // Get the value for the ignored field and remove from object for further calc
        if(visitor[ignored] !== undefined) {
            visitorsData.ignored = {
                museum: ignored,
                visitor: visitor[ignored]
            }
            delete visitor[ignored]
        }
        // get the highest from the visitor object
        const highestVisitorMuseum = Object.keys(visitor).reduce((a, b) => parseInt(visitor[a], 10) > parseInt(visitor[b], 10) ? a : b);
        // get the lowest from the visitor object
        const lowestVisitorMuseum =  Object.keys(visitor).reduce((a, b) => parseInt(visitor[a], 10) < parseInt(visitor[b], 10) ? a : b);    

        visitorsData["highest"] = {
            museum: highestVisitorMuseum,
            visitor: visitor[highestVisitorMuseum]
        }

        visitorsData["lowest"] = {
            museum: lowestVisitorMuseum,
            visitor: visitor[lowestVisitorMuseum]
        }

        return visitorsData;

    }

    public getMuseumVisitorForMonth = async (startDate: string, monthEndDate: string) => {
        const url =`https://data.lacity.org/resource/trxm-jn3c.json?$where=month between '${startDate.slice(0, -1)}' and '${monthEndDate.slice(0, -1)}'`
        var options = {
            uri: url,
            method: "GET",
            json: true
        }
        const visitors = await request(options);
        return visitors[0];
        
    }

    public getDateAttributes = (dateInMilliseconds: string) => {
        const date = new Date(parseInt(dateInMilliseconds));
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const startDate = date.toISOString();
        const monthEndDate = this.getEndOfMonth(date);
        return {
            year,
            month,
            startDate,
            monthEndDate,
        }
    }

    public getEndOfMonth = (istDate) => {
        return new Date(istDate.getFullYear(), istDate.getMonth() + 1, 0).toISOString();
    }
}