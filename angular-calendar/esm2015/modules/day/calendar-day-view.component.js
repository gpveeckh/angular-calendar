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
let CalendarDayViewComponent = class CalendarDayViewComponent {
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
    constructor() {
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
};
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
        template: `
    <mwl-calendar-week-view
      class="cal-day-view"
      [daysInWeek]="1"
      [viewDate]="viewDate"
      [events]="events"
      [hourSegments]="hourSegments"
      [hourSegmentHeight]="hourSegmentHeight"
      [dayStartHour]="dayStartHour"
      [dayStartMinute]="dayStartMinute"
      [dayEndHour]="dayEndHour"
      [dayEndMinute]="dayEndMinute"
      [refresh]="refresh"
      [locale]="locale"
      [eventSnapSize]="eventSnapSize"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipAppendToBody]="tooltipAppendToBody"
      [tooltipDelay]="tooltipDelay"
      [hourSegmentTemplate]="hourSegmentTemplate"
      [eventTemplate]="eventTemplate"
      [eventTitleTemplate]="eventTitleTemplate"
      [eventActionsTemplate]="eventActionsTemplate"
      [snapDraggedEvents]="snapDraggedEvents"
      [allDayEventsLabelTemplate]="allDayEventsLabelTemplate"
      [currentTimeMarkerTemplate]="currentTimeMarkerTemplate"
      (eventClicked)="eventClicked.emit($event)"
      (hourSegmentClicked)="hourSegmentClicked.emit($event)"
      (eventTimesChanged)="eventTimesChanged.emit($event)"
      (beforeViewRender)="beforeViewRender.emit($event)"
    ></mwl-calendar-week-view>
  `
    })
], CalendarDayViewComponent);
export { CalendarDayViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU8vQjs7Ozs7Ozs7O0dBU0c7QUFvQ0gsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUE3Q3JDOzs7Ozs7Ozs7T0FTRztJQUNIO1FBeUNFOzs7V0FHRztRQUNNLFdBQU0sR0FBb0IsRUFBRSxDQUFDO1FBRXRDOztXQUVHO1FBQ00saUJBQVksR0FBVyxDQUFDLENBQUM7UUFFbEM7O1dBRUc7UUFDTSxzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFFeEM7O1dBRUc7UUFDTSxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUVsQzs7V0FFRztRQUNNLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBRXBDOztXQUVHO1FBQ00sZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUVqQzs7V0FFRztRQUNNLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBaUJuQzs7V0FFRztRQUNNLHFCQUFnQixHQUFtQixNQUFNLENBQUM7UUFPbkQ7O1dBRUc7UUFDTSx3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFFN0M7OztXQUdHO1FBQ00saUJBQVksR0FBa0IsSUFBSSxDQUFDO1FBc0I1Qzs7V0FFRztRQUNNLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQVkzQzs7V0FFRztRQUNPLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBRXJDLENBQUM7UUFFTDs7V0FFRztRQUNPLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUUzQyxDQUFDO1FBRUw7O1dBRUc7UUFDTyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFFM0MsQ0FBQztRQUVKOzs7V0FHRztRQUNPLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUUxQyxDQUFDO0lBQ04sQ0FBQztDQUFBLENBQUE7QUF6SVU7SUFBUixLQUFLLEVBQUU7c0NBQVcsSUFBSTswREFBQztBQU1mO0lBQVIsS0FBSyxFQUFFOzt3REFBOEI7QUFLN0I7SUFBUixLQUFLLEVBQUU7OzhEQUEwQjtBQUt6QjtJQUFSLEtBQUssRUFBRTs7bUVBQWdDO0FBSy9CO0lBQVIsS0FBSyxFQUFFOzs4REFBMEI7QUFLekI7SUFBUixLQUFLLEVBQUU7O2dFQUE0QjtBQUszQjtJQUFSLEtBQUssRUFBRTs7NERBQXlCO0FBS3hCO0lBQVIsS0FBSyxFQUFFOzs4REFBMkI7QUFLMUI7SUFBUixLQUFLLEVBQUU7c0NBQVUsT0FBTzt5REFBTTtBQUt0QjtJQUFSLEtBQUssRUFBRTs7d0RBQWdCO0FBS2Y7SUFBUixLQUFLLEVBQUU7OytEQUF1QjtBQUt0QjtJQUFSLEtBQUssRUFBRTs7a0VBQTJDO0FBSzFDO0lBQVIsS0FBSyxFQUFFO3NDQUFrQixXQUFXO2lFQUFNO0FBS2xDO0lBQVIsS0FBSyxFQUFFOztxRUFBcUM7QUFNcEM7SUFBUixLQUFLLEVBQUU7OzhEQUFvQztBQUtuQztJQUFSLEtBQUssRUFBRTtzQ0FBc0IsV0FBVztxRUFBTTtBQUt0QztJQUFSLEtBQUssRUFBRTtzQ0FBZ0IsV0FBVzsrREFBTTtBQUtoQztJQUFSLEtBQUssRUFBRTtzQ0FBcUIsV0FBVztvRUFBTTtBQUtyQztJQUFSLEtBQUssRUFBRTtzQ0FBdUIsV0FBVztzRUFBTTtBQUt2QztJQUFSLEtBQUssRUFBRTs7bUVBQW1DO0FBS2xDO0lBQVIsS0FBSyxFQUFFO3NDQUE0QixXQUFXOzJFQUFNO0FBSzVDO0lBQVIsS0FBSyxFQUFFO3NDQUE0QixXQUFXOzJFQUFNO0FBSzNDO0lBQVQsTUFBTSxFQUFFOzs4REFFSjtBQUtLO0lBQVQsTUFBTSxFQUFFOztvRUFFSjtBQUtLO0lBQVQsTUFBTSxFQUFFOzttRUFFTDtBQU1NO0lBQVQsTUFBTSxFQUFFOztrRUFFTDtBQTVJTyx3QkFBd0I7SUFuQ3BDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JUO0tBQ0YsQ0FBQztHQUNXLHdCQUF3QixDQTZJcEM7U0E3SVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudCB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xyXG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQgfSBmcm9tICcuLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcclxuXHJcbmV4cG9ydCB0eXBlIENhbGVuZGFyRGF5Vmlld0JlZm9yZVJlbmRlckV2ZW50ID0gQ2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50O1xyXG5cclxuLyoqXHJcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiBkYXkuIEV4YW1wbGUgdXNhZ2U6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogPG13bC1jYWxlbmRhci1kYXktdmlld1xyXG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcclxuICogIFtldmVudHNdPVwiZXZlbnRzXCI+XHJcbiAqIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3PlxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWRheS12aWV3JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXdcclxuICAgICAgY2xhc3M9XCJjYWwtZGF5LXZpZXdcIlxyXG4gICAgICBbZGF5c0luV2Vla109XCIxXCJcclxuICAgICAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcclxuICAgICAgW2V2ZW50c109XCJldmVudHNcIlxyXG4gICAgICBbaG91clNlZ21lbnRzXT1cImhvdXJTZWdtZW50c1wiXHJcbiAgICAgIFtob3VyU2VnbWVudEhlaWdodF09XCJob3VyU2VnbWVudEhlaWdodFwiXHJcbiAgICAgIFtkYXlTdGFydEhvdXJdPVwiZGF5U3RhcnRIb3VyXCJcclxuICAgICAgW2RheVN0YXJ0TWludXRlXT1cImRheVN0YXJ0TWludXRlXCJcclxuICAgICAgW2RheUVuZEhvdXJdPVwiZGF5RW5kSG91clwiXHJcbiAgICAgIFtkYXlFbmRNaW51dGVdPVwiZGF5RW5kTWludXRlXCJcclxuICAgICAgW3JlZnJlc2hdPVwicmVmcmVzaFwiXHJcbiAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgW2V2ZW50U25hcFNpemVdPVwiZXZlbnRTbmFwU2l6ZVwiXHJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxyXG4gICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXHJcbiAgICAgIFtob3VyU2VnbWVudFRlbXBsYXRlXT1cImhvdXJTZWdtZW50VGVtcGxhdGVcIlxyXG4gICAgICBbZXZlbnRUZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcclxuICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxyXG4gICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxyXG4gICAgICBbc25hcERyYWdnZWRFdmVudHNdPVwic25hcERyYWdnZWRFdmVudHNcIlxyXG4gICAgICBbYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZV09XCJhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlXCJcclxuICAgICAgW2N1cnJlbnRUaW1lTWFya2VyVGVtcGxhdGVdPVwiY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZVwiXHJcbiAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIChob3VyU2VnbWVudENsaWNrZWQpPVwiaG91clNlZ21lbnRDbGlja2VkLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIChldmVudFRpbWVzQ2hhbmdlZCk9XCJldmVudFRpbWVzQ2hhbmdlZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoYmVmb3JlVmlld1JlbmRlcik9XCJiZWZvcmVWaWV3UmVuZGVyLmVtaXQoJGV2ZW50KVwiXHJcbiAgICA+PC9td2wtY2FsZW5kYXItd2Vlay12aWV3PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcclxuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIGluIGFuIGhvdXIuIE11c3QgYmUgPD0gNlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBpbiBwaXhlbHMgb2YgZWFjaCBob3VyIHNlZ21lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgc3RhcnQgbWludXRlcy4gTXVzdCBiZSAwLTU5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyID0gNTk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ3JpZCBzaXplIHRvIHNuYXAgcmVzaXppbmcgYW5kIGRyYWdnaW5nIG9mIGV2ZW50cyB0b1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV2ZW50U25hcFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHBsYWNlbWVudCBvZiB0aGUgZXZlbnQgdG9vbHRpcFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2F1dG8nO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSB0b29sdGlwIHNob3VsZCBiZSBkaXNwbGF5ZWQuIElmIG5vdCBwcm92aWRlZCB0aGUgdG9vbHRpcFxyXG4gICAqIHdpbGwgYmUgZGlzcGxheWVkIGltbWVkaWF0ZWx5LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBob3VyIHNlZ21lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGRheSB2aWV3IGV2ZW50c1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgdGl0bGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IGFjdGlvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBzbmFwIGV2ZW50cyB0byBhIGdyaWQgd2hlbiBkcmFnZ2luZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNuYXBEcmFnZ2VkRXZlbnRzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgYWxsIGRheSBldmVudHMgbGFiZWwgdGV4dFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFsbERheUV2ZW50c0xhYmVsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGN1cnJlbnQgdGltZSBtYXJrZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCB0aXRsZSBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gYW4gaG91ciBzZWdtZW50IGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgaG91clNlZ21lbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBkYXRlOiBEYXRlO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIHJlc2l6ZWQgb3IgZHJhZ2dlZCBhbmQgZHJvcHBlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBldmVudFRpbWVzQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8XHJcbiAgICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRcclxuICA+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgZGF5LlxyXG4gICAqIElmIHlvdSBhZGQgdGhlIGBjc3NDbGFzc2AgcHJvcGVydHkgdG8gYW4gaG91ciBncmlkIHNlZ21lbnQgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgaG91ciBzZWdtZW50IGluIHRoZSB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIENhbGVuZGFyRGF5Vmlld0JlZm9yZVJlbmRlckV2ZW50XHJcbiAgPigpO1xyXG59XHJcbiJdfQ==