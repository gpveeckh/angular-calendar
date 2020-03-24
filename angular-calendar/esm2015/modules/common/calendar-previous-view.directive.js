import * as tslib_1 from "tslib";
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { CalendarView } from './calendar-view.enum';
import { addDaysWithExclusions } from './util';
/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Previous
 * </button>
 * ```
 */
let CalendarPreviousViewDirective = class CalendarPreviousViewDirective {
    constructor(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * Days to skip when going back by 1 day
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
        const subFn = {
            day: this.dateAdapter.subDays,
            week: this.dateAdapter.subWeeks,
            month: this.dateAdapter.subMonths
        }[this.view];
        if (this.view === CalendarView.Day) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -1, this.excludeDays));
        }
        else if (this.view === CalendarView.Week && this.daysInWeek) {
            this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -this.daysInWeek, this.excludeDays));
        }
        else {
            this.viewDateChange.emit(subFn(this.viewDate, 1));
        }
    }
};
CalendarPreviousViewDirective.ctorParameters = () => [
    { type: DateAdapter }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CalendarPreviousViewDirective.prototype, "view", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Date)
], CalendarPreviousViewDirective.prototype, "viewDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarPreviousViewDirective.prototype, "excludeDays", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarPreviousViewDirective.prototype, "daysInWeek", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], CalendarPreviousViewDirective.prototype, "viewDateChange", void 0);
tslib_1.__decorate([
    HostListener('click'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CalendarPreviousViewDirective.prototype, "onClick", null);
CalendarPreviousViewDirective = tslib_1.__decorate([
    Directive({
        selector: '[mwlCalendarPreviousView]'
    }),
    tslib_1.__metadata("design:paramtypes", [DateAdapter])
], CalendarPreviousViewDirective);
export { CalendarPreviousViewDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRS9DOzs7Ozs7Ozs7OztHQVdHO0FBSUgsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBNkI7SUEwQnhDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBZjVDOztXQUVHO1FBQ00sZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFPcEM7O1dBRUc7UUFDTyxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5CLENBQUM7SUFFaEQ7O09BRUc7SUFFSCxPQUFPO1FBQ0wsTUFBTSxLQUFLLEdBQVE7WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1lBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVM7U0FDbEMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIscUJBQXFCLENBQ25CLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQ2IsQ0FBQyxDQUFDLEVBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FDRixDQUFDO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixxQkFBcUIsQ0FDbkIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFDYixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ2hCLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQ0YsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBbkNrQyxXQUFXOztBQXRCbkM7SUFBUixLQUFLLEVBQUU7OzJEQUErQztBQUs5QztJQUFSLEtBQUssRUFBRTtzQ0FBVyxJQUFJOytEQUFDO0FBS2Y7SUFBUixLQUFLLEVBQUU7O2tFQUE0QjtBQUszQjtJQUFSLEtBQUssRUFBRTs7aUVBQW9CO0FBS2xCO0lBQVQsTUFBTSxFQUFFO3NDQUFpQixZQUFZO3FFQUE0QjtBQVFsRTtJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7NERBNkJyQjtBQTVEVSw2QkFBNkI7SUFIekMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDJCQUEyQjtLQUN0QyxDQUFDOzZDQTJCaUMsV0FBVztHQTFCakMsNkJBQTZCLENBNkR6QztTQTdEWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJWaWV3IH0gZnJvbSAnLi9jYWxlbmRhci12aWV3LmVudW0nO1xyXG5pbXBvcnQgeyBhZGREYXlzV2l0aEV4Y2x1c2lvbnMgfSBmcm9tICcuL3V0aWwnO1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgdmlldyBkYXRlIHRvIHRoZSBwcmV2aW91cyB2aWV3LiBGb3IgZXhhbXBsZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiA8YnV0dG9uXHJcbiAqICBtd2xDYWxlbmRhclByZXZpb3VzVmlld1xyXG4gKiAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxyXG4gKiAgW3ZpZXddPVwidmlld1wiPlxyXG4gKiAgUHJldmlvdXNcclxuICogPC9idXR0b24+XHJcbiAqIGBgYFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJQcmV2aW91c1ZpZXddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSB2aWV3OiBDYWxlbmRhclZpZXcgfCAnbW9udGgnIHwgJ3dlZWsnIHwgJ2RheSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBEYXlzIHRvIHNraXAgd2hlbiBnb2luZyBiYWNrIGJ5IDEgZGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHdlZWsuIElmIHNldCB3aWxsIHN1YnRyYWN0IHRoaXMgYW1vdW50IG9mIGRheXMgaW5zdGVhZCBvZiAxIHdlZWtcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aWV3IGRhdGUgaXMgY2hhbmdlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcikge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3ViRm46IGFueSA9IHtcclxuICAgICAgZGF5OiB0aGlzLmRhdGVBZGFwdGVyLnN1YkRheXMsXHJcbiAgICAgIHdlZWs6IHRoaXMuZGF0ZUFkYXB0ZXIuc3ViV2Vla3MsXHJcbiAgICAgIG1vbnRoOiB0aGlzLmRhdGVBZGFwdGVyLnN1Yk1vbnRoc1xyXG4gICAgfVt0aGlzLnZpZXddO1xyXG5cclxuICAgIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5EYXkpIHtcclxuICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxyXG4gICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcclxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICAgICAgLTEsXHJcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXcgPT09IENhbGVuZGFyVmlldy5XZWVrICYmIHRoaXMuZGF5c0luV2Vlaykge1xyXG4gICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoXHJcbiAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxyXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICAgIHRoaXMudmlld0RhdGUsXHJcbiAgICAgICAgICAtdGhpcy5kYXlzSW5XZWVrLFxyXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChzdWJGbih0aGlzLnZpZXdEYXRlLCAxKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==