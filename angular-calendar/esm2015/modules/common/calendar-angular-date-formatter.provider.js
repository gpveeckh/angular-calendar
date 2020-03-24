import * as tslib_1 from "tslib";
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { getWeekViewPeriod } from './util';
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
let CalendarAngularDateFormatter = class CalendarAngularDateFormatter {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
    /**
     * The month view header week day labels
     */
    monthViewColumnHeader({ date, locale }) {
        return formatDate(date, 'EEEE', locale);
    }
    /**
     * The month view cell day number
     */
    monthViewDayNumber({ date, locale }) {
        return formatDate(date, 'd', locale);
    }
    /**
     * The month view title
     */
    monthViewTitle({ date, locale }) {
        return formatDate(date, 'LLLL y', locale);
    }
    /**
     * The week view header week day labels
     */
    weekViewColumnHeader({ date, locale }) {
        return formatDate(date, 'EEEE', locale);
    }
    /**
     * The week view sub header day and month labels
     */
    weekViewColumnSubHeader({ date, locale }) {
        return formatDate(date, 'MMM d', locale);
    }
    /**
     * The week view title
     */
    weekViewTitle({ date, locale, weekStartsOn, excludeDays, daysInWeek }) {
        const { viewStart, viewEnd } = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek);
        const format = (dateToFormat, showYear) => formatDate(dateToFormat, 'MMM d' + (showYear ? ', yyyy' : ''), locale);
        return `${format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear())} - ${format(viewEnd, true)}`;
    }
    /**
     * The time formatting down the left hand side of the week view
     */
    weekViewHour({ date, locale }) {
        return formatDate(date, 'h a', locale);
    }
    /**
     * The time formatting down the left hand side of the day view
     */
    dayViewHour({ date, locale }) {
        return formatDate(date, 'h a', locale);
    }
    /**
     * The day view title
     */
    dayViewTitle({ date, locale }) {
        return formatDate(date, 'EEEE, MMMM d, y', locale);
    }
};
CalendarAngularDateFormatter.ctorParameters = () => [
    { type: DateAdapter }
];
CalendarAngularDateFormatter = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [DateAdapter])
], CalendarAngularDateFormatter);
export { CalendarAngularDateFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1hbmd1bGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRTNDOztHQUVHO0FBRUgsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUFFdkMsWUFBc0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDO0lBRWxEOztPQUVHO0lBQ0kscUJBQXFCLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUF1QjtRQUNoRSxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLGtCQUFrQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBdUI7UUFDN0QsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUF1QjtRQUN6RCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNJLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBdUI7UUFDL0QsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1QkFBdUIsQ0FBQyxFQUM3QixJQUFJLEVBQ0osTUFBTSxFQUNjO1FBQ3BCLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksYUFBYSxDQUFDLEVBQ25CLElBQUksRUFDSixNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWCxVQUFVLEVBQ1U7UUFDcEIsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsR0FBRyxpQkFBaUIsQ0FDOUMsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxFQUNKLFlBQVksRUFDWixXQUFXLEVBQ1gsVUFBVSxDQUNYLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxDQUFDLFlBQWtCLEVBQUUsUUFBaUIsRUFBRSxFQUFFLENBQ3ZELFVBQVUsQ0FBQyxZQUFZLEVBQUUsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sR0FBRyxNQUFNLENBQ2QsU0FBUyxFQUNULFNBQVMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQ3hELE1BQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNJLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQXVCO1FBQ3ZELE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBdUI7UUFDdEQsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUF1QjtRQUN2RCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGLENBQUE7O1lBckZvQyxXQUFXOztBQUZuQyw0QkFBNEI7SUFEeEMsVUFBVSxFQUFFOzZDQUd3QixXQUFXO0dBRm5DLDRCQUE0QixDQXVGeEM7U0F2RlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDYWxlbmRhckRhdGVGb3JtYXR0ZXJJbnRlcmZhY2UsXHJcbiAgRGF0ZUZvcm1hdHRlclBhcmFtc1xyXG59IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7IGdldFdlZWtWaWV3UGVyaW9kIH0gZnJvbSAnLi91dGlsJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHdpbGwgdXNlIHRoZSBhbmd1bGFyIGRhdGUgcGlwZSB0byBkbyBhbGwgZGF0ZSBmb3JtYXR0aW5nLiBJdCBpcyB0aGUgZGVmYXVsdCBkYXRlIGZvcm1hdHRlciB1c2VkIGJ5IHRoZSBjYWxlbmRhci5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQW5ndWxhckRhdGVGb3JtYXR0ZXJcclxuICBpbXBsZW1lbnRzIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSB7XHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcikge31cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1vbnRoIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBtb250aFZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCAnRUVFRScsIGxvY2FsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbW9udGggdmlldyBjZWxsIGRheSBudW1iZXJcclxuICAgKi9cclxuICBwdWJsaWMgbW9udGhWaWV3RGF5TnVtYmVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgJ2QnLCBsb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1vbnRoIHZpZXcgdGl0bGVcclxuICAgKi9cclxuICBwdWJsaWMgbW9udGhWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCAnTExMTCB5JywgbG9jYWxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3ZWVrIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xyXG4gICAqL1xyXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBmb3JtYXREYXRlKGRhdGUsICdFRUVFJywgbG9jYWxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3ZWVrIHZpZXcgc3ViIGhlYWRlciBkYXkgYW5kIG1vbnRoIGxhYmVsc1xyXG4gICAqL1xyXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtblN1YkhlYWRlcih7XHJcbiAgICBkYXRlLFxyXG4gICAgbG9jYWxlXHJcbiAgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCAnTU1NIGQnLCBsb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHdlZWsgdmlldyB0aXRsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyB3ZWVrVmlld1RpdGxlKHtcclxuICAgIGRhdGUsXHJcbiAgICBsb2NhbGUsXHJcbiAgICB3ZWVrU3RhcnRzT24sXHJcbiAgICBleGNsdWRlRGF5cyxcclxuICAgIGRheXNJbldlZWtcclxuICB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHsgdmlld1N0YXJ0LCB2aWV3RW5kIH0gPSBnZXRXZWVrVmlld1BlcmlvZChcclxuICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgZGF0ZSxcclxuICAgICAgd2Vla1N0YXJ0c09uLFxyXG4gICAgICBleGNsdWRlRGF5cyxcclxuICAgICAgZGF5c0luV2Vla1xyXG4gICAgKTtcclxuICAgIGNvbnN0IGZvcm1hdCA9IChkYXRlVG9Gb3JtYXQ6IERhdGUsIHNob3dZZWFyOiBib29sZWFuKSA9PlxyXG4gICAgICBmb3JtYXREYXRlKGRhdGVUb0Zvcm1hdCwgJ01NTSBkJyArIChzaG93WWVhciA/ICcsIHl5eXknIDogJycpLCBsb2NhbGUpO1xyXG4gICAgcmV0dXJuIGAke2Zvcm1hdChcclxuICAgICAgdmlld1N0YXJ0LFxyXG4gICAgICB2aWV3U3RhcnQuZ2V0VVRDRnVsbFllYXIoKSAhPT0gdmlld0VuZC5nZXRVVENGdWxsWWVhcigpXHJcbiAgICApfSAtICR7Zm9ybWF0KHZpZXdFbmQsIHRydWUpfWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZSBmb3JtYXR0aW5nIGRvd24gdGhlIGxlZnQgaGFuZCBzaWRlIG9mIHRoZSB3ZWVrIHZpZXdcclxuICAgKi9cclxuICBwdWJsaWMgd2Vla1ZpZXdIb3VyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgJ2ggYScsIGxvY2FsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZSBmb3JtYXR0aW5nIGRvd24gdGhlIGxlZnQgaGFuZCBzaWRlIG9mIHRoZSBkYXkgdmlld1xyXG4gICAqL1xyXG4gIHB1YmxpYyBkYXlWaWV3SG91cih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBmb3JtYXREYXRlKGRhdGUsICdoIGEnLCBsb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRheSB2aWV3IHRpdGxlXHJcbiAgICovXHJcbiAgcHVibGljIGRheVZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBmb3JtYXREYXRlKGRhdGUsICdFRUVFLCBNTU1NIGQsIHknLCBsb2NhbGUpO1xyXG4gIH1cclxufVxyXG4iXX0=