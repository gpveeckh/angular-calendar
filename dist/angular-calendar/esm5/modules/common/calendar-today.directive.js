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
var CalendarTodayDirective = /** @class */ (function () {
    function CalendarTodayDirective(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    CalendarTodayDirective.prototype.onClick = function () {
        this.viewDateChange.emit(this.dateAdapter.startOfDay(new Date()));
    };
    CalendarTodayDirective.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
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
    return CalendarTodayDirective;
}());
export { CalendarTodayDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9kYXkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXRvZGF5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9EOzs7Ozs7Ozs7O0dBVUc7QUFJSDtJQVdFLGdDQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUw1Qzs7V0FFRztRQUNPLG1CQUFjLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFbkIsQ0FBQztJQUVoRDs7T0FFRztJQUVILHdDQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDOztnQkFSZ0MsV0FBVzs7SUFQbkM7UUFBUixLQUFLLEVBQUU7MENBQVcsSUFBSTs0REFBQztJQUtkO1FBQVQsTUFBTSxFQUFFOzBDQUFpQixZQUFZO2tFQUE0QjtJQVFsRTtRQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7eURBR3JCO0lBbkJVLHNCQUFzQjtRQUhsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1NBQy9CLENBQUM7aURBWWlDLFdBQVc7T0FYakMsc0JBQXNCLENBb0JsQztJQUFELDZCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSB2aWV3IGRhdGUgdG8gdGhlIGN1cnJlbnQgZGF5LiBGb3IgZXhhbXBsZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiA8YnV0dG9uXHJcbiAqICBtd2xDYWxlbmRhclRvZGF5XHJcbiAqICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiPlxyXG4gKiAgVG9kYXlcclxuICogPC9idXR0b24+XHJcbiAqIGBgYFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJUb2RheV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclRvZGF5RGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHZpZXdEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQodGhpcy5kYXRlQWRhcHRlci5zdGFydE9mRGF5KG5ldyBEYXRlKCkpKTtcclxuICB9XHJcbn1cclxuIl19