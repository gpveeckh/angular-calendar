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
let CalendarNextViewDirective = class CalendarNextViewDirective {
    constructor(dateAdapter) {
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
    onClick() {
        const addFn = {
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
    }
};
CalendarNextViewDirective.ctorParameters = () => [
    { type: DateAdapter }
];
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
export { CalendarNextViewDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbmV4dC12aWV3LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1uZXh0LXZpZXcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7R0FXRztBQUlILElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBMEJwQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWY1Qzs7V0FFRztRQUNNLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBT3BDOztXQUVHO1FBQ08sbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRWhEOztPQUVHO0lBRUgsT0FBTztRQUNMLE1BQU0sS0FBSyxHQUFRO1lBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtZQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTO1NBQ2xDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLHFCQUFxQixDQUNuQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsUUFBUSxFQUNiLENBQUMsRUFDRCxJQUFJLENBQUMsV0FBVyxDQUNqQixDQUNGLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLHFCQUFxQixDQUNuQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFuQ2tDLFdBQVc7O0FBdEJuQztJQUFSLEtBQUssRUFBRTs7dURBQStDO0FBSzlDO0lBQVIsS0FBSyxFQUFFO3NDQUFXLElBQUk7MkRBQUM7QUFLZjtJQUFSLEtBQUssRUFBRTs7OERBQTRCO0FBSzNCO0lBQVIsS0FBSyxFQUFFOzs2REFBb0I7QUFLbEI7SUFBVCxNQUFNLEVBQUU7c0NBQWlCLFlBQVk7aUVBQTRCO0FBUWxFO0lBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7Ozt3REE2QnJCO0FBNURVLHlCQUF5QjtJQUhyQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsdUJBQXVCO0tBQ2xDLENBQUM7NkNBMkJpQyxXQUFXO0dBMUJqQyx5QkFBeUIsQ0E2RHJDO1NBN0RZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBDYWxlbmRhclZpZXcgfSBmcm9tICcuL2NhbGVuZGFyLXZpZXcuZW51bSc7XHJcbmltcG9ydCB7IGFkZERheXNXaXRoRXhjbHVzaW9ucyB9IGZyb20gJy4vdXRpbCc7XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSB2aWV3IGRhdGUgdG8gdGhlIG5leHQgdmlldy4gRm9yIGV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogPGJ1dHRvblxyXG4gKiAgbXdsQ2FsZW5kYXJOZXh0Vmlld1xyXG4gKiAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxyXG4gKiAgW3ZpZXddPVwidmlld1wiPlxyXG4gKiAgTmV4dFxyXG4gKiA8L2J1dHRvbj5cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhck5leHRWaWV3XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTmV4dFZpZXdEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSB2aWV3OiBDYWxlbmRhclZpZXcgfCAnbW9udGgnIHwgJ3dlZWsnIHwgJ2RheSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBEYXlzIHRvIHNraXAgd2hlbiBnb2luZyBmb3J3YXJkIGJ5IDEgZGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHdlZWsuIElmIHNldCB3aWxsIGFkZCB0aGlzIGFtb3VudCBvZiBkYXlzIGluc3RlYWQgb2YgMSB3ZWVrXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGFkZEZuOiBhbnkgPSB7XHJcbiAgICAgIGRheTogdGhpcy5kYXRlQWRhcHRlci5hZGREYXlzLFxyXG4gICAgICB3ZWVrOiB0aGlzLmRhdGVBZGFwdGVyLmFkZFdlZWtzLFxyXG4gICAgICBtb250aDogdGhpcy5kYXRlQWRhcHRlci5hZGRNb250aHNcclxuICAgIH1bdGhpcy52aWV3XTtcclxuXHJcbiAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuRGF5KSB7XHJcbiAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcclxuICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxyXG4gICAgICAgICAgdGhpcy52aWV3RGF0ZSxcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5XZWVrICYmIHRoaXMuZGF5c0luV2Vlaykge1xyXG4gICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXHJcbiAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxyXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICAgIHRoaXMudmlld0RhdGUsXHJcbiAgICAgICAgICB0aGlzLmRheXNJbldlZWssXHJcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KGFkZEZuKHRoaXMudmlld0RhdGUsIDEpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19