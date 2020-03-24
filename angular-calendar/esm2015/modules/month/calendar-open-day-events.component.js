import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { isWithinThreshold, trackByEventId } from '../common/util';
export const collapseAnimation = trigger('collapse', [
    state('void', style({
        height: 0,
        overflow: 'hidden',
        'padding-top': 0,
        'padding-bottom': 0
    })),
    state('*', style({
        height: '*',
        overflow: 'hidden',
        'padding-top': '*',
        'padding-bottom': '*'
    })),
    transition('* => void', animate('150ms ease-out')),
    transition('void => *', animate('150ms ease-in'))
]);
let CalendarOpenDayEventsComponent = class CalendarOpenDayEventsComponent {
    constructor() {
        this.isOpen = false;
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CalendarOpenDayEventsComponent.prototype, "locale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], CalendarOpenDayEventsComponent.prototype, "isOpen", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarOpenDayEventsComponent.prototype, "events", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarOpenDayEventsComponent.prototype, "customTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarOpenDayEventsComponent.prototype, "eventTitleTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarOpenDayEventsComponent.prototype, "eventActionsTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Date)
], CalendarOpenDayEventsComponent.prototype, "date", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarOpenDayEventsComponent.prototype, "eventClicked", void 0);
CalendarOpenDayEventsComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-open-day-events',
        template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked"
      let-isOpen="isOpen"
      let-trackByEventId="trackByEventId"
      let-validateDrag="validateDrag"
    >
      <div
        class="cal-open-day-events"
        [@collapse]
        *ngIf="isOpen"
        role="application"
      >
        <span
          tabindex="-1"
          role="alert"
          [attr.aria-label]="
            { date: date, locale: locale } | calendarA11y: 'openDayEventsAlert'
          "
        ></span>
        <span
          tabindex="0"
          role="landmark"
          [attr.aria-label]="
            { date: date, locale: locale }
              | calendarA11y: 'openDayEventsLandmark'
          "
        ></span>
        <div
          *ngFor="let event of events; trackBy: trackByEventId"
          [ngClass]="event?.cssClass"
          mwlDraggable
          [class.cal-draggable]="event.draggable"
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event }"
          [dragAxis]="{ x: event.draggable, y: event.draggable }"
          [validateDrag]="validateDrag"
        >
          <span
            class="cal-event"
            [ngStyle]="{ backgroundColor: event.color?.primary }"
          >
          </span>
          &ngsp;
          <mwl-calendar-event-title
            [event]="event"
            [customTemplate]="eventTitleTemplate"
            view="month"
            (mwlClick)="
              eventClicked.emit({ event: event, sourceEvent: $event })
            "
            (mwlKeydownEnter)="
              eventClicked.emit({ event: event, sourceEvent: $event })
            "
            tabindex="0"
            [attr.aria-label]="
              { event: event, locale: locale }
                | calendarA11y: 'eventDescription'
            "
          >
          </mwl-calendar-event-title>
          &ngsp;
          <mwl-calendar-event-actions
            [event]="event"
            [customTemplate]="eventActionsTemplate"
          >
          </mwl-calendar-event-actions>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        events: events,
        eventClicked: eventClicked,
        isOpen: isOpen,
        trackByEventId: trackByEventId,
        validateDrag: validateDrag
      }"
    >
    </ng-template>
  `,
        animations: [collapseAnimation]
    })
], CalendarOpenDayEventsComponent);
export { CalendarOpenDayEventsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL21vbnRoL2NhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVSLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUE2QixPQUFPLENBQUMsVUFBVSxFQUFFO0lBQzdFLEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDO1FBQ0osTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixhQUFhLEVBQUUsQ0FBQztRQUNoQixnQkFBZ0IsRUFBRSxDQUFDO0tBQ3BCLENBQUMsQ0FDSDtJQUNELEtBQUssQ0FDSCxHQUFHLEVBQ0gsS0FBSyxDQUFDO1FBQ0osTUFBTSxFQUFFLEdBQUc7UUFDWCxRQUFRLEVBQUUsUUFBUTtRQUNsQixhQUFhLEVBQUUsR0FBRztRQUNsQixnQkFBZ0IsRUFBRSxHQUFHO0tBQ3RCLENBQUMsQ0FDSDtJQUNELFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEQsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7Q0FDbEQsQ0FBQyxDQUFDO0FBMEZILElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBeEYzQztRQTJGVyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBYWpDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBRzNCLENBQUM7UUFFTCxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUVoQyxpQkFBWSxHQUFHLGlCQUFpQixDQUFDO0lBQ25DLENBQUM7Q0FBQSxDQUFBO0FBdkJVO0lBQVIsS0FBSyxFQUFFOzs4REFBZ0I7QUFFZjtJQUFSLEtBQUssRUFBRTs7OERBQXlCO0FBRXhCO0lBQVIsS0FBSyxFQUFFOzs4REFBeUI7QUFFeEI7SUFBUixLQUFLLEVBQUU7c0NBQWlCLFdBQVc7c0VBQU07QUFFakM7SUFBUixLQUFLLEVBQUU7c0NBQXFCLFdBQVc7MEVBQU07QUFFckM7SUFBUixLQUFLLEVBQUU7c0NBQXVCLFdBQVc7NEVBQU07QUFFdkM7SUFBUixLQUFLLEVBQUU7c0NBQU8sSUFBSTs0REFBQztBQUdwQjtJQURDLE1BQU0sRUFBRTs7b0VBSUo7QUFuQk0sOEJBQThCO0lBeEYxQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsOEJBQThCO1FBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRlQ7UUFDRCxVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztLQUNoQyxDQUFDO0dBQ1csOEJBQThCLENBd0IxQztTQXhCWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgdHJpZ2dlcixcclxuICBzdHlsZSxcclxuICBzdGF0ZSxcclxuICB0cmFuc2l0aW9uLFxyXG4gIGFuaW1hdGUsXHJcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhXHJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XHJcbmltcG9ydCB7IGlzV2l0aGluVGhyZXNob2xkLCB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuXHJcbmV4cG9ydCBjb25zdCBjb2xsYXBzZUFuaW1hdGlvbjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhID0gdHJpZ2dlcignY29sbGFwc2UnLCBbXHJcbiAgc3RhdGUoXHJcbiAgICAndm9pZCcsXHJcbiAgICBzdHlsZSh7XHJcbiAgICAgIGhlaWdodDogMCxcclxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAncGFkZGluZy10b3AnOiAwLFxyXG4gICAgICAncGFkZGluZy1ib3R0b20nOiAwXHJcbiAgICB9KVxyXG4gICksXHJcbiAgc3RhdGUoXHJcbiAgICAnKicsXHJcbiAgICBzdHlsZSh7XHJcbiAgICAgIGhlaWdodDogJyonLFxyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICdwYWRkaW5nLXRvcCc6ICcqJyxcclxuICAgICAgJ3BhZGRpbmctYm90dG9tJzogJyonXHJcbiAgICB9KVxyXG4gICksXHJcbiAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgYW5pbWF0ZSgnMTUwbXMgZWFzZS1vdXQnKSksXHJcbiAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgYW5pbWF0ZSgnMTUwbXMgZWFzZS1pbicpKVxyXG5dKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXHJcbiAgICAgIGxldC1ldmVudHM9XCJldmVudHNcIlxyXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcclxuICAgICAgbGV0LWlzT3Blbj1cImlzT3BlblwiXHJcbiAgICAgIGxldC10cmFja0J5RXZlbnRJZD1cInRyYWNrQnlFdmVudElkXCJcclxuICAgICAgbGV0LXZhbGlkYXRlRHJhZz1cInZhbGlkYXRlRHJhZ1wiXHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cImNhbC1vcGVuLWRheS1ldmVudHNcIlxyXG4gICAgICAgIFtAY29sbGFwc2VdXHJcbiAgICAgICAgKm5nSWY9XCJpc09wZW5cIlxyXG4gICAgICAgIHJvbGU9XCJhcHBsaWNhdGlvblwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhblxyXG4gICAgICAgICAgdGFiaW5kZXg9XCItMVwiXHJcbiAgICAgICAgICByb2xlPVwiYWxlcnRcIlxyXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcclxuICAgICAgICAgICAgeyBkYXRlOiBkYXRlLCBsb2NhbGU6IGxvY2FsZSB9IHwgY2FsZW5kYXJBMTF5OiAnb3BlbkRheUV2ZW50c0FsZXJ0J1xyXG4gICAgICAgICAgXCJcclxuICAgICAgICA+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuXHJcbiAgICAgICAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgICAgICAgcm9sZT1cImxhbmRtYXJrXCJcclxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXHJcbiAgICAgICAgICAgIHsgZGF0ZTogZGF0ZSwgbG9jYWxlOiBsb2NhbGUgfVxyXG4gICAgICAgICAgICAgIHwgY2FsZW5kYXJBMTF5OiAnb3BlbkRheUV2ZW50c0xhbmRtYXJrJ1xyXG4gICAgICAgICAgXCJcclxuICAgICAgICA+PC9zcGFuPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiBldmVudHM7IHRyYWNrQnk6IHRyYWNrQnlFdmVudElkXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cImV2ZW50Py5jc3NDbGFzc1wiXHJcbiAgICAgICAgICBtd2xEcmFnZ2FibGVcclxuICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cImV2ZW50LmRyYWdnYWJsZVwiXHJcbiAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxyXG4gICAgICAgICAgW2Ryb3BEYXRhXT1cInsgZXZlbnQ6IGV2ZW50IH1cIlxyXG4gICAgICAgICAgW2RyYWdBeGlzXT1cInsgeDogZXZlbnQuZHJhZ2dhYmxlLCB5OiBldmVudC5kcmFnZ2FibGUgfVwiXHJcbiAgICAgICAgICBbdmFsaWRhdGVEcmFnXT1cInZhbGlkYXRlRHJhZ1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogZXZlbnQuY29sb3I/LnByaW1hcnkgfVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAmbmdzcDtcclxuICAgICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGVcclxuICAgICAgICAgICAgW2V2ZW50XT1cImV2ZW50XCJcclxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIHZpZXc9XCJtb250aFwiXHJcbiAgICAgICAgICAgIChtd2xDbGljayk9XCJcclxuICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiBldmVudCwgc291cmNlRXZlbnQ6ICRldmVudCB9KVxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cIlxyXG4gICAgICAgICAgICAgIGV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXHJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXHJcbiAgICAgICAgICAgICAgeyBldmVudDogZXZlbnQsIGxvY2FsZTogbG9jYWxlIH1cclxuICAgICAgICAgICAgICAgIHwgY2FsZW5kYXJBMTF5OiAnZXZlbnREZXNjcmlwdGlvbidcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlPlxyXG4gICAgICAgICAgJm5nc3A7XHJcbiAgICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnNcclxuICAgICAgICAgICAgW2V2ZW50XT1cImV2ZW50XCJcclxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnM+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxyXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxyXG4gICAgICAgIGlzT3BlbjogaXNPcGVuLFxyXG4gICAgICAgIHRyYWNrQnlFdmVudElkOiB0cmFja0J5RXZlbnRJZCxcclxuICAgICAgICB2YWxpZGF0ZURyYWc6IHZhbGlkYXRlRHJhZ1xyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYCxcclxuICBhbmltYXRpb25zOiBbY29sbGFwc2VBbmltYXRpb25dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck9wZW5EYXlFdmVudHNDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W107XHJcblxyXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKSBkYXRlOiBEYXRlO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gIH0+KCk7XHJcblxyXG4gIHRyYWNrQnlFdmVudElkID0gdHJhY2tCeUV2ZW50SWQ7XHJcblxyXG4gIHZhbGlkYXRlRHJhZyA9IGlzV2l0aGluVGhyZXNob2xkO1xyXG59XHJcbiJdfQ==