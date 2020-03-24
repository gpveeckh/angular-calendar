import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { trackByWeekDayHeaderDate } from '../common/util';
let CalendarMonthViewHeaderComponent = class CalendarMonthViewHeaderComponent {
    constructor() {
        this.columnHeaderClicked = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarMonthViewHeaderComponent.prototype, "days", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CalendarMonthViewHeaderComponent.prototype, "locale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarMonthViewHeaderComponent.prototype, "customTemplate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarMonthViewHeaderComponent.prototype, "columnHeaderClicked", void 0);
CalendarMonthViewHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-month-view-header',
        template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
    >
      <div class="cal-cell-row cal-header" role="row">
        <div
          class="cal-cell"
          *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          (click)="
            columnHeaderClicked.emit({
              isoDayNumber: day.day,
              sourceEvent: $event
            })
          "
          [ngClass]="day.cssClass"
          tabindex="0"
          role="columnheader"
        >
          {{ day.date | calendarDate: 'monthViewColumnHeader':locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate
      }"
    >
    </ng-template>
  `
    })
], CalendarMonthViewHeaderComponent);
export { CalendarMonthViewHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQTRDMUQsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUExQzdDO1FBaURZLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUc1QyxDQUFDO1FBRUwsNkJBQXdCLEdBQUcsd0JBQXdCLENBQUM7SUFDdEQsQ0FBQztDQUFBLENBQUE7QUFaVTtJQUFSLEtBQUssRUFBRTs7OERBQWlCO0FBRWhCO0lBQVIsS0FBSyxFQUFFOztnRUFBZ0I7QUFFZjtJQUFSLEtBQUssRUFBRTtzQ0FBaUIsV0FBVzt3RUFBTTtBQUVoQztJQUFULE1BQU0sRUFBRTs7NkVBR0o7QUFWTSxnQ0FBZ0M7SUExQzVDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQ0FBZ0M7UUFDMUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDtLQUNGLENBQUM7R0FDVyxnQ0FBZ0MsQ0FhNUM7U0FiWSxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFdlZWtEYXkgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XHJcbmltcG9ydCB7IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXctaGVhZGVyJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcclxuICAgICAgbGV0LWRheXM9XCJkYXlzXCJcclxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXHJcbiAgICAgIGxldC10cmFja0J5V2Vla0RheUhlYWRlckRhdGU9XCJ0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWNlbGwtcm93IGNhbC1oZWFkZXJcIiByb2xlPVwicm93XCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3M9XCJjYWwtY2VsbFwiXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXM7IHRyYWNrQnk6IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXBhc3RdPVwiZGF5LmlzUGFzdFwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cImRheS5pc1RvZGF5XCJcclxuICAgICAgICAgIFtjbGFzcy5jYWwtZnV0dXJlXT1cImRheS5pc0Z1dHVyZVwiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiZGF5LmlzV2Vla2VuZFwiXHJcbiAgICAgICAgICAoY2xpY2spPVwiXHJcbiAgICAgICAgICAgIGNvbHVtbkhlYWRlckNsaWNrZWQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgaXNvRGF5TnVtYmVyOiBkYXkuZGF5LFxyXG4gICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIFwiXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJkYXkuY3NzQ2xhc3NcIlxyXG4gICAgICAgICAgdGFiaW5kZXg9XCIwXCJcclxuICAgICAgICAgIHJvbGU9XCJjb2x1bW5oZWFkZXJcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt7IGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOiAnbW9udGhWaWV3Q29sdW1uSGVhZGVyJzpsb2NhbGUgfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XHJcbiAgICAgICAgZGF5czogZGF5cyxcclxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcclxuICAgICAgICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU6IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVxyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aFZpZXdIZWFkZXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGRheXM6IFdlZWtEYXlbXTtcclxuXHJcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBAT3V0cHV0KCkgY29sdW1uSGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgaXNvRGF5TnVtYmVyOiBudW1iZXI7XHJcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcclxuICB9PigpO1xyXG5cclxuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XHJcbn1cclxuIl19