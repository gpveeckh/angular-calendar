import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef } from '@angular/core';
var CalendarWeekViewHourSegmentComponent = /** @class */ (function () {
    function CalendarWeekViewHourSegmentComponent() {
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarWeekViewHourSegmentComponent.prototype, "segment", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarWeekViewHourSegmentComponent.prototype, "segmentHeight", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarWeekViewHourSegmentComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CalendarWeekViewHourSegmentComponent.prototype, "isTimeLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarWeekViewHourSegmentComponent.prototype, "daysInWeek", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarWeekViewHourSegmentComponent.prototype, "customTemplate", void 0);
    CalendarWeekViewHourSegmentComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-week-view-hour-segment',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-segment=\"segment\"\n      let-locale=\"locale\"\n      let-segmentHeight=\"segmentHeight\"\n      let-isTimeLabel=\"isTimeLabel\"\n      let-daysInWeek=\"daysInWeek\"\n    >\n      <div\n        [attr.aria-hidden]=\"\n          {}\n            | calendarA11y\n              : (daysInWeek === 1\n                  ? 'hideDayHourSegment'\n                  : 'hideWeekHourSegment')\n        \"\n        class=\"cal-hour-segment\"\n        [style.height.px]=\"segmentHeight\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\"\n      >\n        <div class=\"cal-time\" *ngIf=\"isTimeLabel\">\n          {{\n            segment.displayDate\n              | calendarDate\n                : (daysInWeek === 1 ? 'dayViewHour' : 'weekViewHour')\n                : locale\n          }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale,\n        segmentHeight: segmentHeight,\n        isTimeLabel: isTimeLabel,\n        daysInWeek: daysInWeek\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarWeekViewHourSegmentComponent);
    return CalendarWeekViewHourSegmentComponent;
}());
export { CalendarWeekViewHourSegmentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFtRDlEO0lBQUE7SUFZQSxDQUFDO0lBWFU7UUFBUixLQUFLLEVBQUU7O3lFQUE4QjtJQUU3QjtRQUFSLEtBQUssRUFBRTs7K0VBQXVCO0lBRXRCO1FBQVIsS0FBSyxFQUFFOzt3RUFBZ0I7SUFFZjtRQUFSLEtBQUssRUFBRTs7NkVBQXNCO0lBRXJCO1FBQVIsS0FBSyxFQUFFOzs0RUFBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7MENBQWlCLFdBQVc7Z0ZBQU07SUFYL0Isb0NBQW9DO1FBaERoRCxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUNBQXFDO1lBQy9DLFFBQVEsRUFBRSxzeENBNENUO1NBQ0YsQ0FBQztPQUNXLG9DQUFvQyxDQVloRDtJQUFELDJDQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2Vla1ZpZXdIb3VyU2VnbWVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxyXG4gICAgICBsZXQtc2VnbWVudD1cInNlZ21lbnRcIlxyXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCJcclxuICAgICAgbGV0LXNlZ21lbnRIZWlnaHQ9XCJzZWdtZW50SGVpZ2h0XCJcclxuICAgICAgbGV0LWlzVGltZUxhYmVsPVwiaXNUaW1lTGFiZWxcIlxyXG4gICAgICBsZXQtZGF5c0luV2Vlaz1cImRheXNJbldlZWtcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiXHJcbiAgICAgICAgICB7fVxyXG4gICAgICAgICAgICB8IGNhbGVuZGFyQTExeVxyXG4gICAgICAgICAgICAgIDogKGRheXNJbldlZWsgPT09IDFcclxuICAgICAgICAgICAgICAgICAgPyAnaGlkZURheUhvdXJTZWdtZW50J1xyXG4gICAgICAgICAgICAgICAgICA6ICdoaWRlV2Vla0hvdXJTZWdtZW50JylcclxuICAgICAgICBcIlxyXG4gICAgICAgIGNsYXNzPVwiY2FsLWhvdXItc2VnbWVudFwiXHJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJzZWdtZW50SGVpZ2h0XCJcclxuICAgICAgICBbY2xhc3MuY2FsLWhvdXItc3RhcnRdPVwic2VnbWVudC5pc1N0YXJ0XCJcclxuICAgICAgICBbY2xhc3MuY2FsLWFmdGVyLWhvdXItc3RhcnRdPVwiIXNlZ21lbnQuaXNTdGFydFwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwic2VnbWVudC5jc3NDbGFzc1wiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRpbWVcIiAqbmdJZj1cImlzVGltZUxhYmVsXCI+XHJcbiAgICAgICAgICB7e1xyXG4gICAgICAgICAgICBzZWdtZW50LmRpc3BsYXlEYXRlXHJcbiAgICAgICAgICAgICAgfCBjYWxlbmRhckRhdGVcclxuICAgICAgICAgICAgICAgIDogKGRheXNJbldlZWsgPT09IDEgPyAnZGF5Vmlld0hvdXInIDogJ3dlZWtWaWV3SG91cicpXHJcbiAgICAgICAgICAgICAgICA6IGxvY2FsZVxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XHJcbiAgICAgICAgc2VnbWVudDogc2VnbWVudCxcclxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcclxuICAgICAgICBzZWdtZW50SGVpZ2h0OiBzZWdtZW50SGVpZ2h0LFxyXG4gICAgICAgIGlzVGltZUxhYmVsOiBpc1RpbWVMYWJlbCxcclxuICAgICAgICBkYXlzSW5XZWVrOiBkYXlzSW5XZWVrXHJcbiAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3SG91clNlZ21lbnRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIHNlZ21lbnQ6IFdlZWtWaWV3SG91clNlZ21lbnQ7XHJcblxyXG4gIEBJbnB1dCgpIHNlZ21lbnRIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGlzVGltZUxhYmVsOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XHJcblxyXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG59XHJcbiJdfQ==