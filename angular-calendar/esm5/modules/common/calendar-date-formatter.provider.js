import * as tslib_1 from "tslib";
import { CalendarAngularDateFormatter } from './calendar-angular-date-formatter.provider';
import { Injectable } from '@angular/core';
/**
 * This class is responsible for all formatting of dates. There are 3 implementations available, the `CalendarAngularDateFormatter` (default) which uses the angular date pipe to format dates, the `CalendarNativeDateFormatter` which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
 *
 * If you wish, you may override any of the defaults via angulars DI. For example:
 *
 * ```typescript
 * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
 * import { formatDate } from '@angular/common';
 * import { Injectable } from '@angular/core';
 *
 * @Injectable()
 * class CustomDateFormatter extends CalendarDateFormatter {
 *
 *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
 *     return formatDate(date, 'EEE', locale); // use short week days
 *   }
 *
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *   provide: CalendarDateFormatter,
 *   useClass: CustomDateFormatter
 * }]
 * ```
 */
var CalendarDateFormatter = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarDateFormatter, _super);
    function CalendarDateFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarDateFormatter = tslib_1.__decorate([
        Injectable()
    ], CalendarDateFormatter);
    return CalendarDateFormatter;
}(CalendarAngularDateFormatter));
export { CalendarDateFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSDtJQUEyQyxpREFBNEI7SUFBdkU7O0lBQXlFLENBQUM7SUFBN0QscUJBQXFCO1FBRGpDLFVBQVUsRUFBRTtPQUNBLHFCQUFxQixDQUF3QztJQUFELDRCQUFDO0NBQUEsQUFBMUUsQ0FBMkMsNEJBQTRCLEdBQUc7U0FBN0QscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBhbGwgZm9ybWF0dGluZyBvZiBkYXRlcy4gVGhlcmUgYXJlIDMgaW1wbGVtZW50YXRpb25zIGF2YWlsYWJsZSwgdGhlIGBDYWxlbmRhckFuZ3VsYXJEYXRlRm9ybWF0dGVyYCAoZGVmYXVsdCkgd2hpY2ggdXNlcyB0aGUgYW5ndWxhciBkYXRlIHBpcGUgdG8gZm9ybWF0IGRhdGVzLCB0aGUgYENhbGVuZGFyTmF0aXZlRGF0ZUZvcm1hdHRlcmAgd2hpY2ggd2lsbCB1c2UgdGhlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SW50bDwvYT4gQVBJIHRvIGZvcm1hdCBkYXRlcywgb3IgdGhlcmUgaXMgdGhlIGBDYWxlbmRhck1vbWVudERhdGVGb3JtYXR0ZXJgIHdoaWNoIHVzZXMgPGEgaHJlZj1cImh0dHA6Ly9tb21lbnRqcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+bW9tZW50PC9hPi5cclxuICpcclxuICogSWYgeW91IHdpc2gsIHlvdSBtYXkgb3ZlcnJpZGUgYW55IG9mIHRoZSBkZWZhdWx0cyB2aWEgYW5ndWxhcnMgREkuIEZvciBleGFtcGxlOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7IENhbGVuZGFyRGF0ZUZvcm1hdHRlciwgRGF0ZUZvcm1hdHRlclBhcmFtcyB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xyXG4gKiBpbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuICogaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKlxyXG4gKiBASW5qZWN0YWJsZSgpXHJcbiAqIGNsYXNzIEN1c3RvbURhdGVGb3JtYXR0ZXIgZXh0ZW5kcyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIge1xyXG4gKlxyXG4gKiAgIHB1YmxpYyBtb250aFZpZXdDb2x1bW5IZWFkZXIoe2RhdGUsIGxvY2FsZX06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xyXG4gKiAgICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgJ0VFRScsIGxvY2FsZSk7IC8vIHVzZSBzaG9ydCB3ZWVrIGRheXNcclxuICogICB9XHJcbiAqXHJcbiAqIH1cclxuICpcclxuICogLy8gaW4geW91ciBjb21wb25lbnQgdGhhdCB1c2VzIHRoZSBjYWxlbmRhclxyXG4gKiBwcm92aWRlcnM6IFt7XHJcbiAqICAgcHJvdmlkZTogQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxyXG4gKiAgIHVzZUNsYXNzOiBDdXN0b21EYXRlRm9ybWF0dGVyXHJcbiAqIH1dXHJcbiAqIGBgYFxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyIGV4dGVuZHMgQ2FsZW5kYXJBbmd1bGFyRGF0ZUZvcm1hdHRlciB7fVxyXG4iXX0=