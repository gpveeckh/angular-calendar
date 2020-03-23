import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
var CalendarWeekViewEventComponent = /** @class */ (function () {
    function CalendarWeekViewEventComponent() {
        this.eventClicked = new EventEmitter();
    }
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
            template: "\n    <ng-template\n      #defaultTemplate\n      let-weekEvent=\"weekEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDisabled=\"tooltipDisabled\"\n      let-tooltipDelay=\"tooltipDelay\"\n      let-column=\"column\"\n      let-daysInWeek=\"daysInWeek\"\n    >\n      <div\n        class=\"cal-event\"\n        [ngStyle]=\"{\n          backgroundColor: weekEvent.event.color?.secondary,\n          borderColor: weekEvent.event.color?.primary\n        }\"\n        [mwlCalendarTooltip]=\"\n          !tooltipDisabled\n            ? (weekEvent.event.title\n              | calendarEventTitle\n                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')\n                : weekEvent.event)\n            : ''\n        \"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"weekEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\"\n        [tooltipDelay]=\"tooltipDelay\"\n        (mwlClick)=\"eventClicked.emit({ sourceEvent: $event })\"\n        (mwlKeydownEnter)=\"eventClicked.emit({ sourceEvent: $event })\"\n        tabindex=\"0\"\n        role=\"application\"\n        [attr.aria-label]=\"\n          { event: weekEvent.event, locale: locale }\n            | calendarA11y: 'eventDescription'\n        \"\n      >\n        <mwl-calendar-event-actions\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventActionsTemplate\"\n        >\n        </mwl-calendar-event-actions>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          [view]=\"daysInWeek === 1 ? 'day' : 'week'\"\n        >\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        weekEvent: weekEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDisabled: tooltipDisabled,\n        tooltipDelay: tooltipDelay,\n        column: column,\n        daysInWeek: daysInWeek\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarWeekViewEventComponent);
    return CalendarWeekViewEventComponent;
}());
export { CalendarWeekViewEventComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFrRnZCO0lBMUVBO1FBbUdZLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBRXJDLENBQUM7SUFDUCxDQUFDO0lBM0JVO1FBQVIsS0FBSyxFQUFFOztrRUFBZ0I7SUFFZjtRQUFSLEtBQUssRUFBRTs7cUVBQW9EO0lBRW5EO1FBQVIsS0FBSyxFQUFFOzs0RUFBa0M7SUFFakM7UUFBUixLQUFLLEVBQUU7OytFQUE4QjtJQUU3QjtRQUFSLEtBQUssRUFBRTs7MkVBQTBCO0lBRXpCO1FBQVIsS0FBSyxFQUFFOzt3RUFBNkI7SUFFNUI7UUFBUixLQUFLLEVBQUU7MENBQWlCLFdBQVc7MEVBQU07SUFFakM7UUFBUixLQUFLLEVBQUU7MENBQXFCLFdBQVc7OEVBQU07SUFFckM7UUFBUixLQUFLLEVBQUU7MENBQXVCLFdBQVc7Z0ZBQU07SUFFdkM7UUFBUixLQUFLLEVBQUU7MENBQWtCLFdBQVc7MkVBQU07SUFFbEM7UUFBUixLQUFLLEVBQUU7O2tFQUE0QjtJQUUzQjtRQUFSLEtBQUssRUFBRTs7c0VBQW9CO0lBRWxCO1FBQVQsTUFBTSxFQUFFOzt3RUFFSjtJQTNCTSw4QkFBOEI7UUExRTFDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsUUFBUSxFQUFFLDI0RUFzRVQ7U0FDRixDQUFDO09BQ1csOEJBQThCLENBNEIxQztJQUFELHFDQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0E1QlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIFdlZWtWaWV3QWxsRGF5RXZlbnQsXHJcbiAgV2Vla1ZpZXdUaW1lRXZlbnQsXHJcbiAgV2Vla1ZpZXdIb3VyQ29sdW1uXHJcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXHJcbiAgICAgIGxldC13ZWVrRXZlbnQ9XCJ3ZWVrRXZlbnRcIlxyXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcclxuICAgICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXHJcbiAgICAgIGxldC10b29sdGlwRGlzYWJsZWQ9XCJ0b29sdGlwRGlzYWJsZWRcIlxyXG4gICAgICBsZXQtdG9vbHRpcERlbGF5PVwidG9vbHRpcERlbGF5XCJcclxuICAgICAgbGV0LWNvbHVtbj1cImNvbHVtblwiXHJcbiAgICAgIGxldC1kYXlzSW5XZWVrPVwiZGF5c0luV2Vla1wiXHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB3ZWVrRXZlbnQuZXZlbnQuY29sb3I/LnNlY29uZGFyeSxcclxuICAgICAgICAgIGJvcmRlckNvbG9yOiB3ZWVrRXZlbnQuZXZlbnQuY29sb3I/LnByaW1hcnlcclxuICAgICAgICB9XCJcclxuICAgICAgICBbbXdsQ2FsZW5kYXJUb29sdGlwXT1cIlxyXG4gICAgICAgICAgIXRvb2x0aXBEaXNhYmxlZFxyXG4gICAgICAgICAgICA/ICh3ZWVrRXZlbnQuZXZlbnQudGl0bGVcclxuICAgICAgICAgICAgICB8IGNhbGVuZGFyRXZlbnRUaXRsZVxyXG4gICAgICAgICAgICAgICAgOiAoZGF5c0luV2VlayA9PT0gMSA/ICdkYXlUb29sdGlwJyA6ICd3ZWVrVG9vbHRpcCcpXHJcbiAgICAgICAgICAgICAgICA6IHdlZWtFdmVudC5ldmVudClcclxuICAgICAgICAgICAgOiAnJ1xyXG4gICAgICAgIFwiXHJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXHJcbiAgICAgICAgW3Rvb2x0aXBFdmVudF09XCJ3ZWVrRXZlbnQuZXZlbnRcIlxyXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcclxuICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXHJcbiAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgKG13bEtleWRvd25FbnRlcik9XCJldmVudENsaWNrZWQuZW1pdCh7IHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxyXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXHJcbiAgICAgICAgcm9sZT1cImFwcGxpY2F0aW9uXCJcclxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxyXG4gICAgICAgICAgeyBldmVudDogd2Vla0V2ZW50LmV2ZW50LCBsb2NhbGU6IGxvY2FsZSB9XHJcbiAgICAgICAgICAgIHwgY2FsZW5kYXJBMTF5OiAnZXZlbnREZXNjcmlwdGlvbidcclxuICAgICAgICBcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zXHJcbiAgICAgICAgICBbZXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCJcclxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnM+XHJcbiAgICAgICAgJm5nc3A7XHJcbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC10aXRsZVxyXG4gICAgICAgICAgW2V2ZW50XT1cIndlZWtFdmVudC5ldmVudFwiXHJcbiAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcclxuICAgICAgICAgIFt2aWV3XT1cImRheXNJbldlZWsgPT09IDEgPyAnZGF5JyA6ICd3ZWVrJ1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcclxuICAgICAgICB3ZWVrRXZlbnQ6IHdlZWtFdmVudCxcclxuICAgICAgICB0b29sdGlwUGxhY2VtZW50OiB0b29sdGlwUGxhY2VtZW50LFxyXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxyXG4gICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogdG9vbHRpcFRlbXBsYXRlLFxyXG4gICAgICAgIHRvb2x0aXBBcHBlbmRUb0JvZHk6IHRvb2x0aXBBcHBlbmRUb0JvZHksXHJcbiAgICAgICAgdG9vbHRpcERpc2FibGVkOiB0b29sdGlwRGlzYWJsZWQsXHJcbiAgICAgICAgdG9vbHRpcERlbGF5OiB0b29sdGlwRGVsYXksXHJcbiAgICAgICAgY29sdW1uOiBjb2x1bW4sXHJcbiAgICAgICAgZGF5c0luV2VlazogZGF5c0luV2Vla1xyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgd2Vla0V2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50IHwgV2Vla1ZpZXdUaW1lRXZlbnQ7XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xyXG5cclxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBEZWxheTogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCkgY29sdW1uOiBXZWVrVmlld0hvdXJDb2x1bW47XHJcblxyXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcclxuXHJcbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gIH0+KCk7XHJcbn1cclxuIl19