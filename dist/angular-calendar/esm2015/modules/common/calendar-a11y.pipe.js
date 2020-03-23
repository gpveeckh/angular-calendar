import * as tslib_1 from "tslib";
import { Pipe, LOCALE_ID, Inject } from '@angular/core';
import { CalendarA11y } from './calendar-a11y.provider';
/**
 * This pipe is primarily for rendering aria labels. Example usage:
 * ```typescript
 * // where `myEvent` is a `CalendarEvent` and myLocale is a locale identifier
 * {{ { event: myEvent, locale: myLocale } | calendarA11y: 'eventDescription' }}
 * ```
 */
let CalendarA11yPipe = class CalendarA11yPipe {
    constructor(calendarA11y, locale) {
        this.calendarA11y = calendarA11y;
        this.locale = locale;
    }
    transform(a11yParams, method) {
        a11yParams.locale = a11yParams.locale || this.locale;
        if (typeof this.calendarA11y[method] === 'undefined') {
            const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarA11y.prototype)).filter(iMethod => iMethod !== 'constructor');
            throw new Error(`${method} is not a valid a11y method. Can only be one of ${allowedMethods.join(', ')}`);
        }
        return this.calendarA11y[method](a11yParams);
    }
};
CalendarA11yPipe.ctorParameters = () => [
    { type: CalendarA11y },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarA11yPipe = tslib_1.__decorate([
    Pipe({
        name: 'calendarA11y'
    }),
    tslib_1.__param(1, Inject(LOCALE_ID)),
    tslib_1.__metadata("design:paramtypes", [CalendarA11y, String])
], CalendarA11yPipe);
export { CalendarA11yPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYTExeS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWExMXkucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHeEQ7Ozs7OztHQU1HO0FBSUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFDM0IsWUFDVSxZQUEwQixFQUNQLE1BQWM7UUFEakMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDUCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3hDLENBQUM7SUFFSixTQUFTLENBQUMsVUFBc0IsRUFBRSxNQUFjO1FBQzlDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUNwRCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQy9DLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUM5QyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQztZQUMvQyxNQUFNLElBQUksS0FBSyxDQUNiLEdBQUcsTUFBTSxtREFBbUQsY0FBYyxDQUFDLElBQUksQ0FDN0UsSUFBSSxDQUNMLEVBQUUsQ0FDSixDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNGLENBQUE7O1lBbEJ5QixZQUFZO3lDQUNqQyxNQUFNLFNBQUMsU0FBUzs7QUFIUixnQkFBZ0I7SUFINUIsSUFBSSxDQUFDO1FBQ0osSUFBSSxFQUFFLGNBQWM7S0FDckIsQ0FBQztJQUlHLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FESSxZQUFZO0dBRnpCLGdCQUFnQixDQW9CNUI7U0FwQlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSwgTE9DQUxFX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJBMTF5IH0gZnJvbSAnLi9jYWxlbmRhci1hMTF5LnByb3ZpZGVyJztcclxuaW1wb3J0IHsgQTExeVBhcmFtcyB9IGZyb20gJy4vY2FsZW5kYXItYTExeS5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgcGlwZSBpcyBwcmltYXJpbHkgZm9yIHJlbmRlcmluZyBhcmlhIGxhYmVscy4gRXhhbXBsZSB1c2FnZTpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiAvLyB3aGVyZSBgbXlFdmVudGAgaXMgYSBgQ2FsZW5kYXJFdmVudGAgYW5kIG15TG9jYWxlIGlzIGEgbG9jYWxlIGlkZW50aWZpZXJcclxuICoge3sgeyBldmVudDogbXlFdmVudCwgbG9jYWxlOiBteUxvY2FsZSB9IHwgY2FsZW5kYXJBMTF5OiAnZXZlbnREZXNjcmlwdGlvbicgfX1cclxuICogYGBgXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ2NhbGVuZGFyQTExeSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQTExeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FsZW5kYXJBMTF5OiBDYWxlbmRhckExMXksXHJcbiAgICBASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZ1xyXG4gICkge31cclxuXHJcbiAgdHJhbnNmb3JtKGExMXlQYXJhbXM6IEExMXlQYXJhbXMsIG1ldGhvZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGExMXlQYXJhbXMubG9jYWxlID0gYTExeVBhcmFtcy5sb2NhbGUgfHwgdGhpcy5sb2NhbGU7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuY2FsZW5kYXJBMTF5W21ldGhvZF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGFsbG93ZWRNZXRob2RzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoXHJcbiAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKENhbGVuZGFyQTExeS5wcm90b3R5cGUpXHJcbiAgICAgICkuZmlsdGVyKGlNZXRob2QgPT4gaU1ldGhvZCAhPT0gJ2NvbnN0cnVjdG9yJyk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgJHttZXRob2R9IGlzIG5vdCBhIHZhbGlkIGExMXkgbWV0aG9kLiBDYW4gb25seSBiZSBvbmUgb2YgJHthbGxvd2VkTWV0aG9kcy5qb2luKFxyXG4gICAgICAgICAgJywgJ1xyXG4gICAgICAgICl9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY2FsZW5kYXJBMTF5W21ldGhvZF0oYTExeVBhcmFtcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==