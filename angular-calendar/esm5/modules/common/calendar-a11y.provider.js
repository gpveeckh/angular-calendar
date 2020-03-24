import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { formatDate, I18nPluralPipe } from '@angular/common';
/**
 * This class is responsible for adding accessibility to the calendar.
 * You may override any of its methods via angulars DI to suit your requirements.
 * For example:
 *
 * ```typescript
 * import { A11yParams, CalendarA11y } from 'angular-calendar';
 * import { formatDate, I18nPluralPipe } from '@angular/common';
 * import { Injectable } from '@angular/core';
 *
 * // adding your own a11y params
 * export interface CustomA11yParams extends A11yParams {
 *   isDrSuess?: boolean;
 * }
 *
 * @Injectable()
 * export class CustomCalendarA11y extends CalendarA11y {
 *   constructor(protected i18nPlural: I18nPluralPipe) {
 *     super(i18nPlural);
 *   }
 *
 *   // overriding a function
 *   public openDayEventsLandmark({ date, locale, isDrSuess }: CustomA11yParams): string {
 *     if (isDrSuess) {
 *       return `
 *         ${formatDate(date, 'EEEE MMMM d', locale)}
 *          Today you are you! That is truer than true! There is no one alive
 *          who is you-er than you!
 *       `;
 *     }
 *   }
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *  provide: CalendarA11y,
 *  useClass: CustomCalendarA11y
 * }]
 * ```
 */
