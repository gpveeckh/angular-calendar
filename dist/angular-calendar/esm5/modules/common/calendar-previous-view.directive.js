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
var CalendarPreviousViewDirective = /** @class */ (function () {
    function CalendarPreviousViewDirective(dateAdapter) {
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
    CalendarPreviousViewDirective.prototype.onClick = function () {
        var subFn = {
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
    };
    CalendarPreviousViewDirective.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
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
    return CalendarPreviousViewDirective;
}());
export { CalendarPreviousViewDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRS9DOzs7Ozs7Ozs7OztHQVdHO0FBSUg7SUEwQkUsdUNBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBZjVDOztXQUVHO1FBQ00sZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFPcEM7O1dBRUc7UUFDTyxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRW5CLENBQUM7SUFFaEQ7O09BRUc7SUFFSCwrQ0FBTyxHQUFQO1FBQ0UsSUFBTSxLQUFLLEdBQVE7WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1lBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVM7U0FDbEMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIscUJBQXFCLENBQ25CLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQ2IsQ0FBQyxDQUFDLEVBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FDRixDQUFDO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixxQkFBcUIsQ0FDbkIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFDYixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ2hCLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQ0YsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7Z0JBbENnQyxXQUFXOztJQXRCbkM7UUFBUixLQUFLLEVBQUU7OytEQUErQztJQUs5QztRQUFSLEtBQUssRUFBRTswQ0FBVyxJQUFJO21FQUFDO0lBS2Y7UUFBUixLQUFLLEVBQUU7O3NFQUE0QjtJQUszQjtRQUFSLEtBQUssRUFBRTs7cUVBQW9CO0lBS2xCO1FBQVQsTUFBTSxFQUFFOzBDQUFpQixZQUFZO3lFQUE0QjtJQVFsRTtRQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7Z0VBNkJyQjtJQTVEVSw2QkFBNkI7UUFIekMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDJCQUEyQjtTQUN0QyxDQUFDO2lEQTJCaUMsV0FBVztPQTFCakMsNkJBQTZCLENBNkR6QztJQUFELG9DQUFDO0NBQUEsQUE3REQsSUE2REM7U0E3RFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7IENhbGVuZGFyVmlldyB9IGZyb20gJy4vY2FsZW5kYXItdmlldy5lbnVtJztcclxuaW1wb3J0IHsgYWRkRGF5c1dpdGhFeGNsdXNpb25zIH0gZnJvbSAnLi91dGlsJztcclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgdGhlIHZpZXcgZGF0ZSB0byB0aGUgcHJldmlvdXMgdmlldy4gRm9yIGV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogPGJ1dHRvblxyXG4gKiAgbXdsQ2FsZW5kYXJQcmV2aW91c1ZpZXdcclxuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcclxuICogIFt2aWV3XT1cInZpZXdcIj5cclxuICogIFByZXZpb3VzXHJcbiAqIDwvYnV0dG9uPlxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW213bENhbGVuZGFyUHJldmlvdXNWaWV3XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlldzogQ2FsZW5kYXJWaWV3IHwgJ21vbnRoJyB8ICd3ZWVrJyB8ICdkYXknO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF5cyB0byBza2lwIHdoZW4gZ29pbmcgYmFjayBieSAxIGRheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBJZiBzZXQgd2lsbCBzdWJ0cmFjdCB0aGlzIGFtb3VudCBvZiBkYXlzIGluc3RlYWQgb2YgMSB3ZWVrXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHN1YkZuOiBhbnkgPSB7XHJcbiAgICAgIGRheTogdGhpcy5kYXRlQWRhcHRlci5zdWJEYXlzLFxyXG4gICAgICB3ZWVrOiB0aGlzLmRhdGVBZGFwdGVyLnN1YldlZWtzLFxyXG4gICAgICBtb250aDogdGhpcy5kYXRlQWRhcHRlci5zdWJNb250aHNcclxuICAgIH1bdGhpcy52aWV3XTtcclxuXHJcbiAgICBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuRGF5KSB7XHJcbiAgICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChcclxuICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxyXG4gICAgICAgICAgdGhpcy52aWV3RGF0ZSxcclxuICAgICAgICAgIC0xLFxyXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3ID09PSBDYWxlbmRhclZpZXcuV2VlayAmJiB0aGlzLmRheXNJbldlZWspIHtcclxuICAgICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KFxyXG4gICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcclxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgICB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICAgICAgLXRoaXMuZGF5c0luV2VlayxcclxuICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoc3ViRm4odGhpcy52aWV3RGF0ZSwgMSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=