import * as tslib_1 from "tslib";
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * Change the view date to the current day. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate">
 *  Today
 * </button>
 * ```
 */
let CalendarTodayDirective = class CalendarTodayDirective {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    onClick() {
        this.viewDateChange.emit(this.dateAdapter.startOfDay(new Date()));
    }
};
CalendarTodayDirective.ctorParameters = () => [
    { type: DateAdapter }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Date)
], CalendarTodayDirective.prototype, "viewDate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], CalendarTodayDirective.prototype, "viewDateChange", void 0);
tslib_1.__decorate([
    HostListener('click'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CalendarTodayDirective.prototype, "onClick", null);
CalendarTodayDirective = tslib_1.__decorate([
    Directive({
        selector: '[mwlCalendarToday]'
    }),
    tslib_1.__metadata("design:paramtypes", [DateAdapter])
], CalendarTodayDirective);
export { CalendarTodayDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9kYXkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXRvZGF5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9EOzs7Ozs7Ozs7O0dBVUc7QUFJSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQVdqQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUw1Qzs7V0FFRztRQUNPLG1CQUFjLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkIsQ0FBQztJQUVoRDs7T0FFRztJQUVILE9BQU87UUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0YsQ0FBQTs7WUFUa0MsV0FBVzs7QUFQbkM7SUFBUixLQUFLLEVBQUU7c0NBQVcsSUFBSTt3REFBQztBQUtkO0lBQVQsTUFBTSxFQUFFO3NDQUFpQixZQUFZOzhEQUE0QjtBQVFsRTtJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7cURBR3JCO0FBbkJVLHNCQUFzQjtJQUhsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO0tBQy9CLENBQUM7NkNBWWlDLFdBQVc7R0FYakMsc0JBQXNCLENBb0JsQztTQXBCWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgdGhlIHZpZXcgZGF0ZSB0byB0aGUgY3VycmVudCBkYXkuIEZvciBleGFtcGxlOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIDxidXR0b25cclxuICogIG13bENhbGVuZGFyVG9kYXlcclxuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCI+XHJcbiAqICBUb2RheVxyXG4gKiA8L2J1dHRvbj5cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclRvZGF5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9kYXlEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdCh0aGlzLmRhdGVBZGFwdGVyLnN0YXJ0T2ZEYXkobmV3IERhdGUoKSkpO1xyXG4gIH1cclxufVxyXG4iXX0=