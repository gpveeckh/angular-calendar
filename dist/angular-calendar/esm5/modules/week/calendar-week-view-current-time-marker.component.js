import * as tslib_1 from "tslib";
import { Component, Input, NgZone, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
import { DateAdapter } from '../../date-adapters/date-adapter';
var CalendarWeekViewCurrentTimeMarkerComponent = /** @class */ (function () {
    function CalendarWeekViewCurrentTimeMarkerComponent(dateAdapter, zone) {
        var _this = this;
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(this.columnDate);
        this.marker$ = this.zone.onStable.pipe(switchMap(function () { return interval(60 * 1000); }), startWith(0), switchMapTo(this.columnDate$), map(function (columnDate) {
            var startOfDay = _this.dateAdapter.setMinutes(_this.dateAdapter.setHours(columnDate, _this.dayStartHour), _this.dayStartMinute);
            var endOfDay = _this.dateAdapter.setMinutes(_this.dateAdapter.setHours(columnDate, _this.dayEndHour), _this.dayEndMinute);
            var hourHeightModifier = (_this.hourSegments * _this.hourSegmentHeight) / 60;
            var now = new Date();
            return {
                isVisible: _this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: _this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier
            };
        }));
    }
    CalendarWeekViewCurrentTimeMarkerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    };
    CalendarWeekViewCurrentTimeMarkerComponent.ctorParameters = function () { return [
        { type: DateAdapter },
        { type: NgZone }
    ]; };
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
            template: "\n    <ng-template\n      #defaultTemplate\n      let-columnDate=\"columnDate\"\n      let-dayStartHour=\"dayStartHour\"\n      let-dayStartMinute=\"dayStartMinute\"\n      let-dayEndHour=\"dayEndHour\"\n      let-dayEndMinute=\"dayEndMinute\"\n      let-isVisible=\"isVisible\"\n      let-topPx=\"topPx\"\n    >\n      <div\n        class=\"cal-current-time-marker\"\n        *ngIf=\"isVisible\"\n        [style.top.px]=\"topPx\"\n      ></div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        columnDate: columnDate,\n        dayStartHour: dayStartHour,\n        dayStartMinute: dayStartMinute,\n        dayEndHour: dayEndHour,\n        dayEndMinute: dayEndMinute,\n        isVisible: (marker$ | async)?.isVisible,\n        topPx: (marker$ | async)?.top\n      }\"\n    >\n    </ng-template>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [DateAdapter, NgZone])
    ], CalendarWeekViewCurrentTimeMarkerComponent);
    return CalendarWeekViewCurrentTimeMarkerComponent;
}());
export { CalendarWeekViewCurrentTimeMarkerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBb0MvRDtJQWtERSxvREFBb0IsV0FBd0IsRUFBVSxJQUFZO1FBQWxFLGlCQUFzRTtRQUFsRCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFqQzFELGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLFlBQU8sR0FHRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzFCLFNBQVMsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxFQUNwQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ1osV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDN0IsR0FBRyxDQUFDLFVBQUEsVUFBVTtZQUNaLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUM1QyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxFQUN4RCxLQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO1lBQ0YsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQzFDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQ3RELEtBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7WUFDRixJQUFNLGtCQUFrQixHQUN0QixDQUFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3BELElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsT0FBTztnQkFDTCxTQUFTLEVBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztvQkFDM0MsR0FBRyxJQUFJLFVBQVU7b0JBQ2pCLEdBQUcsSUFBSSxRQUFRO2dCQUNqQixHQUFHLEVBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO29CQUNyRCxrQkFBa0I7YUFDckIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFFbUUsQ0FBQztJQUV0RSxnRUFBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDOztnQkFOZ0MsV0FBVztnQkFBZ0IsTUFBTTs7SUFqRHpEO1FBQVIsS0FBSyxFQUFFOzBDQUFhLElBQUk7a0ZBQUM7SUFFakI7UUFBUixLQUFLLEVBQUU7O29GQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTs7c0ZBQXdCO0lBRXZCO1FBQVIsS0FBSyxFQUFFOztrRkFBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7O29GQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTs7b0ZBQXNCO0lBRXJCO1FBQVIsS0FBSyxFQUFFOzt5RkFBMkI7SUFFMUI7UUFBUixLQUFLLEVBQUU7MENBQWlCLFdBQVc7c0ZBQU07SUFmL0IsMENBQTBDO1FBbEN0RCxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNENBQTRDO1lBQ3RELFFBQVEsRUFBRSxrNEJBOEJUO1NBQ0YsQ0FBQztpREFtRGlDLFdBQVcsRUFBZ0IsTUFBTTtPQWxEdkQsMENBQTBDLENBeUR0RDtJQUFELGlEQUFDO0NBQUEsQUF6REQsSUF5REM7U0F6RFksMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgaW50ZXJ2YWwsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwVG8sIHN0YXJ0V2l0aCwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXInLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxyXG4gICAgICBsZXQtY29sdW1uRGF0ZT1cImNvbHVtbkRhdGVcIlxyXG4gICAgICBsZXQtZGF5U3RhcnRIb3VyPVwiZGF5U3RhcnRIb3VyXCJcclxuICAgICAgbGV0LWRheVN0YXJ0TWludXRlPVwiZGF5U3RhcnRNaW51dGVcIlxyXG4gICAgICBsZXQtZGF5RW5kSG91cj1cImRheUVuZEhvdXJcIlxyXG4gICAgICBsZXQtZGF5RW5kTWludXRlPVwiZGF5RW5kTWludXRlXCJcclxuICAgICAgbGV0LWlzVmlzaWJsZT1cImlzVmlzaWJsZVwiXHJcbiAgICAgIGxldC10b3BQeD1cInRvcFB4XCJcclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiY2FsLWN1cnJlbnQtdGltZS1tYXJrZXJcIlxyXG4gICAgICAgICpuZ0lmPVwiaXNWaXNpYmxlXCJcclxuICAgICAgICBbc3R5bGUudG9wLnB4XT1cInRvcFB4XCJcclxuICAgICAgPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIGNvbHVtbkRhdGU6IGNvbHVtbkRhdGUsXHJcbiAgICAgICAgZGF5U3RhcnRIb3VyOiBkYXlTdGFydEhvdXIsXHJcbiAgICAgICAgZGF5U3RhcnRNaW51dGU6IGRheVN0YXJ0TWludXRlLFxyXG4gICAgICAgIGRheUVuZEhvdXI6IGRheUVuZEhvdXIsXHJcbiAgICAgICAgZGF5RW5kTWludXRlOiBkYXlFbmRNaW51dGUsXHJcbiAgICAgICAgaXNWaXNpYmxlOiAobWFya2VyJCB8IGFzeW5jKT8uaXNWaXNpYmxlLFxyXG4gICAgICAgIHRvcFB4OiAobWFya2VyJCB8IGFzeW5jKT8udG9wXHJcbiAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGNvbHVtbkRhdGU6IERhdGU7XHJcblxyXG4gIEBJbnB1dCgpIGRheVN0YXJ0SG91cjogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXI7XHJcblxyXG4gIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHByaXZhdGUgY29sdW1uRGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KHRoaXMuY29sdW1uRGF0ZSk7XHJcblxyXG4gIG1hcmtlciQ6IE9ic2VydmFibGU8e1xyXG4gICAgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gICAgdG9wOiBudW1iZXI7XHJcbiAgfT4gPSB0aGlzLnpvbmUub25TdGFibGUucGlwZShcclxuICAgIHN3aXRjaE1hcCgoKSA9PiBpbnRlcnZhbCg2MCAqIDEwMDApKSxcclxuICAgIHN0YXJ0V2l0aCgwKSxcclxuICAgIHN3aXRjaE1hcFRvKHRoaXMuY29sdW1uRGF0ZSQpLFxyXG4gICAgbWFwKGNvbHVtbkRhdGUgPT4ge1xyXG4gICAgICBjb25zdCBzdGFydE9mRGF5ID0gdGhpcy5kYXRlQWRhcHRlci5zZXRNaW51dGVzKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuc2V0SG91cnMoY29sdW1uRGF0ZSwgdGhpcy5kYXlTdGFydEhvdXIpLFxyXG4gICAgICAgIHRoaXMuZGF5U3RhcnRNaW51dGVcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgZW5kT2ZEYXkgPSB0aGlzLmRhdGVBZGFwdGVyLnNldE1pbnV0ZXMoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRIb3Vycyhjb2x1bW5EYXRlLCB0aGlzLmRheUVuZEhvdXIpLFxyXG4gICAgICAgIHRoaXMuZGF5RW5kTWludXRlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IGhvdXJIZWlnaHRNb2RpZmllciA9XHJcbiAgICAgICAgKHRoaXMuaG91clNlZ21lbnRzICogdGhpcy5ob3VyU2VnbWVudEhlaWdodCkgLyA2MDtcclxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpc1Zpc2libGU6XHJcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmlzU2FtZURheShjb2x1bW5EYXRlLCBub3cpICYmXHJcbiAgICAgICAgICBub3cgPj0gc3RhcnRPZkRheSAmJlxyXG4gICAgICAgICAgbm93IDw9IGVuZE9mRGF5LFxyXG4gICAgICAgIHRvcDpcclxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZGlmZmVyZW5jZUluTWludXRlcyhub3csIHN0YXJ0T2ZEYXkpICpcclxuICAgICAgICAgIGhvdXJIZWlnaHRNb2RpZmllclxyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICApO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmNvbHVtbkRhdGUpIHtcclxuICAgICAgdGhpcy5jb2x1bW5EYXRlJC5uZXh0KGNoYW5nZXMuY29sdW1uRGF0ZS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=