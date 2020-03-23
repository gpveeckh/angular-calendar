import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
let CalendarWeekViewEventComponent = class CalendarWeekViewEventComponent {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CalendarWeekViewEventComponent.prototype, "locale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewEventComponent.prototype, "weekEvent", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewEventComponent.prototype, "tooltipPlacement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], CalendarWeekViewEventComponent.prototype, "tooltipAppendToBody", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], CalendarWeekViewEventComponent.prototype, "tooltipDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewEventComponent.prototype, "tooltipDelay", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewEventComponent.prototype, "customTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewEventComponent.prototype, "eventTitleTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewEventComponent.prototype, "eventActionsTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewEventComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewEventComponent.prototype, "column", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewEventComponent.prototype, "daysInWeek", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewEventComponent.prototype, "eventClicked", void 0);
CalendarWeekViewEventComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-week-view-event',
        template: `
    <ng-template
      #defaultTemplate
      let-weekEvent="weekEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDisabled="tooltipDisabled"
      let-tooltipDelay="tooltipDelay"
      let-column="column"
      let-daysInWeek="daysInWeek"
    >
      <div
        class="cal-event"
        [ngStyle]="{
          backgroundColor: weekEvent.event.color?.secondary,
          borderColor: weekEvent.event.color?.primary
        }"
        [mwlCalendarTooltip]="
          !tooltipDisabled
            ? (weekEvent.event.title
              | calendarEventTitle
                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')
                : weekEvent.event)
            : ''
        "
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="weekEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody"
        [tooltipDelay]="tooltipDelay"
        (mwlClick)="eventClicked.emit({ sourceEvent: $event })"
        (mwlKeydownEnter)="eventClicked.emit({ sourceEvent: $event })"
        tabindex="0"
        role="application"
        [attr.aria-label]="
          { event: weekEvent.event, locale: locale }
            | calendarA11y: 'eventDescription'
        "
      >
        <mwl-calendar-event-actions
          [event]="weekEvent.event"
          [customTemplate]="eventActionsTemplate"
        >
        </mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="weekEvent.event"
          [customTemplate]="eventTitleTemplate"
          [view]="daysInWeek === 1 ? 'day' : 'week'"
        >
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekEvent: weekEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDisabled: tooltipDisabled,
        tooltipDelay: tooltipDelay,
        column: column,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `
    })
], CalendarWeekViewEventComponent);
export { CalendarWeekViewEventComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFrRnZCLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBMUUzQztRQW1HWSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUVyQyxDQUFDO0lBQ1AsQ0FBQztDQUFBLENBQUE7QUEzQlU7SUFBUixLQUFLLEVBQUU7OzhEQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFOztpRUFBb0Q7QUFFbkQ7SUFBUixLQUFLLEVBQUU7O3dFQUFrQztBQUVqQztJQUFSLEtBQUssRUFBRTs7MkVBQThCO0FBRTdCO0lBQVIsS0FBSyxFQUFFOzt1RUFBMEI7QUFFekI7SUFBUixLQUFLLEVBQUU7O29FQUE2QjtBQUU1QjtJQUFSLEtBQUssRUFBRTtzQ0FBaUIsV0FBVztzRUFBTTtBQUVqQztJQUFSLEtBQUssRUFBRTtzQ0FBcUIsV0FBVzswRUFBTTtBQUVyQztJQUFSLEtBQUssRUFBRTtzQ0FBdUIsV0FBVzs0RUFBTTtBQUV2QztJQUFSLEtBQUssRUFBRTtzQ0FBa0IsV0FBVzt1RUFBTTtBQUVsQztJQUFSLEtBQUssRUFBRTs7OERBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFOztrRUFBb0I7QUFFbEI7SUFBVCxNQUFNLEVBQUU7O29FQUVKO0FBM0JNLDhCQUE4QjtJQTFFMUMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDhCQUE4QjtRQUN4QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRVQ7S0FDRixDQUFDO0dBQ1csOEJBQThCLENBNEIxQztTQTVCWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudCxcclxuICBXZWVrVmlld1RpbWVFdmVudCxcclxuICBXZWVrVmlld0hvdXJDb2x1bW5cclxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XHJcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcclxuICAgICAgbGV0LXdlZWtFdmVudD1cIndlZWtFdmVudFwiXHJcbiAgICAgIGxldC10b29sdGlwUGxhY2VtZW50PVwidG9vbHRpcFBsYWNlbWVudFwiXHJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIlxyXG4gICAgICBsZXQtdG9vbHRpcFRlbXBsYXRlPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgbGV0LXRvb2x0aXBBcHBlbmRUb0JvZHk9XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcclxuICAgICAgbGV0LXRvb2x0aXBEaXNhYmxlZD1cInRvb2x0aXBEaXNhYmxlZFwiXHJcbiAgICAgIGxldC10b29sdGlwRGVsYXk9XCJ0b29sdGlwRGVsYXlcIlxyXG4gICAgICBsZXQtY29sdW1uPVwiY29sdW1uXCJcclxuICAgICAgbGV0LWRheXNJbldlZWs9XCJkYXlzSW5XZWVrXCJcclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcclxuICAgICAgICBbbmdTdHlsZV09XCJ7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHdlZWtFdmVudC5ldmVudC5jb2xvcj8uc2Vjb25kYXJ5LFxyXG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHdlZWtFdmVudC5ldmVudC5jb2xvcj8ucHJpbWFyeVxyXG4gICAgICAgIH1cIlxyXG4gICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiXHJcbiAgICAgICAgICAhdG9vbHRpcERpc2FibGVkXHJcbiAgICAgICAgICAgID8gKHdlZWtFdmVudC5ldmVudC50aXRsZVxyXG4gICAgICAgICAgICAgIHwgY2FsZW5kYXJFdmVudFRpdGxlXHJcbiAgICAgICAgICAgICAgICA6IChkYXlzSW5XZWVrID09PSAxID8gJ2RheVRvb2x0aXAnIDogJ3dlZWtUb29sdGlwJylcclxuICAgICAgICAgICAgICAgIDogd2Vla0V2ZW50LmV2ZW50KVxyXG4gICAgICAgICAgICA6ICcnXHJcbiAgICAgICAgXCJcclxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcclxuICAgICAgICBbdG9vbHRpcEV2ZW50XT1cIndlZWtFdmVudC5ldmVudFwiXHJcbiAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxyXG4gICAgICAgIFt0b29sdGlwRGVsYXldPVwidG9vbHRpcERlbGF5XCJcclxuICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcclxuICAgICAgICByb2xlPVwiYXBwbGljYXRpb25cIlxyXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXHJcbiAgICAgICAgICB7IGV2ZW50OiB3ZWVrRXZlbnQuZXZlbnQsIGxvY2FsZTogbG9jYWxlIH1cclxuICAgICAgICAgICAgfCBjYWxlbmRhckExMXk6ICdldmVudERlc2NyaXB0aW9uJ1xyXG4gICAgICAgIFwiXHJcbiAgICAgID5cclxuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnNcclxuICAgICAgICAgIFtldmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxyXG4gICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cclxuICAgICAgICAmbmdzcDtcclxuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlXHJcbiAgICAgICAgICBbZXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCJcclxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgW3ZpZXddPVwiZGF5c0luV2VlayA9PT0gMSA/ICdkYXknIDogJ3dlZWsnXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtdGl0bGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIHdlZWtFdmVudDogd2Vla0V2ZW50LFxyXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXHJcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXHJcbiAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiB0b29sdGlwVGVtcGxhdGUsXHJcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keSxcclxuICAgICAgICB0b29sdGlwRGlzYWJsZWQ6IHRvb2x0aXBEaXNhYmxlZCxcclxuICAgICAgICB0b29sdGlwRGVsYXk6IHRvb2x0aXBEZWxheSxcclxuICAgICAgICBjb2x1bW46IGNvbHVtbixcclxuICAgICAgICBkYXlzSW5XZWVrOiBkYXlzSW5XZWVrXHJcbiAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3RXZlbnRDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudDtcclxuXHJcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKSBjb2x1bW46IFdlZWtWaWV3SG91ckNvbHVtbjtcclxuXHJcbiAgQElucHV0KCkgZGF5c0luV2VlazogbnVtYmVyO1xyXG5cclxuICBAT3V0cHV0KCkgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgfT4oKTtcclxufVxyXG4iXX0=