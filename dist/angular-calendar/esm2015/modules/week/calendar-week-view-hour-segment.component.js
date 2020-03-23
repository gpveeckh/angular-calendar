import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef } from '@angular/core';
let CalendarWeekViewHourSegmentComponent = class CalendarWeekViewHourSegmentComponent {
};
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
        template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale"
      let-segmentHeight="segmentHeight"
      let-isTimeLabel="isTimeLabel"
      let-daysInWeek="daysInWeek"
    >
      <div
        [attr.aria-hidden]="
          {}
            | calendarA11y
              : (daysInWeek === 1
                  ? 'hideDayHourSegment'
                  : 'hideWeekHourSegment')
        "
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass"
      >
        <div class="cal-time" *ngIf="isTimeLabel">
          {{
            segment.displayDate
              | calendarDate
                : (daysInWeek === 1 ? 'dayViewHour' : 'weekViewHour')
                : locale
          }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale,
        segmentHeight: segmentHeight,
        isTimeLabel: isTimeLabel,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewHourSegmentComponent);
export { CalendarWeekViewHourSegmentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFtRDlELElBQWEsb0NBQW9DLEdBQWpELE1BQWEsb0NBQW9DO0NBWWhELENBQUE7QUFYVTtJQUFSLEtBQUssRUFBRTs7cUVBQThCO0FBRTdCO0lBQVIsS0FBSyxFQUFFOzsyRUFBdUI7QUFFdEI7SUFBUixLQUFLLEVBQUU7O29FQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFOzt5RUFBc0I7QUFFckI7SUFBUixLQUFLLEVBQUU7O3dFQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTtzQ0FBaUIsV0FBVzs0RUFBTTtBQVgvQixvQ0FBb0M7SUFoRGhELFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQ0FBcUM7UUFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDVDtLQUNGLENBQUM7R0FDVyxvQ0FBb0MsQ0FZaEQ7U0FaWSxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXZWVrVmlld0hvdXJTZWdtZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXHJcbiAgICAgIGxldC1zZWdtZW50PVwic2VnbWVudFwiXHJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxyXG4gICAgICBsZXQtc2VnbWVudEhlaWdodD1cInNlZ21lbnRIZWlnaHRcIlxyXG4gICAgICBsZXQtaXNUaW1lTGFiZWw9XCJpc1RpbWVMYWJlbFwiXHJcbiAgICAgIGxldC1kYXlzSW5XZWVrPVwiZGF5c0luV2Vla1wiXHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJcclxuICAgICAgICAgIHt9XHJcbiAgICAgICAgICAgIHwgY2FsZW5kYXJBMTF5XHJcbiAgICAgICAgICAgICAgOiAoZGF5c0luV2VlayA9PT0gMVxyXG4gICAgICAgICAgICAgICAgICA/ICdoaWRlRGF5SG91clNlZ21lbnQnXHJcbiAgICAgICAgICAgICAgICAgIDogJ2hpZGVXZWVrSG91clNlZ21lbnQnKVxyXG4gICAgICAgIFwiXHJcbiAgICAgICAgY2xhc3M9XCJjYWwtaG91ci1zZWdtZW50XCJcclxuICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInNlZ21lbnRIZWlnaHRcIlxyXG4gICAgICAgIFtjbGFzcy5jYWwtaG91ci1zdGFydF09XCJzZWdtZW50LmlzU3RhcnRcIlxyXG4gICAgICAgIFtjbGFzcy5jYWwtYWZ0ZXItaG91ci1zdGFydF09XCIhc2VnbWVudC5pc1N0YXJ0XCJcclxuICAgICAgICBbbmdDbGFzc109XCJzZWdtZW50LmNzc0NsYXNzXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZVwiICpuZ0lmPVwiaXNUaW1lTGFiZWxcIj5cclxuICAgICAgICAgIHt7XHJcbiAgICAgICAgICAgIHNlZ21lbnQuZGlzcGxheURhdGVcclxuICAgICAgICAgICAgICB8IGNhbGVuZGFyRGF0ZVxyXG4gICAgICAgICAgICAgICAgOiAoZGF5c0luV2VlayA9PT0gMSA/ICdkYXlWaWV3SG91cicgOiAnd2Vla1ZpZXdIb3VyJylcclxuICAgICAgICAgICAgICAgIDogbG9jYWxlXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcclxuICAgICAgICBzZWdtZW50OiBzZWdtZW50LFxyXG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxyXG4gICAgICAgIHNlZ21lbnRIZWlnaHQ6IHNlZ21lbnRIZWlnaHQsXHJcbiAgICAgICAgaXNUaW1lTGFiZWw6IGlzVGltZUxhYmVsLFxyXG4gICAgICAgIGRheXNJbldlZWs6IGRheXNJbldlZWtcclxuICAgICAgfVwiXHJcbiAgICA+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdIb3VyU2VnbWVudENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgc2VnbWVudDogV2Vla1ZpZXdIb3VyU2VnbWVudDtcclxuXHJcbiAgQElucHV0KCkgc2VnbWVudEhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgaXNUaW1lTGFiZWw6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbn1cclxuIl19