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
let CalendarDatePipe = class CalendarDatePipe {
    constructor(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    transform(date, method, locale = this.locale, weekStartsOn = 0, excludeDays = [], daysInWeek) {
        if (typeof this.dateFormatter[method] === 'undefined') {
            const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarDateFormatter.prototype)).filter(iMethod => iMethod !== 'constructor');
            throw new Error(`${method} is not a valid date formatter. Can only be one of ${allowedMethods.join(', ')}`);
        }
        return this.dateFormatter[method]({
            date,
            locale,
            weekStartsOn,
            excludeDays,
            daysInWeek
        });
    }
};
CalendarDatePipe.ctorParameters = () => [
    { type: CalendarDateFormatter },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarDatePipe = tslib_1.__decorate([
    Pipe({
        name: 'calendarDate'
    }),
    tslib_1.__param(1, Inject(LOCALE_ID)),
    tslib_1.__metadata("design:paramtypes", [CalendarDateFormatter, String])
], CalendarDatePipe);
export { CalendarDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUUzRTs7Ozs7O0dBTUc7QUFJSCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUMzQixZQUNVLGFBQW9DLEVBQ2pCLE1BQWM7UUFEakMsa0JBQWEsR0FBYixhQUFhLENBQXVCO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDeEMsQ0FBQztJQUVKLFNBQVMsQ0FDUCxJQUFVLEVBQ1YsTUFBYyxFQUNkLFNBQWlCLElBQUksQ0FBQyxNQUFNLEVBQzVCLGVBQXVCLENBQUMsRUFDeEIsY0FBd0IsRUFBRSxFQUMxQixVQUFtQjtRQUVuQixJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDckQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUMvQyxNQUFNLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUN2RCxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQztZQUMvQyxNQUFNLElBQUksS0FBSyxDQUNiLEdBQUcsTUFBTSxzREFBc0QsY0FBYyxDQUFDLElBQUksQ0FDaEYsSUFBSSxDQUNMLEVBQUUsQ0FDSixDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsSUFBSTtZQUNKLE1BQU07WUFDTixZQUFZO1lBQ1osV0FBVztZQUNYLFVBQVU7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7WUE5QjBCLHFCQUFxQjt5Q0FDM0MsTUFBTSxTQUFDLFNBQVM7O0FBSFIsZ0JBQWdCO0lBSDVCLElBQUksQ0FBQztRQUNKLElBQUksRUFBRSxjQUFjO0tBQ3JCLENBQUM7SUFJRyxtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7NkNBREsscUJBQXFCO0dBRm5DLGdCQUFnQixDQWdDNUI7U0FoQ1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgTE9DQUxFX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XHJcblxyXG4vKipcclxuICogVGhpcyBwaXBlIGlzIHByaW1hcmlseSBmb3IgcmVuZGVyaW5nIHRoZSBjdXJyZW50IHZpZXcgdGl0bGUuIEV4YW1wbGUgdXNhZ2U6XHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogLy8gd2hlcmUgYHZpZXdEYXRlYCBpcyBhIGBEYXRlYCBhbmQgdmlldyBpcyBgJ21vbnRoJyB8ICd3ZWVrJyB8ICdkYXknYFxyXG4gKiB7eyB2aWV3RGF0ZSB8IGNhbGVuZGFyRGF0ZToodmlldyArICdWaWV3VGl0bGUnKTonZW4nIH19XHJcbiAqIGBgYFxyXG4gKi9cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdjYWxlbmRhckRhdGUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRhdGVGb3JtYXR0ZXI6IENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcclxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nXHJcbiAgKSB7fVxyXG5cclxuICB0cmFuc2Zvcm0oXHJcbiAgICBkYXRlOiBEYXRlLFxyXG4gICAgbWV0aG9kOiBzdHJpbmcsXHJcbiAgICBsb2NhbGU6IHN0cmluZyA9IHRoaXMubG9jYWxlLFxyXG4gICAgd2Vla1N0YXJ0c09uOiBudW1iZXIgPSAwLFxyXG4gICAgZXhjbHVkZURheXM6IG51bWJlcltdID0gW10sXHJcbiAgICBkYXlzSW5XZWVrPzogbnVtYmVyXHJcbiAgKTogc3RyaW5nIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5kYXRlRm9ybWF0dGVyW21ldGhvZF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGFsbG93ZWRNZXRob2RzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoXHJcbiAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKENhbGVuZGFyRGF0ZUZvcm1hdHRlci5wcm90b3R5cGUpXHJcbiAgICAgICkuZmlsdGVyKGlNZXRob2QgPT4gaU1ldGhvZCAhPT0gJ2NvbnN0cnVjdG9yJyk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgJHttZXRob2R9IGlzIG5vdCBhIHZhbGlkIGRhdGUgZm9ybWF0dGVyLiBDYW4gb25seSBiZSBvbmUgb2YgJHthbGxvd2VkTWV0aG9kcy5qb2luKFxyXG4gICAgICAgICAgJywgJ1xyXG4gICAgICAgICl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlclttZXRob2RdKHtcclxuICAgICAgZGF0ZSxcclxuICAgICAgbG9jYWxlLFxyXG4gICAgICB3ZWVrU3RhcnRzT24sXHJcbiAgICAgIGV4Y2x1ZGVEYXlzLFxyXG4gICAgICBkYXlzSW5XZWVrXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19