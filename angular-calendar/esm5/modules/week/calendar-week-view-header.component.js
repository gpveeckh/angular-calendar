import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trackByWeekDayHeaderDate } from '../common/util';
var CalendarWeekViewHeaderComponent = /** @class */ (function () {
    function CalendarWeekViewHeaderComponent() {
        this.dayHeaderClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
        this.dragEnter = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CalendarWeekViewHeaderComponent.prototype, "days", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarWeekViewHeaderComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarWeekViewHeaderComponent.prototype, "customTemplate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarWeekViewHeaderComponent.prototype, "dayHeaderClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarWeekViewHeaderComponent.prototype, "eventDropped", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarWeekViewHeaderComponent.prototype, "dragEnter", void 0);
    CalendarWeekViewHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-week-view-header',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\"\n      let-dayHeaderClicked=\"dayHeaderClicked\"\n      let-eventDropped=\"eventDropped\"\n      let-trackByWeekDayHeaderDate=\"trackByWeekDayHeaderDate\"\n      let-dragEnter=\"dragEnter\"\n    >\n      <div class=\"cal-day-headers\" role=\"row\">\n        <div\n          class=\"cal-header\"\n          *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          [ngClass]=\"day.cssClass\"\n          (mwlClick)=\"dayHeaderClicked.emit({ day: day, sourceEvent: $event })\"\n          mwlDroppable\n          dragOverClass=\"cal-drag-over\"\n          (drop)=\"\n            eventDropped.emit({\n              event: $event.dropData.event,\n              newStart: day.date\n            })\n          \"\n          (dragEnter)=\"dragEnter.emit({ date: day.date })\"\n          tabindex=\"0\"\n          role=\"columnheader\"\n        >\n          <b>{{ day.date | calendarDate: 'weekViewColumnHeader':locale }}</b\n          ><br />\n          <span>{{\n            day.date | calendarDate: 'weekViewColumnSubHeader':locale\n          }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        days: days,\n        locale: locale,\n        dayHeaderClicked: dayHeaderClicked,\n        eventDropped: eventDropped,\n        dragEnter: dragEnter,\n        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarWeekViewHeaderComponent);
    return CalendarWeekViewHeaderComponent;
}());
export { CalendarWeekViewHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQTBEMUQ7SUF4REE7UUErRFkscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBR3pDLENBQUM7UUFFSyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUdyQyxDQUFDO1FBRUssY0FBUyxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXpELDZCQUF3QixHQUFHLHdCQUF3QixDQUFDO0lBQ3RELENBQUM7SUFuQlU7UUFBUixLQUFLLEVBQUU7O2lFQUFpQjtJQUVoQjtRQUFSLEtBQUssRUFBRTs7bUVBQWdCO0lBRWY7UUFBUixLQUFLLEVBQUU7MENBQWlCLFdBQVc7MkVBQU07SUFFaEM7UUFBVCxNQUFNLEVBQUU7OzZFQUdKO0lBRUs7UUFBVCxNQUFNLEVBQUU7O3lFQUdKO0lBRUs7UUFBVCxNQUFNLEVBQUU7O3NFQUFnRDtJQWpCOUMsK0JBQStCO1FBeEQzQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLFFBQVEsRUFBRSw0dURBb0RUO1NBQ0YsQ0FBQztPQUNXLCtCQUErQixDQW9CM0M7SUFBRCxzQ0FBQztDQUFBLEFBcEJELElBb0JDO1NBcEJZLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgV2Vla0RheSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcclxuaW1wb3J0IHsgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXHJcbiAgICAgIGxldC1kYXlzPVwiZGF5c1wiXHJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxyXG4gICAgICBsZXQtZGF5SGVhZGVyQ2xpY2tlZD1cImRheUhlYWRlckNsaWNrZWRcIlxyXG4gICAgICBsZXQtZXZlbnREcm9wcGVkPVwiZXZlbnREcm9wcGVkXCJcclxuICAgICAgbGV0LXRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZT1cInRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXHJcbiAgICAgIGxldC1kcmFnRW50ZXI9XCJkcmFnRW50ZXJcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1oZWFkZXJzXCIgcm9sZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwiY2FsLWhlYWRlclwiXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXM7IHRyYWNrQnk6IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXBhc3RdPVwiZGF5LmlzUGFzdFwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcclxuICAgICAgICAgIFtjbGFzcy5jYWwtZnV0dXJlXT1cImRheS5pc0Z1dHVyZVwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJkYXkuY3NzQ2xhc3NcIlxyXG4gICAgICAgICAgKG13bENsaWNrKT1cImRheUhlYWRlckNsaWNrZWQuZW1pdCh7IGRheTogZGF5LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAgIG13bERyb3BwYWJsZVxyXG4gICAgICAgICAgZHJhZ092ZXJDbGFzcz1cImNhbC1kcmFnLW92ZXJcIlxyXG4gICAgICAgICAgKGRyb3ApPVwiXHJcbiAgICAgICAgICAgIGV2ZW50RHJvcHBlZC5lbWl0KHtcclxuICAgICAgICAgICAgICBldmVudDogJGV2ZW50LmRyb3BEYXRhLmV2ZW50LFxyXG4gICAgICAgICAgICAgIG5ld1N0YXJ0OiBkYXkuZGF0ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIChkcmFnRW50ZXIpPVwiZHJhZ0VudGVyLmVtaXQoeyBkYXRlOiBkYXkuZGF0ZSB9KVwiXHJcbiAgICAgICAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgICAgICAgcm9sZT1cImNvbHVtbmhlYWRlclwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGI+e3sgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGU6ICd3ZWVrVmlld0NvbHVtbkhlYWRlcic6bG9jYWxlIH19PC9iXHJcbiAgICAgICAgICA+PGJyIC8+XHJcbiAgICAgICAgICA8c3Bhbj57e1xyXG4gICAgICAgICAgICBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ3dlZWtWaWV3Q29sdW1uU3ViSGVhZGVyJzpsb2NhbGVcclxuICAgICAgICAgIH19PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcclxuICAgICAgICBkYXlzOiBkYXlzLFxyXG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxyXG4gICAgICAgIGRheUhlYWRlckNsaWNrZWQ6IGRheUhlYWRlckNsaWNrZWQsXHJcbiAgICAgICAgZXZlbnREcm9wcGVkOiBldmVudERyb3BwZWQsXHJcbiAgICAgICAgZHJhZ0VudGVyOiBkcmFnRW50ZXIsXHJcbiAgICAgICAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlOiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcclxuICAgICAgfVwiXHJcbiAgICA+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGRheXM6IFdlZWtEYXlbXTtcclxuXHJcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAT3V0cHV0KCkgZGF5SGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZGF5OiBXZWVrRGF5O1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIGV2ZW50RHJvcHBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XHJcbiAgICBuZXdTdGFydDogRGF0ZTtcclxuICB9PigpO1xyXG5cclxuICBAT3V0cHV0KCkgZHJhZ0VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjx7IGRhdGU6IERhdGUgfT4oKTtcclxuXHJcbiAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlID0gdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlO1xyXG59XHJcbiJdfQ==