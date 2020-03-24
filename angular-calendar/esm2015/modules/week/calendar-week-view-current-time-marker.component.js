import * as tslib_1 from "tslib";
import { Component, Input, NgZone, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
import { DateAdapter } from '../../date-adapters/date-adapter';
let CalendarWeekViewCurrentTimeMarkerComponent = class CalendarWeekViewCurrentTimeMarkerComponent {
    constructor(dateAdapter, zone) {
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(this.columnDate);
        this.marker$ = this.zone.onStable.pipe(switchMap(() => interval(60 * 1000)), startWith(0), switchMapTo(this.columnDate$), map(columnDate => {
            const startOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayStartHour), this.dayStartMinute);
            const endOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayEndHour), this.dayEndMinute);
            const hourHeightModifier = (this.hourSegments * this.hourSegmentHeight) / 60;
            const now = new Date();
            return {
                isVisible: this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier
            };
        }));
    }
    ngOnChanges(changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    }
};
CalendarWeekViewCurrentTimeMarkerComponent.ctorParameters = () => [
    { type: DateAdapter },
    { type: NgZone }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Date)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "columnDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartHour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartMinute", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndHour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndMinute", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegments", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegmentHeight", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "customTemplate", void 0);
CalendarWeekViewCurrentTimeMarkerComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-week-view-current-time-marker',
        template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="isVisible"
        [style.top.px]="topPx"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top
      }"
    >
    </ng-template>
  `
    }),
    tslib_1.__metadata("design:paramtypes", [DateAdapter, NgZone])
], CalendarWeekViewCurrentTimeMarkerComponent);
export { CalendarWeekViewCurrentTimeMarkerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBb0MvRCxJQUFhLDBDQUEwQyxHQUF2RCxNQUFhLDBDQUEwQztJQWtEckQsWUFBb0IsV0FBd0IsRUFBVSxJQUFZO1FBQTlDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWpDMUQsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFakUsWUFBTyxHQUdGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDMUIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDcEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUNaLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQzdCLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNmLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUN4RCxJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO1lBQ0YsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQ3RELElBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7WUFDRixNQUFNLGtCQUFrQixHQUN0QixDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsT0FBTztnQkFDTCxTQUFTLEVBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztvQkFDM0MsR0FBRyxJQUFJLFVBQVU7b0JBQ2pCLEdBQUcsSUFBSSxRQUFRO2dCQUNqQixHQUFHLEVBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO29CQUNyRCxrQkFBa0I7YUFDckIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFFbUUsQ0FBQztJQUV0RSxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFQa0MsV0FBVztZQUFnQixNQUFNOztBQWpEekQ7SUFBUixLQUFLLEVBQUU7c0NBQWEsSUFBSTs4RUFBQztBQUVqQjtJQUFSLEtBQUssRUFBRTs7Z0ZBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFOztrRkFBd0I7QUFFdkI7SUFBUixLQUFLLEVBQUU7OzhFQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTs7Z0ZBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFOztnRkFBc0I7QUFFckI7SUFBUixLQUFLLEVBQUU7O3FGQUEyQjtBQUUxQjtJQUFSLEtBQUssRUFBRTtzQ0FBaUIsV0FBVztrRkFBTTtBQWYvQiwwQ0FBMEM7SUFsQ3RELFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw0Q0FBNEM7UUFDdEQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7S0FDRixDQUFDOzZDQW1EaUMsV0FBVyxFQUFnQixNQUFNO0dBbER2RCwwQ0FBMEMsQ0F5RHREO1NBekRZLDBDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGludGVydmFsLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcFRvLCBzdGFydFdpdGgsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcclxuICAgICAgbGV0LWNvbHVtbkRhdGU9XCJjb2x1bW5EYXRlXCJcclxuICAgICAgbGV0LWRheVN0YXJ0SG91cj1cImRheVN0YXJ0SG91clwiXHJcbiAgICAgIGxldC1kYXlTdGFydE1pbnV0ZT1cImRheVN0YXJ0TWludXRlXCJcclxuICAgICAgbGV0LWRheUVuZEhvdXI9XCJkYXlFbmRIb3VyXCJcclxuICAgICAgbGV0LWRheUVuZE1pbnV0ZT1cImRheUVuZE1pbnV0ZVwiXHJcbiAgICAgIGxldC1pc1Zpc2libGU9XCJpc1Zpc2libGVcIlxyXG4gICAgICBsZXQtdG9wUHg9XCJ0b3BQeFwiXHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cImNhbC1jdXJyZW50LXRpbWUtbWFya2VyXCJcclxuICAgICAgICAqbmdJZj1cImlzVmlzaWJsZVwiXHJcbiAgICAgICAgW3N0eWxlLnRvcC5weF09XCJ0b3BQeFwiXHJcbiAgICAgID48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcclxuICAgICAgICBjb2x1bW5EYXRlOiBjb2x1bW5EYXRlLFxyXG4gICAgICAgIGRheVN0YXJ0SG91cjogZGF5U3RhcnRIb3VyLFxyXG4gICAgICAgIGRheVN0YXJ0TWludXRlOiBkYXlTdGFydE1pbnV0ZSxcclxuICAgICAgICBkYXlFbmRIb3VyOiBkYXlFbmRIb3VyLFxyXG4gICAgICAgIGRheUVuZE1pbnV0ZTogZGF5RW5kTWludXRlLFxyXG4gICAgICAgIGlzVmlzaWJsZTogKG1hcmtlciQgfCBhc3luYyk/LmlzVmlzaWJsZSxcclxuICAgICAgICB0b3BQeDogKG1hcmtlciQgfCBhc3luYyk/LnRvcFxyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBjb2x1bW5EYXRlOiBEYXRlO1xyXG5cclxuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgaG91clNlZ21lbnRzOiBudW1iZXI7XHJcblxyXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50SGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwcml2YXRlIGNvbHVtbkRhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlPih0aGlzLmNvbHVtbkRhdGUpO1xyXG5cclxuICBtYXJrZXIkOiBPYnNlcnZhYmxlPHtcclxuICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHRvcDogbnVtYmVyO1xyXG4gIH0+ID0gdGhpcy56b25lLm9uU3RhYmxlLnBpcGUoXHJcbiAgICBzd2l0Y2hNYXAoKCkgPT4gaW50ZXJ2YWwoNjAgKiAxMDAwKSksXHJcbiAgICBzdGFydFdpdGgoMCksXHJcbiAgICBzd2l0Y2hNYXBUbyh0aGlzLmNvbHVtbkRhdGUkKSxcclxuICAgIG1hcChjb2x1bW5EYXRlID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnRPZkRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhcclxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLnNldEhvdXJzKGNvbHVtbkRhdGUsIHRoaXMuZGF5U3RhcnRIb3VyKSxcclxuICAgICAgICB0aGlzLmRheVN0YXJ0TWludXRlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IGVuZE9mRGF5ID0gdGhpcy5kYXRlQWRhcHRlci5zZXRNaW51dGVzKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuc2V0SG91cnMoY29sdW1uRGF0ZSwgdGhpcy5kYXlFbmRIb3VyKSxcclxuICAgICAgICB0aGlzLmRheUVuZE1pbnV0ZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBob3VySGVpZ2h0TW9kaWZpZXIgPVxyXG4gICAgICAgICh0aGlzLmhvdXJTZWdtZW50cyAqIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpIC8gNjA7XHJcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaXNWaXNpYmxlOlxyXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5pc1NhbWVEYXkoY29sdW1uRGF0ZSwgbm93KSAmJlxyXG4gICAgICAgICAgbm93ID49IHN0YXJ0T2ZEYXkgJiZcclxuICAgICAgICAgIG5vdyA8PSBlbmRPZkRheSxcclxuICAgICAgICB0b3A6XHJcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmRpZmZlcmVuY2VJbk1pbnV0ZXMobm93LCBzdGFydE9mRGF5KSAqXHJcbiAgICAgICAgICBob3VySGVpZ2h0TW9kaWZpZXJcclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5jb2x1bW5EYXRlKSB7XHJcbiAgICAgIHRoaXMuY29sdW1uRGF0ZSQubmV4dChjaGFuZ2VzLmNvbHVtbkRhdGUuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19