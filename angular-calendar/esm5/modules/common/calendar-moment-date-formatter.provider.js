import * as tslib_1 from "tslib";
import { InjectionToken, Inject, Injectable } from '@angular/core';
import { getWeekViewPeriod } from './util';
import { DateAdapter } from '../../date-adapters/date-adapter';
export var MOMENT = new InjectionToken('Moment');
/**
 * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
 *
 * ```typescript
 * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
 * import moment from 'moment';
 *
 * // in your component
 * provide: [{
 *   provide: MOMENT, useValue: moment
 * }, {
 *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
 * }]
 *
 * ```
 */
var CalendarMomentDateFormatter = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarMomentDateFormatter(moment, dateAdapter) {
        this.moment = moment;
        this.dateAdapter = dateAdapter;
    }
    /**
     * The month view header week day labels
     */
    CalendarMomentDateFormatter.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    };
    /**
     * The month view cell day number
     */
    CalendarMomentDateFormatter.prototype.monthViewDayNumber = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('D');
    };
    /**
     * The month view title
     */
    CalendarMomentDateFormatter.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('MMMM YYYY');
    };
    /**
     * The week view header week day labels
     */
    CalendarMomentDateFormatter.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    };
    /**
     * The week view sub header day and month labels
     */
    CalendarMomentDateFormatter.prototype.weekViewColumnSubHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('MMM D');
    };
    /**
     * The week view title
     */
    CalendarMomentDateFormatter.prototype.weekViewTitle = function (_a) {
        var _this = this;
        var date = _a.date, locale = _a.locale, weekStartsOn = _a.weekStartsOn, excludeDays = _a.excludeDays, daysInWeek = _a.daysInWeek;
        var _b = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek), viewStart = _b.viewStart, viewEnd = _b.viewEnd;
        var format = function (dateToFormat, showYear) {
            return _this.moment(dateToFormat)
                .locale(locale)
                .format('MMM D' + (showYear ? ', YYYY' : ''));
        };
        return format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()) + " - " + format(viewEnd, true);
    };
    /**
     * The time formatting down the left hand side of the week view
     */
    CalendarMomentDateFormatter.prototype.weekViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('ha');
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    CalendarMomentDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('ha');
    };
    /**
     * The day view title
     */
    CalendarMomentDateFormatter.prototype.dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.moment(date)
            .locale(locale)
            .format('dddd, D MMMM, YYYY');
    };
    CalendarMomentDateFormatter.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MOMENT,] }] },
        { type: DateAdapter }
    ]; };
    CalendarMomentDateFormatter = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(MOMENT)),
        tslib_1.__metadata("design:paramtypes", [Object, DateAdapter])
    ], CalendarMomentDateFormatter);
    return CalendarMomentDateFormatter;
}());
export { CalendarMomentDateFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9tZW50LWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLW1vbWVudC1kYXRlLWZvcm1hdHRlci5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFL0QsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUEyQixJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUzRTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSDtJQUVFOztPQUVHO0lBQ0gscUNBQzRCLE1BQVcsRUFDM0IsV0FBd0I7UUFEUixXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQzNCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQ2pDLENBQUM7SUFFSjs7T0FFRztJQUNJLDJEQUFxQixHQUE1QixVQUE2QixFQUFxQztZQUFuQyxjQUFJLEVBQUUsa0JBQU07UUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNJLHdEQUFrQixHQUF6QixVQUEwQixFQUFxQztZQUFuQyxjQUFJLEVBQUUsa0JBQU07UUFDdEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNJLG9EQUFjLEdBQXJCLFVBQXNCLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMERBQW9CLEdBQTNCLFVBQTRCLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUN4QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDZCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkRBQXVCLEdBQTlCLFVBQStCLEVBR1Q7WUFGcEIsY0FBSSxFQUNKLGtCQUFNO1FBRU4sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLG1EQUFhLEdBQXBCLFVBQXFCLEVBTUM7UUFOdEIsaUJBc0JDO1lBckJDLGNBQUksRUFDSixrQkFBTSxFQUNOLDhCQUFZLEVBQ1osNEJBQVcsRUFDWCwwQkFBVTtRQUVKLElBQUEscUZBTUwsRUFOTyx3QkFBUyxFQUFFLG9CQU1sQixDQUFDO1FBQ0YsSUFBTSxNQUFNLEdBQUcsVUFBQyxZQUFrQixFQUFFLFFBQWlCO1lBQ25ELE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7aUJBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUM7aUJBQ2QsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUYvQyxDQUUrQyxDQUFDO1FBQ2xELE9BQVUsTUFBTSxDQUNkLFNBQVMsRUFDVCxTQUFTLENBQUMsY0FBYyxFQUFFLEtBQUssT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUN4RCxXQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFHLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0RBQVksR0FBbkIsVUFBb0IsRUFBcUM7WUFBbkMsY0FBSSxFQUFFLGtCQUFNO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxpREFBVyxHQUFsQixVQUFtQixFQUFxQztZQUFuQyxjQUFJLEVBQUUsa0JBQU07UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLGtEQUFZLEdBQW5CLFVBQW9CLEVBQXFDO1lBQW5DLGNBQUksRUFBRSxrQkFBTTtRQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDZCxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNsQyxDQUFDOztnREF4R0UsTUFBTSxTQUFDLE1BQU07Z0JBQ1MsV0FBVzs7SUFQekIsMkJBQTJCO1FBRHZDLFVBQVUsRUFBRTtRQU9SLG1CQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTt5REFDUSxXQUFXO09BUHpCLDJCQUEyQixDQStHdkM7SUFBRCxrQ0FBQztDQUFBLEFBL0dELElBK0dDO1NBL0dZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDYWxlbmRhckRhdGVGb3JtYXR0ZXJJbnRlcmZhY2UsXHJcbiAgRGF0ZUZvcm1hdHRlclBhcmFtc1xyXG59IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgZ2V0V2Vla1ZpZXdQZXJpb2QgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBNT01FTlQ6IEluamVjdGlvblRva2VuPHN0cmluZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01vbWVudCcpO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgd2lsbCB1c2UgPGEgaHJlZj1cImh0dHA6Ly9tb21lbnRqcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+bW9tZW50PC9hPiB0byBkbyBhbGwgZGF0ZSBmb3JtYXR0aW5nLiBUbyB1c2UgdGhpcyBjbGFzczpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsIENhbGVuZGFyTW9tZW50RGF0ZUZvcm1hdHRlciwgTU9NRU5UIH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhcic7XHJcbiAqIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuICpcclxuICogLy8gaW4geW91ciBjb21wb25lbnRcclxuICogcHJvdmlkZTogW3tcclxuICogICBwcm92aWRlOiBNT01FTlQsIHVzZVZhbHVlOiBtb21lbnRcclxuICogfSwge1xyXG4gKiAgIHByb3ZpZGU6IENhbGVuZGFyRGF0ZUZvcm1hdHRlciwgdXNlQ2xhc3M6IENhbGVuZGFyTW9tZW50RGF0ZUZvcm1hdHRlclxyXG4gKiB9XVxyXG4gKlxyXG4gKiBgYGBcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9tZW50RGF0ZUZvcm1hdHRlclxyXG4gIGltcGxlbWVudHMgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlIHtcclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KE1PTUVOVCkgcHJvdGVjdGVkIG1vbWVudDogYW55LFxyXG4gICAgcHJvdGVjdGVkIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlclxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1vbnRoIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBtb250aFZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcclxuICAgICAgLmxvY2FsZShsb2NhbGUpXHJcbiAgICAgIC5mb3JtYXQoJ2RkZGQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtb250aCB2aWV3IGNlbGwgZGF5IG51bWJlclxyXG4gICAqL1xyXG4gIHB1YmxpYyBtb250aFZpZXdEYXlOdW1iZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcclxuICAgICAgLmxvY2FsZShsb2NhbGUpXHJcbiAgICAgIC5mb3JtYXQoJ0QnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtb250aCB2aWV3IHRpdGxlXHJcbiAgICovXHJcbiAgcHVibGljIG1vbnRoVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUpXHJcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxyXG4gICAgICAuZm9ybWF0KCdNTU1NIFlZWVknKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3ZWVrIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xyXG4gICAqL1xyXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxyXG4gICAgICAubG9jYWxlKGxvY2FsZSlcclxuICAgICAgLmZvcm1hdCgnZGRkZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHdlZWsgdmlldyBzdWIgaGVhZGVyIGRheSBhbmQgbW9udGggbGFiZWxzXHJcbiAgICovXHJcbiAgcHVibGljIHdlZWtWaWV3Q29sdW1uU3ViSGVhZGVyKHtcclxuICAgIGRhdGUsXHJcbiAgICBsb2NhbGVcclxuICB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxyXG4gICAgICAubG9jYWxlKGxvY2FsZSlcclxuICAgICAgLmZvcm1hdCgnTU1NIEQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3ZWVrIHZpZXcgdGl0bGVcclxuICAgKi9cclxuICBwdWJsaWMgd2Vla1ZpZXdUaXRsZSh7XHJcbiAgICBkYXRlLFxyXG4gICAgbG9jYWxlLFxyXG4gICAgd2Vla1N0YXJ0c09uLFxyXG4gICAgZXhjbHVkZURheXMsXHJcbiAgICBkYXlzSW5XZWVrXHJcbiAgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB7IHZpZXdTdGFydCwgdmlld0VuZCB9ID0gZ2V0V2Vla1ZpZXdQZXJpb2QoXHJcbiAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgIGRhdGUsXHJcbiAgICAgIHdlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZURheXMsXHJcbiAgICAgIGRheXNJbldlZWtcclxuICAgICk7XHJcbiAgICBjb25zdCBmb3JtYXQgPSAoZGF0ZVRvRm9ybWF0OiBEYXRlLCBzaG93WWVhcjogYm9vbGVhbikgPT5cclxuICAgICAgdGhpcy5tb21lbnQoZGF0ZVRvRm9ybWF0KVxyXG4gICAgICAgIC5sb2NhbGUobG9jYWxlKVxyXG4gICAgICAgIC5mb3JtYXQoJ01NTSBEJyArIChzaG93WWVhciA/ICcsIFlZWVknIDogJycpKTtcclxuICAgIHJldHVybiBgJHtmb3JtYXQoXHJcbiAgICAgIHZpZXdTdGFydCxcclxuICAgICAgdmlld1N0YXJ0LmdldFVUQ0Z1bGxZZWFyKCkgIT09IHZpZXdFbmQuZ2V0VVRDRnVsbFllYXIoKVxyXG4gICAgKX0gLSAke2Zvcm1hdCh2aWV3RW5kLCB0cnVlKX1gO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWUgZm9ybWF0dGluZyBkb3duIHRoZSBsZWZ0IGhhbmQgc2lkZSBvZiB0aGUgd2VlayB2aWV3XHJcbiAgICovXHJcbiAgcHVibGljIHdlZWtWaWV3SG91cih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxyXG4gICAgICAubG9jYWxlKGxvY2FsZSlcclxuICAgICAgLmZvcm1hdCgnaGEnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0aW1lIGZvcm1hdHRpbmcgZG93biB0aGUgbGVmdCBoYW5kIHNpZGUgb2YgdGhlIGRheSB2aWV3XHJcbiAgICovXHJcbiAgcHVibGljIGRheVZpZXdIb3VyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUpXHJcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxyXG4gICAgICAuZm9ybWF0KCdoYScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRheSB2aWV3IHRpdGxlXHJcbiAgICovXHJcbiAgcHVibGljIGRheVZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxyXG4gICAgICAubG9jYWxlKGxvY2FsZSlcclxuICAgICAgLmZvcm1hdCgnZGRkZCwgRCBNTU1NLCBZWVlZJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==