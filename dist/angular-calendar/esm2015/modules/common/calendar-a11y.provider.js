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
let CalendarA11y = class CalendarA11y {
    constructor(i18nPlural) {
        this.i18nPlural = i18nPlural;
    }
    /**
     * Aria label for the badges/date of a cell
     * @example: `Saturday October 19 1 event click to expand`
     */
    monthCell({ day, locale }) {
        if (day.badgeTotal > 0) {
            return `
        ${formatDate(day.date, 'EEEE MMMM d', locale)},
        ${this.i18nPlural.transform(day.badgeTotal, {
                '=0': 'No events',
                '=1': 'One event',
                other: '# events'
            })},
         click to expand
      `;
        }
        else {
            return `${formatDate(day.date, 'EEEE MMMM d', locale)}`;
        }
    }
    /**
     * Aria label for the open day events start landmark
     * @example: `Saturday October 19 expanded view`
     */
    openDayEventsLandmark({ date, locale }) {
        return `
      Beginning of expanded view for ${formatDate(date, 'EEEE MMMM dd', locale)}
    `;
    }
    /**
     * Aria label for alert that a day in the month view was expanded
     * @example: `Saturday October 19 expanded`
     */
    openDayEventsAlert({ date, locale }) {
        return `${formatDate(date, 'EEEE MMMM dd', locale)} expanded`;
    }
    /**
     * Descriptive aria label for an event
     * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
     */
    eventDescription({ event, locale }) {
        if (event.allDay === true) {
            return this.allDayEventDescription({ event, locale });
        }
        const aria = `
      ${formatDate(event.start, 'EEEE MMMM dd', locale)},
      ${event.title}, from ${formatDate(event.start, 'hh:mm a', locale)}
    `;
        if (event.end) {
            return aria + ` to ${formatDate(event.end, 'hh:mm a', locale)}`;
        }
        return aria;
    }
    /**
     * Descriptive aria label for an all day event
     * @example:
     * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
     */
    allDayEventDescription({ event, locale }) {
        const aria = `
      ${event.title}, event spans multiple days:
      start time ${formatDate(event.start, 'MMMM dd hh:mm a', locale)}
    `;
        if (event.end) {
            return (aria + `, stop time ${formatDate(event.end, 'MMMM d hh:mm a', locale)}`);
        }
        return aria + `, no stop time`;
    }
    /**
     * Aria label for the calendar event actions icons
     * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
     */
    actionButtonLabel({ action }) {
        return action.a11yLabel;
    }
    /**
     * @returns {number} Tab index to be given to month cells
     */
    monthCellTabIndex() {
        return 0;
    }
    /**
     * @returns true if the events inside the month cell should be aria-hidden
     */
    hideMonthCellEvents() {
        return true;
    }
    /**
     * @returns true if event titles should be aria-hidden (global)
     */
    hideEventTitle() {
        return true;
    }
    /**
     * @returns true if hour segments in the week view should be aria-hidden
     */
    hideWeekHourSegment() {
        return true;
    }
    /**
     * @returns true if hour segments in the day view should be aria-hidden
     */
    hideDayHourSegment() {
        return true;
    }
};
CalendarA11y.ctorParameters = () => [
    { type: I18nPluralPipe }
];
CalendarA11y = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [I18nPluralPipe])
], CalendarA11y);
export { CalendarA11y };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1hMTF5LnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDdkIsWUFBc0IsVUFBMEI7UUFBMUIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7SUFBRyxDQUFDO0lBRXBEOzs7T0FHRztJQUNJLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQWM7UUFDMUMsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPO1VBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQztVQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUMxQyxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxVQUFVO2FBQ2xCLENBQUM7O09BRUgsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUJBQXFCLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFjO1FBQ3ZELE9BQU87dUNBQzRCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQztLQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNJLGtCQUFrQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBYztRQUNwRCxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFjO1FBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN2RDtRQUVELE1BQU0sSUFBSSxHQUFHO1FBQ1QsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQztRQUMvQyxLQUFLLENBQUMsS0FBSyxVQUFVLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7S0FDbEUsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sSUFBSSxHQUFHLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDakU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksc0JBQXNCLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFjO1FBQ3pELE1BQU0sSUFBSSxHQUFHO1FBQ1QsS0FBSyxDQUFDLEtBQUs7bUJBQ0EsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDO0tBQ2hFLENBQUM7UUFDRixJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLENBQ0wsSUFBSSxHQUFHLGVBQWUsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FDeEUsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGlCQUFpQixDQUFDLEVBQUUsTUFBTSxFQUFjO1FBQzdDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQkFBaUI7UUFDdEIsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxjQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0JBQWtCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7O1lBdkhtQyxjQUFjOztBQURyQyxZQUFZO0lBRHhCLFVBQVUsRUFBRTs2Q0FFdUIsY0FBYztHQURyQyxZQUFZLENBd0h4QjtTQXhIWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmb3JtYXREYXRlLCBJMThuUGx1cmFsUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEExMXlQYXJhbXMgfSBmcm9tICcuL2NhbGVuZGFyLWExMXkuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBhZGRpbmcgYWNjZXNzaWJpbGl0eSB0byB0aGUgY2FsZW5kYXIuXHJcbiAqIFlvdSBtYXkgb3ZlcnJpZGUgYW55IG9mIGl0cyBtZXRob2RzIHZpYSBhbmd1bGFycyBESSB0byBzdWl0IHlvdXIgcmVxdWlyZW1lbnRzLlxyXG4gKiBGb3IgZXhhbXBsZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBBMTF5UGFyYW1zLCBDYWxlbmRhckExMXkgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcclxuICogaW1wb3J0IHsgZm9ybWF0RGF0ZSwgSTE4blBsdXJhbFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG4gKiBpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqXHJcbiAqIC8vIGFkZGluZyB5b3VyIG93biBhMTF5IHBhcmFtc1xyXG4gKiBleHBvcnQgaW50ZXJmYWNlIEN1c3RvbUExMXlQYXJhbXMgZXh0ZW5kcyBBMTF5UGFyYW1zIHtcclxuICogICBpc0RyU3Vlc3M/OiBib29sZWFuO1xyXG4gKiB9XHJcbiAqXHJcbiAqIEBJbmplY3RhYmxlKClcclxuICogZXhwb3J0IGNsYXNzIEN1c3RvbUNhbGVuZGFyQTExeSBleHRlbmRzIENhbGVuZGFyQTExeSB7XHJcbiAqICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGkxOG5QbHVyYWw6IEkxOG5QbHVyYWxQaXBlKSB7XHJcbiAqICAgICBzdXBlcihpMThuUGx1cmFsKTtcclxuICogICB9XHJcbiAqXHJcbiAqICAgLy8gb3ZlcnJpZGluZyBhIGZ1bmN0aW9uXHJcbiAqICAgcHVibGljIG9wZW5EYXlFdmVudHNMYW5kbWFyayh7IGRhdGUsIGxvY2FsZSwgaXNEclN1ZXNzIH06IEN1c3RvbUExMXlQYXJhbXMpOiBzdHJpbmcge1xyXG4gKiAgICAgaWYgKGlzRHJTdWVzcykge1xyXG4gKiAgICAgICByZXR1cm4gYFxyXG4gKiAgICAgICAgICR7Zm9ybWF0RGF0ZShkYXRlLCAnRUVFRSBNTU1NIGQnLCBsb2NhbGUpfVxyXG4gKiAgICAgICAgICBUb2RheSB5b3UgYXJlIHlvdSEgVGhhdCBpcyB0cnVlciB0aGFuIHRydWUhIFRoZXJlIGlzIG5vIG9uZSBhbGl2ZVxyXG4gKiAgICAgICAgICB3aG8gaXMgeW91LWVyIHRoYW4geW91IVxyXG4gKiAgICAgICBgO1xyXG4gKiAgICAgfVxyXG4gKiAgIH1cclxuICogfVxyXG4gKlxyXG4gKiAvLyBpbiB5b3VyIGNvbXBvbmVudCB0aGF0IHVzZXMgdGhlIGNhbGVuZGFyXHJcbiAqIHByb3ZpZGVyczogW3tcclxuICogIHByb3ZpZGU6IENhbGVuZGFyQTExeSxcclxuICogIHVzZUNsYXNzOiBDdXN0b21DYWxlbmRhckExMXlcclxuICogfV1cclxuICogYGBgXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckExMXkge1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBpMThuUGx1cmFsOiBJMThuUGx1cmFsUGlwZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQXJpYSBsYWJlbCBmb3IgdGhlIGJhZGdlcy9kYXRlIG9mIGEgY2VsbFxyXG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOSAxIGV2ZW50IGNsaWNrIHRvIGV4cGFuZGBcclxuICAgKi9cclxuICBwdWJsaWMgbW9udGhDZWxsKHsgZGF5LCBsb2NhbGUgfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICBpZiAoZGF5LmJhZGdlVG90YWwgPiAwKSB7XHJcbiAgICAgIHJldHVybiBgXHJcbiAgICAgICAgJHtmb3JtYXREYXRlKGRheS5kYXRlLCAnRUVFRSBNTU1NIGQnLCBsb2NhbGUpfSxcclxuICAgICAgICAke3RoaXMuaTE4blBsdXJhbC50cmFuc2Zvcm0oZGF5LmJhZGdlVG90YWwsIHtcclxuICAgICAgICAgICc9MCc6ICdObyBldmVudHMnLFxyXG4gICAgICAgICAgJz0xJzogJ09uZSBldmVudCcsXHJcbiAgICAgICAgICBvdGhlcjogJyMgZXZlbnRzJ1xyXG4gICAgICAgIH0pfSxcclxuICAgICAgICAgY2xpY2sgdG8gZXhwYW5kXHJcbiAgICAgIGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYCR7Zm9ybWF0RGF0ZShkYXkuZGF0ZSwgJ0VFRUUgTU1NTSBkJywgbG9jYWxlKX1gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXJpYSBsYWJlbCBmb3IgdGhlIG9wZW4gZGF5IGV2ZW50cyBzdGFydCBsYW5kbWFya1xyXG4gICAqIEBleGFtcGxlOiBgU2F0dXJkYXkgT2N0b2JlciAxOSBleHBhbmRlZCB2aWV3YFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvcGVuRGF5RXZlbnRzTGFuZG1hcmsoeyBkYXRlLCBsb2NhbGUgfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICBCZWdpbm5pbmcgb2YgZXhwYW5kZWQgdmlldyBmb3IgJHtmb3JtYXREYXRlKGRhdGUsICdFRUVFIE1NTU0gZGQnLCBsb2NhbGUpfVxyXG4gICAgYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFyaWEgbGFiZWwgZm9yIGFsZXJ0IHRoYXQgYSBkYXkgaW4gdGhlIG1vbnRoIHZpZXcgd2FzIGV4cGFuZGVkXHJcbiAgICogQGV4YW1wbGU6IGBTYXR1cmRheSBPY3RvYmVyIDE5IGV4cGFuZGVkYFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvcGVuRGF5RXZlbnRzQWxlcnQoeyBkYXRlLCBsb2NhbGUgfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7Zm9ybWF0RGF0ZShkYXRlLCAnRUVFRSBNTU1NIGRkJywgbG9jYWxlKX0gZXhwYW5kZWRgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzY3JpcHRpdmUgYXJpYSBsYWJlbCBmb3IgYW4gZXZlbnRcclxuICAgKiBAZXhhbXBsZTogYFNhdHVyZGF5IE9jdG9iZXIgMTl0aCwgU2NvdHQncyBQaXp6YSBQYXJ0eSwgZnJvbSAxMTowMGFtIHRvIDU6MDBwbWBcclxuICAgKi9cclxuICBwdWJsaWMgZXZlbnREZXNjcmlwdGlvbih7IGV2ZW50LCBsb2NhbGUgfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICBpZiAoZXZlbnQuYWxsRGF5ID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFsbERheUV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFyaWEgPSBgXHJcbiAgICAgICR7Zm9ybWF0RGF0ZShldmVudC5zdGFydCwgJ0VFRUUgTU1NTSBkZCcsIGxvY2FsZSl9LFxyXG4gICAgICAke2V2ZW50LnRpdGxlfSwgZnJvbSAke2Zvcm1hdERhdGUoZXZlbnQuc3RhcnQsICdoaDptbSBhJywgbG9jYWxlKX1cclxuICAgIGA7XHJcbiAgICBpZiAoZXZlbnQuZW5kKSB7XHJcbiAgICAgIHJldHVybiBhcmlhICsgYCB0byAke2Zvcm1hdERhdGUoZXZlbnQuZW5kLCAnaGg6bW0gYScsIGxvY2FsZSl9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBhcmlhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzY3JpcHRpdmUgYXJpYSBsYWJlbCBmb3IgYW4gYWxsIGRheSBldmVudFxyXG4gICAqIEBleGFtcGxlOlxyXG4gICAqIGBTY290dCdzIFBhcnR5LCBldmVudCBzcGFucyBtdWx0aXBsZSBkYXlzOiBzdGFydCB0aW1lIE9jdG9iZXIgMTkgNTowMHBtLCBubyBzdG9wIHRpbWVgXHJcbiAgICovXHJcbiAgcHVibGljIGFsbERheUV2ZW50RGVzY3JpcHRpb24oeyBldmVudCwgbG9jYWxlIH06IEExMXlQYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgYXJpYSA9IGBcclxuICAgICAgJHtldmVudC50aXRsZX0sIGV2ZW50IHNwYW5zIG11bHRpcGxlIGRheXM6XHJcbiAgICAgIHN0YXJ0IHRpbWUgJHtmb3JtYXREYXRlKGV2ZW50LnN0YXJ0LCAnTU1NTSBkZCBoaDptbSBhJywgbG9jYWxlKX1cclxuICAgIGA7XHJcbiAgICBpZiAoZXZlbnQuZW5kKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgYXJpYSArIGAsIHN0b3AgdGltZSAke2Zvcm1hdERhdGUoZXZlbnQuZW5kLCAnTU1NTSBkIGhoOm1tIGEnLCBsb2NhbGUpfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcmlhICsgYCwgbm8gc3RvcCB0aW1lYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFyaWEgbGFiZWwgZm9yIHRoZSBjYWxlbmRhciBldmVudCBhY3Rpb25zIGljb25zXHJcbiAgICogQHJldHVybnMgJ0VkaXQnIGZvciBmYS1wZW5jaWwgaWNvbnMsIGFuZCAnRGVsZXRlJyBmb3IgZmEtdGltZXMgaWNvbnNcclxuICAgKi9cclxuICBwdWJsaWMgYWN0aW9uQnV0dG9uTGFiZWwoeyBhY3Rpb24gfTogQTExeVBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYWN0aW9uLmExMXlMYWJlbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRhYiBpbmRleCB0byBiZSBnaXZlbiB0byBtb250aCBjZWxsc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBtb250aENlbGxUYWJJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBldmVudHMgaW5zaWRlIHRoZSBtb250aCBjZWxsIHNob3VsZCBiZSBhcmlhLWhpZGRlblxyXG4gICAqL1xyXG4gIHB1YmxpYyBoaWRlTW9udGhDZWxsRXZlbnRzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGV2ZW50IHRpdGxlcyBzaG91bGQgYmUgYXJpYS1oaWRkZW4gKGdsb2JhbClcclxuICAgKi9cclxuICBwdWJsaWMgaGlkZUV2ZW50VGl0bGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgaG91ciBzZWdtZW50cyBpbiB0aGUgd2VlayB2aWV3IHNob3VsZCBiZSBhcmlhLWhpZGRlblxyXG4gICAqL1xyXG4gIHB1YmxpYyBoaWRlV2Vla0hvdXJTZWdtZW50KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGhvdXIgc2VnbWVudHMgaW4gdGhlIGRheSB2aWV3IHNob3VsZCBiZSBhcmlhLWhpZGRlblxyXG4gICAqL1xyXG4gIHB1YmxpYyBoaWRlRGF5SG91clNlZ21lbnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19