import * as tslib_1 from "tslib";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { CalendarView } from './calendar-view.enum';
import { addDaysWithExclusions } from './util';
/**
 * Change the view date to the next view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarNextView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Next
 * </button>
 * ```
 */
var CalendarNextViewDirective = /** @class */ (function () {
    function CalendarNextViewDirective(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Days to skip when going forward by 1 day
         */
        this.excludeDays = [];
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    /**
     * @hidden
     */
    CalendarNextViewDirective.prototype.onClick = function () {
        var addFn = {
            day: this.dateAdapter.addDays,
            week: this.dateAdapter.addWeeks,
            month: this.dateAdapter.addMonths
        }[this.view];
        if (this.view === CalendarView.Day) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 1, this.excludeDays));
        }
        else if (this.view === CalendarView.Week && this.daysInWeek) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, this.daysInWeek, this.excludeDays));
        }
        else {
            this.viewDateChange.emit(addFn(this.viewDate, 1));
        }
    };
    CalendarNextViewDirective.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarNextViewDirective.prototype, "view", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], CalendarNextViewDirective.prototype, "viewDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CalendarNextViewDirective.prototype, "excludeDays", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarNextViewDirective.prototype, "daysInWeek", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CalendarNextViewDirective.prototype, "viewDateChange", void 0);
    tslib_1.__decorate([
        HostListener('click'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CalendarNextViewDirective.prototype, "onClick", null);
    CalendarNextViewDirective = tslib_1.__decorate([
        Directive({
            selector: '[mwlCalendarNextView]'
        }),
        tslib_1.__metadata("design:paramtypes", [DateAdapter])
    ], CalendarNextViewDirective);
    return CalendarNextViewDirective;
}());
export { CalendarNextViewDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbmV4dC12aWV3LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1uZXh0LXZpZXcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7R0FXRztBQUlIO0lBMEJFLG1DQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWY1Qzs7V0FFRztRQUNNLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBT3BDOztXQUVHO1FBQ08sbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRWhEOztPQUVHO0lBRUgsMkNBQU8sR0FBUDtRQUNFLElBQU0sS0FBSyxHQUFRO1lBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtZQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTO1NBQ2xDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLHFCQUFxQixDQUNuQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsUUFBUSxFQUNiLENBQUMsRUFDRCxJQUFJLENBQUMsV0FBVyxDQUNqQixDQUNGLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLHFCQUFxQixDQUNuQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDOztnQkFsQ2dDLFdBQVc7O0lBdEJuQztRQUFSLEtBQUssRUFBRTs7MkRBQStDO0lBSzlDO1FBQVIsS0FBSyxFQUFFOzBDQUFXLElBQUk7K0RBQUM7SUFLZjtRQUFSLEtBQUssRUFBRTs7a0VBQTRCO0lBSzNCO1FBQVIsS0FBSyxFQUFFOztpRUFBb0I7SUFLbEI7UUFBVCxNQUFNLEVBQUU7MENBQWlCLFlBQVk7cUVBQTRCO0lBUWxFO1FBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7Ozs0REE2QnJCO0lBNURVLHlCQUF5QjtRQUhyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1NBQ2xDLENBQUM7aURBMkJpQyxXQUFXO09BMUJqQyx5QkFBeUIsQ0E2RHJDO0lBQUQsZ0NBQUM7Q0FBQSxBQTdERCxJQTZEQztTQTdEWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJWaWV3IH0gZnJvbSAnLi9jYWxlbmRhci12aWV3LmVudW0nO1xyXG5pbXBvcnQgeyBhZGREYXlzV2l0aEV4Y2x1c2lvbnMgfSBmcm9tICcuL3V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgdmlldyBkYXRlIHRvIHRoZSBuZXh0IHZpZXcuIEZvciBleGFtcGxlOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIDxidXR0b25cclxuICogIG13bENhbGVuZGFyTmV4dFZpZXdcclxuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcclxuICogIFt2aWV3XT1cInZpZXdcIj5cclxuICogIE5leHRcclxuICogPC9idXR0b24+XHJcbiAqIGBgYFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJOZXh0Vmlld10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck5leHRWaWV3RGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlldzogQ2FsZW5kYXJWaWV3IHwgJ21vbnRoJyB8ICd3ZWVrJyB8ICdkYXknO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF5cyB0byBza2lwIHdoZW4gZ29pbmcgZm9yd2FyZCBieSAxIGRheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBJZiBzZXQgd2lsbCBhZGQgdGhpcyBhbW91bnQgb2YgZGF5cyBpbnN0ZWFkIG9mIDEgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHZpZXdEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICBjb25zdCBhZGRGbjogYW55ID0ge1xyXG4gICAgICBkYXk6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkRGF5cyxcclxuICAgICAgd2VlazogdGhpcy5kYXRlQWRhcHRlci5hZGRXZWVrcyxcclxuICAgICAgbW9udGg6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTW9udGhzXHJcbiAgICB9W3RoaXMudmlld107XHJcblxyXG4gICAgaWYgKHRoaXMudmlldyA9PT0gQ2FsZW5kYXJWaWV3LkRheSkge1xyXG4gICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXHJcbiAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxyXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICAgIHRoaXMudmlld0RhdGUsXHJcbiAgICAgICAgICAxLFxyXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuV2VlayAmJiB0aGlzLmRheXNJbldlZWspIHtcclxuICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxyXG4gICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcclxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICAgICAgdGhpcy5kYXlzSW5XZWVrLFxyXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChhZGRGbih0aGlzLnZpZXdEYXRlLCAxKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==