var CalendarA11y = /** @class */ (function () {
    function CalendarA11y(i18nPlural) {
        this.i18nPlural = i18nPlural;
    }
    /**
     * Aria label for the badges/date of a cell
     * @example: `Saturday October 19 1 event click to expand`
     */
    CalendarA11y.prototype.monthCell = function (_a) {
        var day = _a.day, locale = _a.locale;
        if (day.badgeTotal > 0) {
            return "\n        " + formatDate(day.date, 'EEEE MMMM d', locale) + ",\n        " + this.i18nPlural.transform(day.badgeTotal, {
                '=0': 'No events',
                '=1': 'One event',
                other: '# events'
            }) + ",\n         click to expand\n      ";
        }
        else {
            return "" + formatDate(day.date, 'EEEE MMMM d', locale);
        }
    };
    /**
     * Aria label for the open day events start landmark
     * @example: `Saturday October 19 expanded view`
     */
    CalendarA11y.prototype.openDayEventsLandmark = function (_a) {
        var date = _a.date, locale = _a.locale;
        return "\n      Beginning of expanded view for " + formatDate(date, 'EEEE MMMM dd', locale) + "\n    ";
    };
    /**
     * Aria label for alert that a day in the month view was expanded
     * @example: `Saturday October 19 expanded`
     */
    CalendarA11y.prototype.openDayEventsAlert = function (_a) {
        var date = _a.date, locale = _a.locale;
        return formatDate(date, 'EEEE MMMM dd', locale) + " expanded";
    };
    /**
     * Descriptive aria label for an event
     * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
     */
    CalendarA11y.prototype.eventDescription = function (_a) {
        var event = _a.event, locale = _a.locale;
        if (event.allDay === true) {
            return this.allDayEventDescription({ event: event, locale: locale });
        }
        var aria = "\n      " + formatDate(event.start, 'EEEE MMMM dd', locale) + ",\n      " + event.title + ", from " + formatDate(event.start, 'hh:mm a', locale) + "\n    ";
        if (event.end) {
            return aria + (" to " + formatDate(event.end, 'hh:mm a', locale));
        }
        return aria;
    };
    /**
     * Descriptive aria label for an all day event
     * @example:
     * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
     */
    CalendarA11y.prototype.allDayEventDescription = function (_a) {
        var event = _a.event, locale = _a.locale;
        var aria = "\n      " + event.title + ", event spans multiple days:\n      start time " + formatDate(event.start, 'MMMM dd hh:mm a', locale) + "\n    ";
        if (event.end) {
            return (aria + (", stop time " + formatDate(event.end, 'MMMM d hh:mm a', locale)));
        }
        return aria + ", no stop time";
    };
    /**
     * Aria label for the calendar event actions icons
     * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
     */
    CalendarA11y.prototype.actionButtonLabel = function (_a) {
        var action = _a.action;
        return action.a11yLabel;
    };
    /**
     * @returns {number} Tab index to be given to month cells
     */
    CalendarA11y.prototype.monthCellTabIndex = function () {
        return 0;
    };
    /**
     * @returns true if the events inside the month cell should be aria-hidden
     */
    CalendarA11y.prototype.hideMonthCellEvents = function () {
        return true;
    };
    /**
     * @returns true if event titles should be aria-hidden (global)
     */
    CalendarA11y.prototype.hideEventTitle = function () {
        return true;
    };
    /**
     * @returns true if hour segments in the week view should be aria-hidden
     */
    CalendarA11y.prototype.hideWeekHourSegment = function () {
        return true;
    };
    /**
     * @returns true if hour segments in the day view should be aria-hidden
     */
    CalendarA11y.prototype.hideDayHourSegment = function () {
        return true;
    };
    CalendarA11y.ctorParameters = function () { return [
        { type: I18nPluralPipe }
    ]; };
    CalendarA11y = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [I18nPluralPipe])
    ], CalendarA11y);
    return CalendarA11y;
}());
export { CalendarA11y };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1hMTF5LnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUVIO0lBQ0Usc0JBQXNCLFVBQTBCO1FBQTFCLGVBQVUsR0FBVixVQUFVLENBQWdCO0lBQUcsQ0FBQztJQUVwRDs7O09BR0c7SUFDSSxnQ0FBUyxHQUFoQixVQUFpQixFQUEyQjtZQUF6QixZQUFHLEVBQUUsa0JBQU07UUFDNUIsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLGVBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxtQkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDMUMsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsVUFBVTthQUNsQixDQUFDLHdDQUVILENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxLQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUcsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSSw0Q0FBcUIsR0FBNUIsVUFBNkIsRUFBNEI7WUFBMUIsY0FBSSxFQUFFLGtCQUFNO1FBQ3pDLE9BQU8sNENBQzRCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxXQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNJLHlDQUFrQixHQUF6QixVQUEwQixFQUE0QjtZQUExQixjQUFJLEVBQUUsa0JBQU07UUFDdEMsT0FBVSxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsY0FBVyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSSx1Q0FBZ0IsR0FBdkIsVUFBd0IsRUFBNkI7WUFBM0IsZ0JBQUssRUFBRSxrQkFBTTtRQUNyQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsS0FBSyxPQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBTSxJQUFJLEdBQUcsYUFDVCxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLGlCQUMvQyxLQUFLLENBQUMsS0FBSyxlQUFVLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FDbEUsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sSUFBSSxJQUFHLFNBQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBRyxDQUFBLENBQUM7U0FDakU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNkNBQXNCLEdBQTdCLFVBQThCLEVBQTZCO1lBQTNCLGdCQUFLLEVBQUUsa0JBQU07UUFDM0MsSUFBTSxJQUFJLEdBQUcsYUFDVCxLQUFLLENBQUMsS0FBSyx1REFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsV0FDaEUsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sQ0FDTCxJQUFJLElBQUcsaUJBQWUsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFHLENBQUEsQ0FDeEUsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHdDQUFpQixHQUF4QixVQUF5QixFQUFzQjtZQUFwQixrQkFBTTtRQUMvQixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0NBQWlCLEdBQXhCO1FBQ0UsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBbUIsR0FBMUI7UUFDRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNJLHFDQUFjLEdBQXJCO1FBQ0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBbUIsR0FBMUI7UUFDRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNJLHlDQUFrQixHQUF6QjtRQUNFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBdEhpQyxjQUFjOztJQURyQyxZQUFZO1FBRHhCLFVBQVUsRUFBRTtpREFFdUIsY0FBYztPQURyQyxZQUFZLENBd0h4QjtJQUFELG1CQUFDO0NBQUEsQUF4SEQsSUF3SEM7U0F4SFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZm9ybWF0RGF0ZSwgSTE4blBsdXJhbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBMTF5UGFyYW1zIH0gZnJvbSAnLi9jYWxlbmRhci1hMTF5LmludGVyZmFjZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgYWRkaW5nIGFjY2Vzc2liaWxpdHkgdG8gdGhlIGNhbGVuZGFyLlxyXG4gKiBZb3UgbWF5IG92ZXJyaWRlIGFueSBvZiBpdHMgbWV0aG9kcyB2aWEgYW5ndWxhcnMgREkgdG8gc3VpdCB5b3VyIHJlcXVpcmVtZW50cy5cclxuICogRm9yIGV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgQTExeVBhcmFtcywgQ2FsZW5kYXJBMTF5IH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhcic7XHJcbiAqIGltcG9ydCB7IGZvcm1hdERhdGUsIEkxOG5QbHVyYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuICogaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKlxyXG4gKiAvLyBhZGRpbmcgeW91ciBvd24gYTExeSBwYXJhbXNcclxuICogZXhwb3J0IGludGVyZmFjZSBDdXN0b21BMTF5UGFyYW1zIGV4dGVuZHMgQTExeVBhcmFtcyB7XHJcbiAqICAgaXNEclN1ZXNzPzogYm9vbGVhbjtcclxuICogfVxyXG4gKlxyXG4gKiBASW5qZWN0YWJsZSgpXHJcbiAqIGV4cG9ydCBjbGFzcyBDdXN0b21DYWxlbmRhckExMXkgZXh0ZW5kcyBDYWxlbmRhckExMXkge1xyXG4gKiAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBpMThuUGx1cmFsOiBJMThuUGx1cmFsUGlwZSkge1xyXG4gKiAgICAgc3VwZXIoaTE4blBsdXJhbCk7XHJcbiAqICAgfVxyXG4gKlxyXG4gKiAgIC8vIG92ZXJyaWRpbmcgYSBmdW5jdGlvblxyXG4gKiAgIHB1YmxpYyBvcGVuRGF5RXZlbnRzTGFuZG1hcmsoeyBkYXRlLCBsb2NhbGUsIGlzRHJTdWVzcyB9OiBDdXN0b21BMTF5UGFyYW1zKTogc3RyaW5nIHtcclxuICogICAgIGlmIChpc0RyU3Vlc3MpIHtcclxuICogICAgICAgcmV0dXJuIGBcclxuICogICAgICAgICAke2Zvcm1hdERhdGUoZGF0ZSwgJ0VFRUUgTU1NTSBkJywgbG9jYWxlKX1cclxuICogICAgICAgICAgVG9kYXkgeW91IGFyZSB5b3UhIFRoYXQgaXMgdHJ1ZXIgdGhhbiB0cnVlISBUaGVyZSBpcyBubyBvbmUgYWxpdmVcclxuICogICAgICAgICAgd2hvIGlzIHlvdS1lciB0aGFuIHlvdSFcclxuICogICAgICAgYDtcclxuICogICAgIH1cclxuICogICB9XHJcbiAqIH1cclxuICpcclxuICogLy8gaW4geW91ciBjb21wb25lbnQgdGhhdCB1c2VzIHRoZSBjYWxlbmRhclxyXG4gKiBwcm92aWRlcnM6IFt7XHJcbiAqICBwcm92aWRlOiBDYWxlbmRhckExMXksXHJcbiAqICB1c2VDbGFzczogQ3VzdG9tQ2FsZW5kYXJBMTF5XHJcbiAqIH1dXHJcbiAqIGBgYFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJBMTF5IHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaTE4blBsdXJhbDogSTE4blBsdXJhbFBpcGUpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFyaWEgbGFiZWwgZm9yIHRoZSBiYWRnZXMvZGF0ZSBvZiBhIGNlbGxcclxuICAgKiBAZXhhbXBsZTogYFNhdHVyZGF5IE9jdG9iZXIgMTkgMSBldmVudCBjbGljayB0byBleHBhbmRgXHJcbiAgICovXHJcbiAgcHVibGljIG1vbnRoQ2VsbCh7IGRheSwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgaWYgKGRheS5iYWRnZVRvdGFsID4gMCkge1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICAgICR7Zm9ybWF0RGF0ZShkYXkuZGF0ZSwgJ0VFRUUgTU1NTSBkJywgbG9jYWxlKX0sXHJcbiAgICAgICAgJHt0aGlzLmkxOG5QbHVyYWwudHJhbnNmb3JtKGRheS5iYWRnZVRvdGFsLCB7XHJcbiAgICAgICAgICAnPTAnOiAnTm8gZXZlbnRzJyxcclxuICAgICAgICAgICc9MSc6ICdPbmUgZXZlbnQnLFxyXG4gICAgICAgICAgb3RoZXI6ICcjIGV2ZW50cydcclxuICAgICAgICB9KX0sXHJcbiAgICAgICAgIGNsaWNrIHRvIGV4cGFuZFxyXG4gICAgICBgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGAke2Zvcm1hdERhdGUoZGF5LmRhdGUsICdFRUVFIE1NTU0gZCcsIGxvY2FsZSl9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFyaWEgbGFiZWwgZm9yIHRoZSBvcGVuIGRheSBldmVudHMgc3RhcnQgbGFuZG1hcmtcclxuICAgKiBAZXhhbXBsZTogYFNhdHVyZGF5IE9jdG9iZXIgMTkgZXhwYW5kZWQgdmlld2BcclxuICAgKi9cclxuICBwdWJsaWMgb3BlbkRheUV2ZW50c0xhbmRtYXJrKHsgZGF0ZSwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgQmVnaW5uaW5nIG9mIGV4cGFuZGVkIHZpZXcgZm9yICR7Zm9ybWF0RGF0ZShkYXRlLCAnRUVFRSBNTU1NIGRkJywgbG9jYWxlKX1cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcmlhIGxhYmVsIGZvciBhbGVydCB0aGF0IGEgZGF5IGluIHRoZSBtb250aCB2aWV3IHdhcyBleHBhbmRlZFxyXG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOSBleHBhbmRlZGBcclxuICAgKi9cclxuICBwdWJsaWMgb3BlbkRheUV2ZW50c0FsZXJ0KHsgZGF0ZSwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGAke2Zvcm1hdERhdGUoZGF0ZSwgJ0VFRUUgTU1NTSBkZCcsIGxvY2FsZSl9IGV4cGFuZGVkYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc2NyaXB0aXZlIGFyaWEgbGFiZWwgZm9yIGFuIGV2ZW50XHJcbiAgICogQGV4YW1wbGU6IGBTYXR1cmRheSBPY3RvYmVyIDE5dGgsIFNjb3R0J3MgUGl6emEgUGFydHksIGZyb20gMTE6MDBhbSB0byA1OjAwcG1gXHJcbiAgICovXHJcbiAgcHVibGljIGV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgaWYgKGV2ZW50LmFsbERheSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hbGxEYXlFdmVudERlc2NyaXB0aW9uKHsgZXZlbnQsIGxvY2FsZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcmlhID0gYFxyXG4gICAgICAke2Zvcm1hdERhdGUoZXZlbnQuc3RhcnQsICdFRUVFIE1NTU0gZGQnLCBsb2NhbGUpfSxcclxuICAgICAgJHtldmVudC50aXRsZX0sIGZyb20gJHtmb3JtYXREYXRlKGV2ZW50LnN0YXJ0LCAnaGg6bW0gYScsIGxvY2FsZSl9XHJcbiAgICBgO1xyXG4gICAgaWYgKGV2ZW50LmVuZCkge1xyXG4gICAgICByZXR1cm4gYXJpYSArIGAgdG8gJHtmb3JtYXREYXRlKGV2ZW50LmVuZCwgJ2hoOm1tIGEnLCBsb2NhbGUpfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJpYTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc2NyaXB0aXZlIGFyaWEgbGFiZWwgZm9yIGFuIGFsbCBkYXkgZXZlbnRcclxuICAgKiBAZXhhbXBsZTpcclxuICAgKiBgU2NvdHQncyBQYXJ0eSwgZXZlbnQgc3BhbnMgbXVsdGlwbGUgZGF5czogc3RhcnQgdGltZSBPY3RvYmVyIDE5IDU6MDBwbSwgbm8gc3RvcCB0aW1lYFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhbGxEYXlFdmVudERlc2NyaXB0aW9uKHsgZXZlbnQsIGxvY2FsZSB9OiBBMTF5UGFyYW1zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGFyaWEgPSBgXHJcbiAgICAgICR7ZXZlbnQudGl0bGV9LCBldmVudCBzcGFucyBtdWx0aXBsZSBkYXlzOlxyXG4gICAgICBzdGFydCB0aW1lICR7Zm9ybWF0RGF0ZShldmVudC5zdGFydCwgJ01NTU0gZGQgaGg6bW0gYScsIGxvY2FsZSl9XHJcbiAgICBgO1xyXG4gICAgaWYgKGV2ZW50LmVuZCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIGFyaWEgKyBgLCBzdG9wIHRpbWUgJHtmb3JtYXREYXRlKGV2ZW50LmVuZCwgJ01NTU0gZCBoaDptbSBhJywgbG9jYWxlKX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJpYSArIGAsIG5vIHN0b3AgdGltZWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcmlhIGxhYmVsIGZvciB0aGUgY2FsZW5kYXIgZXZlbnQgYWN0aW9ucyBpY29uc1xyXG4gICAqIEByZXR1cm5zICdFZGl0JyBmb3IgZmEtcGVuY2lsIGljb25zLCBhbmQgJ0RlbGV0ZScgZm9yIGZhLXRpbWVzIGljb25zXHJcbiAgICovXHJcbiAgcHVibGljIGFjdGlvbkJ1dHRvbkxhYmVsKHsgYWN0aW9uIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGFjdGlvbi5hMTF5TGFiZWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUYWIgaW5kZXggdG8gYmUgZ2l2ZW4gdG8gbW9udGggY2VsbHNcclxuICAgKi9cclxuICBwdWJsaWMgbW9udGhDZWxsVGFiSW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnRzIGluc2lkZSB0aGUgbW9udGggY2VsbCBzaG91bGQgYmUgYXJpYS1oaWRkZW5cclxuICAgKi9cclxuICBwdWJsaWMgaGlkZU1vbnRoQ2VsbEV2ZW50cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBldmVudCB0aXRsZXMgc2hvdWxkIGJlIGFyaWEtaGlkZGVuIChnbG9iYWwpXHJcbiAgICovXHJcbiAgcHVibGljIGhpZGVFdmVudFRpdGxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGhvdXIgc2VnbWVudHMgaW4gdGhlIHdlZWsgdmlldyBzaG91bGQgYmUgYXJpYS1oaWRkZW5cclxuICAgKi9cclxuICBwdWJsaWMgaGlkZVdlZWtIb3VyU2VnbWVudCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBob3VyIHNlZ21lbnRzIGluIHRoZSBkYXkgdmlldyBzaG91bGQgYmUgYXJpYS1oaWRkZW5cclxuICAgKi9cclxuICBwdWJsaWMgaGlkZURheUhvdXJTZWdtZW50KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==