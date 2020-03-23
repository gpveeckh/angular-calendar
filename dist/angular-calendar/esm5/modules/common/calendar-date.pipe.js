import * as tslib_1 from "tslib";
import { Pipe, LOCALE_ID, Inject } from '@angular/core';
import { CalendarDateFormatter } from './calendar-date-formatter.provider';
/**
 * This pipe is primarily for rendering the current view title. Example usage:
 * ```typescript
 * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
 * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
 * ```
 */
var CalendarDatePipe = /** @class */ (function () {
    function CalendarDatePipe(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    CalendarDatePipe.prototype.transform = function (date, method, locale, weekStartsOn, excludeDays, daysInWeek) {
        if (locale === void 0) { locale = this.locale; }
        if (weekStartsOn === void 0) { weekStartsOn = 0; }
        if (excludeDays === void 0) { excludeDays = []; }
        if (typeof this.dateFormatter[method] === 'undefined') {
            var allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarDateFormatter.prototype)).filter(function (iMethod) { return iMethod !== 'constructor'; });
            throw new Error(method + " is not a valid date formatter. Can only be one of " + allowedMethods.join(', '));
        }
        return this.dateFormatter[method]({
            date: date,
            locale: locale,
            weekStartsOn: weekStartsOn,
            excludeDays: excludeDays,
            daysInWeek: daysInWeek
        });
    };
    CalendarDatePipe.ctorParameters = function () { return [
        { type: CalendarDateFormatter },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    CalendarDatePipe = tslib_1.__decorate([
        Pipe({
            name: 'calendarDate'
        }),
        tslib_1.__param(1, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [CalendarDateFormatter, String])
    ], CalendarDatePipe);
    return CalendarDatePipe;
}());
export { CalendarDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUUzRTs7Ozs7O0dBTUc7QUFJSDtJQUNFLDBCQUNVLGFBQW9DLEVBQ2pCLE1BQWM7UUFEakMsa0JBQWEsR0FBYixhQUFhLENBQXVCO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDeEMsQ0FBQztJQUVKLG9DQUFTLEdBQVQsVUFDRSxJQUFVLEVBQ1YsTUFBYyxFQUNkLE1BQTRCLEVBQzVCLFlBQXdCLEVBQ3hCLFdBQTBCLEVBQzFCLFVBQW1CO1FBSG5CLHVCQUFBLEVBQUEsU0FBaUIsSUFBSSxDQUFDLE1BQU07UUFDNUIsNkJBQUEsRUFBQSxnQkFBd0I7UUFDeEIsNEJBQUEsRUFBQSxnQkFBMEI7UUFHMUIsSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ3JELElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FDL0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FDdkQsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLEtBQUssYUFBYSxFQUF6QixDQUF5QixDQUFDLENBQUM7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FDVixNQUFNLDJEQUFzRCxjQUFjLENBQUMsSUFBSSxDQUNoRixJQUFJLENBQ0gsQ0FDSixDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFBO1lBQ0osTUFBTSxRQUFBO1lBQ04sWUFBWSxjQUFBO1lBQ1osV0FBVyxhQUFBO1lBQ1gsVUFBVSxZQUFBO1NBQ1gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBN0J3QixxQkFBcUI7NkNBQzNDLE1BQU0sU0FBQyxTQUFTOztJQUhSLGdCQUFnQjtRQUg1QixJQUFJLENBQUM7WUFDSixJQUFJLEVBQUUsY0FBYztTQUNyQixDQUFDO1FBSUcsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2lEQURLLHFCQUFxQjtPQUZuQyxnQkFBZ0IsQ0FnQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQWhDWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBMT0NBTEVfSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHBpcGUgaXMgcHJpbWFyaWx5IGZvciByZW5kZXJpbmcgdGhlIGN1cnJlbnQgdmlldyB0aXRsZS4gRXhhbXBsZSB1c2FnZTpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiAvLyB3aGVyZSBgdmlld0RhdGVgIGlzIGEgYERhdGVgIGFuZCB2aWV3IGlzIGAnbW9udGgnIHwgJ3dlZWsnIHwgJ2RheSdgXHJcbiAqIHt7IHZpZXdEYXRlIHwgY2FsZW5kYXJEYXRlOih2aWV3ICsgJ1ZpZXdUaXRsZScpOidlbicgfX1cclxuICogYGBgXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NhbGVuZGFyRGF0ZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGF0ZUZvcm1hdHRlcjogQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxyXG4gICAgQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlOiBzdHJpbmdcclxuICApIHt9XHJcblxyXG4gIHRyYW5zZm9ybShcclxuICAgIGRhdGU6IERhdGUsXHJcbiAgICBtZXRob2Q6IHN0cmluZyxcclxuICAgIGxvY2FsZTogc3RyaW5nID0gdGhpcy5sb2NhbGUsXHJcbiAgICB3ZWVrU3RhcnRzT246IG51bWJlciA9IDAsXHJcbiAgICBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXSxcclxuICAgIGRheXNJbldlZWs/OiBudW1iZXJcclxuICApOiBzdHJpbmcge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmRhdGVGb3JtYXR0ZXJbbWV0aG9kXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgYWxsb3dlZE1ldGhvZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhcclxuICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLnByb3RvdHlwZSlcclxuICAgICAgKS5maWx0ZXIoaU1ldGhvZCA9PiBpTWV0aG9kICE9PSAnY29uc3RydWN0b3InKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIGAke21ldGhvZH0gaXMgbm90IGEgdmFsaWQgZGF0ZSBmb3JtYXR0ZXIuIENhbiBvbmx5IGJlIG9uZSBvZiAke2FsbG93ZWRNZXRob2RzLmpvaW4oXHJcbiAgICAgICAgICAnLCAnXHJcbiAgICAgICAgKX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyW21ldGhvZF0oe1xyXG4gICAgICBkYXRlLFxyXG4gICAgICBsb2NhbGUsXHJcbiAgICAgIHdlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZURheXMsXHJcbiAgICAgIGRheXNJbldlZWtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=