import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { isWithinThreshold, trackByEventId } from '../common/util';
var CalendarMonthCellComponent = /** @class */ (function () {
    function CalendarMonthCellComponent() {
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthCellComponent.prototype, "day", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthCellComponent.prototype, "openDay", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarMonthCellComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthCellComponent.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CalendarMonthCellComponent.prototype, "tooltipAppendToBody", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthCellComponent.prototype, "customTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthCellComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarMonthCellComponent.prototype, "tooltipDelay", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CalendarMonthCellComponent.prototype, "highlightDay", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CalendarMonthCellComponent.prototype, "unhighlightDay", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthCellComponent.prototype, "eventClicked", void 0);
    CalendarMonthCellComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-month-cell',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-day=\"day\"\n      let-openDay=\"openDay\"\n      let-locale=\"locale\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-highlightDay=\"highlightDay\"\n      let-unhighlightDay=\"unhighlightDay\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDelay=\"tooltipDelay\"\n      let-trackByEventId=\"trackByEventId\"\n      let-validateDrag=\"validateDrag\"\n    >\n      <div\n        class=\"cal-cell-top\"\n        [attr.aria-label]=\"\n          { day: day, locale: locale } | calendarA11y: 'monthCell'\n        \"\n      >\n        <span aria-hidden=\"true\">\n          <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{\n            day.badgeTotal\n          }}</span>\n          <span class=\"cal-day-number\">{{\n            day.date | calendarDate: 'monthViewDayNumber':locale\n          }}</span>\n        </span>\n      </div>\n      <div class=\"cal-events\" *ngIf=\"day.events.length > 0\">\n        <div\n          class=\"cal-event\"\n          *ngFor=\"let event of day.events; trackBy: trackByEventId\"\n          [ngStyle]=\"{ backgroundColor: event.color?.primary }\"\n          [ngClass]=\"event?.cssClass\"\n          (mouseenter)=\"highlightDay.emit({ event: event })\"\n          (mouseleave)=\"unhighlightDay.emit({ event: event })\"\n          [mwlCalendarTooltip]=\"\n            event.title | calendarEventTitle: 'monthTooltip':event\n          \"\n          [tooltipPlacement]=\"tooltipPlacement\"\n          [tooltipEvent]=\"event\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipAppendToBody]=\"tooltipAppendToBody\"\n          [tooltipDelay]=\"tooltipDelay\"\n          mwlDraggable\n          [class.cal-draggable]=\"event.draggable\"\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event, draggedFrom: day }\"\n          [dragAxis]=\"{ x: event.draggable, y: event.draggable }\"\n          [validateDrag]=\"validateDrag\"\n          (mwlClick)=\"eventClicked.emit({ event: event, sourceEvent: $event })\"\n          [attr.aria-hidden]=\"{} | calendarA11y: 'hideMonthCellEvents'\"\n        ></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        day: day,\n        openDay: openDay,\n        locale: locale,\n        tooltipPlacement: tooltipPlacement,\n        highlightDay: highlightDay,\n        unhighlightDay: unhighlightDay,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDelay: tooltipDelay,\n        trackByEventId: trackByEventId,\n        validateDrag: validateDrag\n      }\"\n    >\n    </ng-template>\n  ",
            host: {
                class: 'cal-cell cal-day-cell',
                '[class.cal-past]': 'day.isPast',
                '[class.cal-today]': 'day.isToday',
                '[class.cal-future]': 'day.isFuture',
                '[class.cal-weekend]': 'day.isWeekend',
                '[class.cal-in-month]': 'day.inMonth',
                '[class.cal-out-month]': '!day.inMonth',
                '[class.cal-has-events]': 'day.events.length > 0',
                '[class.cal-open]': 'day === openDay',
                '[class.cal-event-highlight]': '!!day.backgroundColor'
            }
        })
    ], CalendarMonthCellComponent);
    return CalendarMonthCellComponent;
}());
export { CalendarMonthCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBK0ZuRTtJQTVGQTtRQTZHWSxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHakUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFHM0IsQ0FBQztRQUVMLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBRWhDLGlCQUFZLEdBQUcsaUJBQWlCLENBQUM7SUFDbkMsQ0FBQztJQTdCVTtRQUFSLEtBQUssRUFBRTs7MkRBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFOzsrREFBdUI7SUFFdEI7UUFBUixLQUFLLEVBQUU7OzhEQUFnQjtJQUVmO1FBQVIsS0FBSyxFQUFFOzt3RUFBa0M7SUFFakM7UUFBUixLQUFLLEVBQUU7OzJFQUE4QjtJQUU3QjtRQUFSLEtBQUssRUFBRTswQ0FBaUIsV0FBVztzRUFBTTtJQUVqQztRQUFSLEtBQUssRUFBRTswQ0FBa0IsV0FBVzt1RUFBTTtJQUVsQztRQUFSLEtBQUssRUFBRTs7b0VBQTZCO0lBRTNCO1FBQVQsTUFBTSxFQUFFOzBDQUFlLFlBQVk7b0VBQTJCO0lBRXJEO1FBQVQsTUFBTSxFQUFFOzBDQUFpQixZQUFZO3NFQUEyQjtJQUdqRTtRQURDLE1BQU0sRUFBRTs7b0VBSUo7SUF6Qk0sMEJBQTBCO1FBNUZ0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSx1MUZBNEVUO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSx1QkFBdUI7Z0JBQzlCLGtCQUFrQixFQUFFLFlBQVk7Z0JBQ2hDLG1CQUFtQixFQUFFLGFBQWE7Z0JBQ2xDLG9CQUFvQixFQUFFLGNBQWM7Z0JBQ3BDLHFCQUFxQixFQUFFLGVBQWU7Z0JBQ3RDLHNCQUFzQixFQUFFLGFBQWE7Z0JBQ3JDLHVCQUF1QixFQUFFLGNBQWM7Z0JBQ3ZDLHdCQUF3QixFQUFFLHVCQUF1QjtnQkFDakQsa0JBQWtCLEVBQUUsaUJBQWlCO2dCQUNyQyw2QkFBNkIsRUFBRSx1QkFBdUI7YUFDdkQ7U0FDRixDQUFDO09BQ1csMEJBQTBCLENBOEJ0QztJQUFELGlDQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0E5QlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb250aFZpZXdEYXksIENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XHJcbmltcG9ydCB7IGlzV2l0aGluVGhyZXNob2xkLCB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1tb250aC1jZWxsJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcclxuICAgICAgbGV0LWRheT1cImRheVwiXHJcbiAgICAgIGxldC1vcGVuRGF5PVwib3BlbkRheVwiXHJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxyXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICBsZXQtaGlnaGxpZ2h0RGF5PVwiaGlnaGxpZ2h0RGF5XCJcclxuICAgICAgbGV0LXVuaGlnaGxpZ2h0RGF5PVwidW5oaWdobGlnaHREYXlcIlxyXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcclxuICAgICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXHJcbiAgICAgIGxldC10b29sdGlwRGVsYXk9XCJ0b29sdGlwRGVsYXlcIlxyXG4gICAgICBsZXQtdHJhY2tCeUV2ZW50SWQ9XCJ0cmFja0J5RXZlbnRJZFwiXHJcbiAgICAgIGxldC12YWxpZGF0ZURyYWc9XCJ2YWxpZGF0ZURyYWdcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJjYWwtY2VsbC10b3BcIlxyXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXHJcbiAgICAgICAgICB7IGRheTogZGF5LCBsb2NhbGU6IGxvY2FsZSB9IHwgY2FsZW5kYXJBMTF5OiAnbW9udGhDZWxsJ1xyXG4gICAgICAgIFwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1iYWRnZVwiICpuZ0lmPVwiZGF5LmJhZGdlVG90YWwgPiAwXCI+e3tcclxuICAgICAgICAgICAgZGF5LmJhZGdlVG90YWxcclxuICAgICAgICAgIH19PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtZGF5LW51bWJlclwiPnt7XHJcbiAgICAgICAgICAgIGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOiAnbW9udGhWaWV3RGF5TnVtYmVyJzpsb2NhbGVcclxuICAgICAgICAgIH19PC9zcGFuPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzXCIgKm5nSWY9XCJkYXkuZXZlbnRzLmxlbmd0aCA+IDBcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZGF5LmV2ZW50czsgdHJhY2tCeTogdHJhY2tCeUV2ZW50SWRcIlxyXG4gICAgICAgICAgW25nU3R5bGVdPVwieyBiYWNrZ3JvdW5kQ29sb3I6IGV2ZW50LmNvbG9yPy5wcmltYXJ5IH1cIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwiZXZlbnQ/LmNzc0NsYXNzXCJcclxuICAgICAgICAgIChtb3VzZWVudGVyKT1cImhpZ2hsaWdodERheS5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCJcclxuICAgICAgICAgIChtb3VzZWxlYXZlKT1cInVuaGlnaGxpZ2h0RGF5LmVtaXQoeyBldmVudDogZXZlbnQgfSlcIlxyXG4gICAgICAgICAgW213bENhbGVuZGFyVG9vbHRpcF09XCJcclxuICAgICAgICAgICAgZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6ICdtb250aFRvb2x0aXAnOmV2ZW50XHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXHJcbiAgICAgICAgICBbdG9vbHRpcEV2ZW50XT1cImV2ZW50XCJcclxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxyXG4gICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxyXG4gICAgICAgICAgbXdsRHJhZ2dhYmxlXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLWRyYWdnYWJsZV09XCJldmVudC5kcmFnZ2FibGVcIlxyXG4gICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcclxuICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiBldmVudCwgZHJhZ2dlZEZyb206IGRheSB9XCJcclxuICAgICAgICAgIFtkcmFnQXhpc109XCJ7IHg6IGV2ZW50LmRyYWdnYWJsZSwgeTogZXZlbnQuZHJhZ2dhYmxlIH1cIlxyXG4gICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxyXG4gICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInt9IHwgY2FsZW5kYXJBMTF5OiAnaGlkZU1vbnRoQ2VsbEV2ZW50cydcIlxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XHJcbiAgICAgICAgZGF5OiBkYXksXHJcbiAgICAgICAgb3BlbkRheTogb3BlbkRheSxcclxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcclxuICAgICAgICB0b29sdGlwUGxhY2VtZW50OiB0b29sdGlwUGxhY2VtZW50LFxyXG4gICAgICAgIGhpZ2hsaWdodERheTogaGlnaGxpZ2h0RGF5LFxyXG4gICAgICAgIHVuaGlnaGxpZ2h0RGF5OiB1bmhpZ2hsaWdodERheSxcclxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcclxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcclxuICAgICAgICB0b29sdGlwQXBwZW5kVG9Cb2R5OiB0b29sdGlwQXBwZW5kVG9Cb2R5LFxyXG4gICAgICAgIHRvb2x0aXBEZWxheTogdG9vbHRpcERlbGF5LFxyXG4gICAgICAgIHRyYWNrQnlFdmVudElkOiB0cmFja0J5RXZlbnRJZCxcclxuICAgICAgICB2YWxpZGF0ZURyYWc6IHZhbGlkYXRlRHJhZ1xyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2NhbC1jZWxsIGNhbC1kYXktY2VsbCcsXHJcbiAgICAnW2NsYXNzLmNhbC1wYXN0XSc6ICdkYXkuaXNQYXN0JyxcclxuICAgICdbY2xhc3MuY2FsLXRvZGF5XSc6ICdkYXkuaXNUb2RheScsXHJcbiAgICAnW2NsYXNzLmNhbC1mdXR1cmVdJzogJ2RheS5pc0Z1dHVyZScsXHJcbiAgICAnW2NsYXNzLmNhbC13ZWVrZW5kXSc6ICdkYXkuaXNXZWVrZW5kJyxcclxuICAgICdbY2xhc3MuY2FsLWluLW1vbnRoXSc6ICdkYXkuaW5Nb250aCcsXHJcbiAgICAnW2NsYXNzLmNhbC1vdXQtbW9udGhdJzogJyFkYXkuaW5Nb250aCcsXHJcbiAgICAnW2NsYXNzLmNhbC1oYXMtZXZlbnRzXSc6ICdkYXkuZXZlbnRzLmxlbmd0aCA+IDAnLFxyXG4gICAgJ1tjbGFzcy5jYWwtb3Blbl0nOiAnZGF5ID09PSBvcGVuRGF5JyxcclxuICAgICdbY2xhc3MuY2FsLWV2ZW50LWhpZ2hsaWdodF0nOiAnISFkYXkuYmFja2dyb3VuZENvbG9yJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBkYXk6IE1vbnRoVmlld0RheTtcclxuXHJcbiAgQElucHV0KCkgb3BlbkRheTogTW9udGhWaWV3RGF5O1xyXG5cclxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgQE91dHB1dCgpIGhpZ2hsaWdodERheTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKSB1bmhpZ2hsaWdodERheTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XHJcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcclxuICB9PigpO1xyXG5cclxuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xyXG5cclxuICB2YWxpZGF0ZURyYWcgPSBpc1dpdGhpblRocmVzaG9sZDtcclxufVxyXG4iXX0=