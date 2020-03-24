import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
var CalendarDayViewComponent = /** @class */ (function () {
    function CalendarDayViewComponent() {
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current day.
         * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
         */
        this.beforeViewRender = new EventEmitter();
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], CalendarDayViewComponent.prototype, "viewDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CalendarDayViewComponent.prototype, "events", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "hourSegments", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "hourSegmentHeight", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "dayStartHour", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "dayStartMinute", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "dayEndHour", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "dayEndMinute", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Subject)
    ], CalendarDayViewComponent.prototype, "refresh", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarDayViewComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "eventSnapSize", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarDayViewComponent.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarDayViewComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CalendarDayViewComponent.prototype, "tooltipAppendToBody", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarDayViewComponent.prototype, "tooltipDelay", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarDayViewComponent.prototype, "hourSegmentTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarDayViewComponent.prototype, "eventTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarDayViewComponent.prototype, "eventTitleTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarDayViewComponent.prototype, "eventActionsTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CalendarDayViewComponent.prototype, "snapDraggedEvents", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarDayViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarDayViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarDayViewComponent.prototype, "eventClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarDayViewComponent.prototype, "hourSegmentClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarDayViewComponent.prototype, "eventTimesChanged", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarDayViewComponent.prototype, "beforeViewRender", void 0);
    CalendarDayViewComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-day-view',
            template: "\n    <mwl-calendar-week-view\n      class=\"cal-day-view\"\n      [daysInWeek]=\"1\"\n      [viewDate]=\"viewDate\"\n      [events]=\"events\"\n      [hourSegments]=\"hourSegments\"\n      [hourSegmentHeight]=\"hourSegmentHeight\"\n      [dayStartHour]=\"dayStartHour\"\n      [dayStartMinute]=\"dayStartMinute\"\n      [dayEndHour]=\"dayEndHour\"\n      [dayEndMinute]=\"dayEndMinute\"\n      [refresh]=\"refresh\"\n      [locale]=\"locale\"\n      [eventSnapSize]=\"eventSnapSize\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipAppendToBody]=\"tooltipAppendToBody\"\n      [tooltipDelay]=\"tooltipDelay\"\n      [hourSegmentTemplate]=\"hourSegmentTemplate\"\n      [eventTemplate]=\"eventTemplate\"\n      [eventTitleTemplate]=\"eventTitleTemplate\"\n      [eventActionsTemplate]=\"eventActionsTemplate\"\n      [snapDraggedEvents]=\"snapDraggedEvents\"\n      [allDayEventsLabelTemplate]=\"allDayEventsLabelTemplate\"\n      [currentTimeMarkerTemplate]=\"currentTimeMarkerTemplate\"\n      (eventClicked)=\"eventClicked.emit($event)\"\n      (hourSegmentClicked)=\"hourSegmentClicked.emit($event)\"\n      (eventTimesChanged)=\"eventTimesChanged.emit($event)\"\n      (beforeViewRender)=\"beforeViewRender.emit($event)\"\n    ></mwl-calendar-week-view>\n  "
        })
    ], CalendarDayViewComponent);
    return CalendarDayViewComponent;
}());
export { CalendarDayViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU8vQjs7Ozs7Ozs7O0dBU0c7QUFvQ0g7SUFuQ0E7UUF5Q0U7OztXQUdHO1FBQ00sV0FBTSxHQUFvQixFQUFFLENBQUM7UUFFdEM7O1dBRUc7UUFDTSxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUVsQzs7V0FFRztRQUNNLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUV4Qzs7V0FFRztRQUNNLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRWxDOztXQUVHO1FBQ00sbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFFcEM7O1dBRUc7UUFDTSxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRWpDOztXQUVHO1FBQ00saUJBQVksR0FBVyxFQUFFLENBQUM7UUFpQm5DOztXQUVHO1FBQ00scUJBQWdCLEdBQW1CLE1BQU0sQ0FBQztRQU9uRDs7V0FFRztRQUNNLHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUU3Qzs7O1dBR0c7UUFDTSxpQkFBWSxHQUFrQixJQUFJLENBQUM7UUFzQjVDOztXQUVHO1FBQ00sc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBWTNDOztXQUVHO1FBQ08saUJBQVksR0FBRyxJQUFJLFlBQVksRUFFckMsQ0FBQztRQUVMOztXQUVHO1FBQ08sdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBRTNDLENBQUM7UUFFTDs7V0FFRztRQUNPLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUUzQyxDQUFDO1FBRUo7OztXQUdHO1FBQ08scUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBRTFDLENBQUM7SUFDTixDQUFDO0lBeklVO1FBQVIsS0FBSyxFQUFFOzBDQUFXLElBQUk7OERBQUM7SUFNZjtRQUFSLEtBQUssRUFBRTs7NERBQThCO0lBSzdCO1FBQVIsS0FBSyxFQUFFOztrRUFBMEI7SUFLekI7UUFBUixLQUFLLEVBQUU7O3VFQUFnQztJQUsvQjtRQUFSLEtBQUssRUFBRTs7a0VBQTBCO0lBS3pCO1FBQVIsS0FBSyxFQUFFOztvRUFBNEI7SUFLM0I7UUFBUixLQUFLLEVBQUU7O2dFQUF5QjtJQUt4QjtRQUFSLEtBQUssRUFBRTs7a0VBQTJCO0lBSzFCO1FBQVIsS0FBSyxFQUFFOzBDQUFVLE9BQU87NkRBQU07SUFLdEI7UUFBUixLQUFLLEVBQUU7OzREQUFnQjtJQUtmO1FBQVIsS0FBSyxFQUFFOzttRUFBdUI7SUFLdEI7UUFBUixLQUFLLEVBQUU7O3NFQUEyQztJQUsxQztRQUFSLEtBQUssRUFBRTswQ0FBa0IsV0FBVztxRUFBTTtJQUtsQztRQUFSLEtBQUssRUFBRTs7eUVBQXFDO0lBTXBDO1FBQVIsS0FBSyxFQUFFOztrRUFBb0M7SUFLbkM7UUFBUixLQUFLLEVBQUU7MENBQXNCLFdBQVc7eUVBQU07SUFLdEM7UUFBUixLQUFLLEVBQUU7MENBQWdCLFdBQVc7bUVBQU07SUFLaEM7UUFBUixLQUFLLEVBQUU7MENBQXFCLFdBQVc7d0VBQU07SUFLckM7UUFBUixLQUFLLEVBQUU7MENBQXVCLFdBQVc7MEVBQU07SUFLdkM7UUFBUixLQUFLLEVBQUU7O3VFQUFtQztJQUtsQztRQUFSLEtBQUssRUFBRTswQ0FBNEIsV0FBVzsrRUFBTTtJQUs1QztRQUFSLEtBQUssRUFBRTswQ0FBNEIsV0FBVzsrRUFBTTtJQUszQztRQUFULE1BQU0sRUFBRTs7a0VBRUo7SUFLSztRQUFULE1BQU0sRUFBRTs7d0VBRUo7SUFLSztRQUFULE1BQU0sRUFBRTs7dUVBRUw7SUFNTTtRQUFULE1BQU0sRUFBRTs7c0VBRUw7SUE1SU8sd0JBQXdCO1FBbkNwQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSwyeUNBK0JUO1NBQ0YsQ0FBQztPQUNXLHdCQUF3QixDQTZJcEM7SUFBRCwrQkFBQztDQUFBLEFBN0lELElBNklDO1NBN0lZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtdGltZXMtY2hhbmdlZC1ldmVudC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50IH0gZnJvbSAnLi4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgdHlwZSBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudCA9IENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudDtcclxuXHJcbi8qKlxyXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gZGF5LiBFeGFtcGxlIHVzYWdlOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIDxtd2wtY2FsZW5kYXItZGF5LXZpZXdcclxuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXHJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxyXG4gKiA8L213bC1jYWxlbmRhci1kYXktdmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1kYXktdmlldycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3XHJcbiAgICAgIGNsYXNzPVwiY2FsLWRheS12aWV3XCJcclxuICAgICAgW2RheXNJbldlZWtdPVwiMVwiXHJcbiAgICAgIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXHJcbiAgICAgIFtldmVudHNdPVwiZXZlbnRzXCJcclxuICAgICAgW2hvdXJTZWdtZW50c109XCJob3VyU2VnbWVudHNcIlxyXG4gICAgICBbaG91clNlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxyXG4gICAgICBbZGF5U3RhcnRIb3VyXT1cImRheVN0YXJ0SG91clwiXHJcbiAgICAgIFtkYXlTdGFydE1pbnV0ZV09XCJkYXlTdGFydE1pbnV0ZVwiXHJcbiAgICAgIFtkYXlFbmRIb3VyXT1cImRheUVuZEhvdXJcIlxyXG4gICAgICBbZGF5RW5kTWludXRlXT1cImRheUVuZE1pbnV0ZVwiXHJcbiAgICAgIFtyZWZyZXNoXT1cInJlZnJlc2hcIlxyXG4gICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgIFtldmVudFNuYXBTaXplXT1cImV2ZW50U25hcFNpemVcIlxyXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcclxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcclxuICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxyXG4gICAgICBbaG91clNlZ21lbnRUZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcclxuICAgICAgW2V2ZW50VGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXHJcbiAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcclxuICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcclxuICAgICAgW3NuYXBEcmFnZ2VkRXZlbnRzXT1cInNuYXBEcmFnZ2VkRXZlbnRzXCJcclxuICAgICAgW2FsbERheUV2ZW50c0xhYmVsVGVtcGxhdGVdPVwiYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZVwiXHJcbiAgICAgIFtjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlXT1cImN1cnJlbnRUaW1lTWFya2VyVGVtcGxhdGVcIlxyXG4gICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoaG91clNlZ21lbnRDbGlja2VkKT1cImhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoZXZlbnRUaW1lc0NoYW5nZWQpPVwiZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGJlZm9yZVZpZXdSZW5kZXIpPVwiYmVmb3JlVmlld1JlbmRlci5lbWl0KCRldmVudClcIlxyXG4gICAgPjwvbXdsLWNhbGVuZGFyLXdlZWstdmlldz5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheVZpZXdDb21wb25lbnQge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XHJcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiBzZWdtZW50cyBpbiBhbiBob3VyLiBNdXN0IGJlIDw9IDZcclxuICAgKi9cclxuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWlnaHQgaW4gcGl4ZWxzIG9mIGVhY2ggaG91ciBzZWdtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlciA9IDMwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IHN0YXJ0IGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlciA9IDIzO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IGVuZCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xyXG5cclxuICAvKipcclxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSByZWZyZXNoOiBTdWJqZWN0PGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdyaWQgc2l6ZSB0byBzbmFwIHJlc2l6aW5nIGFuZCBkcmFnZ2luZyBvZiBldmVudHMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudFNuYXBTaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gYXBwZW5kIHRvb2x0aXBzIHRvIHRoZSBib2R5IG9yIG5leHQgdG8gdGhlIHRyaWdnZXIgZWxlbWVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkLiBJZiBub3QgcHJvdmlkZWQgdGhlIHRvb2x0aXBcclxuICAgKiB3aWxsIGJlIGRpc3BsYXllZCBpbW1lZGlhdGVseS5cclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgaG91clNlZ21lbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBkYXkgdmlldyBldmVudHNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCBhY3Rpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gc25hcCBldmVudHMgdG8gYSBncmlkIHdoZW4gZHJhZ2dpbmdcclxuICAgKi9cclxuICBASW5wdXQoKSBzbmFwRHJhZ2dlZEV2ZW50czogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGFsbCBkYXkgZXZlbnRzIGxhYmVsIHRleHRcclxuICAgKi9cclxuICBASW5wdXQoKSBhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBjdXJyZW50IHRpbWUgbWFya2VyXHJcbiAgICovXHJcbiAgQElucHV0KCkgY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIGFuIGhvdXIgc2VnbWVudCBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGhvdXJTZWdtZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZGF0ZTogRGF0ZTtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyByZXNpemVkIG9yIGRyYWdnZWQgYW5kIGRyb3BwZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgZXZlbnRUaW1lc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50XHJcbiAgPigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBvdXRwdXQgdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgdGhlIHZpZXcgaXMgcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IGRheS5cclxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGFuIGhvdXIgZ3JpZCBzZWdtZW50IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhvdXIgc2VnbWVudCBpbiB0aGUgdGVtcGxhdGVcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYmVmb3JlVmlld1JlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8XHJcbiAgICBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudFxyXG4gID4oKTtcclxufVxyXG4iXX0=