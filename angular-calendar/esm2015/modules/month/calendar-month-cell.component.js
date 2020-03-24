import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { isWithinThreshold, trackByEventId } from '../common/util';
let CalendarMonthCellComponent = class CalendarMonthCellComponent {
    constructor() {
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
        this.validateDrag = isWithinThreshold;
    }
};
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
        template: `
    <ng-template
      #defaultTemplate
      let-day="day"
      let-openDay="openDay"
      let-locale="locale"
      let-tooltipPlacement="tooltipPlacement"
      let-highlightDay="highlightDay"
      let-unhighlightDay="unhighlightDay"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDelay="tooltipDelay"
      let-trackByEventId="trackByEventId"
      let-validateDrag="validateDrag"
    >
      <div
        class="cal-cell-top"
        [attr.aria-label]="
          { day: day, locale: locale } | calendarA11y: 'monthCell'
        "
      >
        <span aria-hidden="true">
          <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{
            day.badgeTotal
          }}</span>
          <span class="cal-day-number">{{
            day.date | calendarDate: 'monthViewDayNumber':locale
          }}</span>
        </span>
      </div>
      <div class="cal-events" *ngIf="day.events.length > 0">
        <div
          class="cal-event"
          *ngFor="let event of day.events; trackBy: trackByEventId"
          [ngStyle]="{ backgroundColor: event.color?.primary }"
          [ngClass]="event?.cssClass"
          (mouseenter)="highlightDay.emit({ event: event })"
          (mouseleave)="unhighlightDay.emit({ event: event })"
          [mwlCalendarTooltip]="
            event.title | calendarEventTitle: 'monthTooltip':event
          "
          [tooltipPlacement]="tooltipPlacement"
          [tooltipEvent]="event"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipAppendToBody]="tooltipAppendToBody"
          [tooltipDelay]="tooltipDelay"
          mwlDraggable
          [class.cal-draggable]="event.draggable"
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event, draggedFrom: day }"
          [dragAxis]="{ x: event.draggable, y: event.draggable }"
          [validateDrag]="validateDrag"
          (mwlClick)="eventClicked.emit({ event: event, sourceEvent: $event })"
          [attr.aria-hidden]="{} | calendarA11y: 'hideMonthCellEvents'"
        ></div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        openDay: openDay,
        locale: locale,
        tooltipPlacement: tooltipPlacement,
        highlightDay: highlightDay,
        unhighlightDay: unhighlightDay,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDelay: tooltipDelay,
        trackByEventId: trackByEventId,
        validateDrag: validateDrag
      }"
    >
    </ng-template>
  `,
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
export { CalendarMonthCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBK0ZuRSxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQTVGdkM7UUE2R1ksaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyRCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pFLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBRzNCLENBQUM7UUFFTCxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUVoQyxpQkFBWSxHQUFHLGlCQUFpQixDQUFDO0lBQ25DLENBQUM7Q0FBQSxDQUFBO0FBN0JVO0lBQVIsS0FBSyxFQUFFOzt1REFBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7OzJEQUF1QjtBQUV0QjtJQUFSLEtBQUssRUFBRTs7MERBQWdCO0FBRWY7SUFBUixLQUFLLEVBQUU7O29FQUFrQztBQUVqQztJQUFSLEtBQUssRUFBRTs7dUVBQThCO0FBRTdCO0lBQVIsS0FBSyxFQUFFO3NDQUFpQixXQUFXO2tFQUFNO0FBRWpDO0lBQVIsS0FBSyxFQUFFO3NDQUFrQixXQUFXO21FQUFNO0FBRWxDO0lBQVIsS0FBSyxFQUFFOztnRUFBNkI7QUFFM0I7SUFBVCxNQUFNLEVBQUU7c0NBQWUsWUFBWTtnRUFBMkI7QUFFckQ7SUFBVCxNQUFNLEVBQUU7c0NBQWlCLFlBQVk7a0VBQTJCO0FBR2pFO0lBREMsTUFBTSxFQUFFOztnRUFJSjtBQXpCTSwwQkFBMEI7SUE1RnRDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEVUO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLHVCQUF1QjtZQUM5QixrQkFBa0IsRUFBRSxZQUFZO1lBQ2hDLG1CQUFtQixFQUFFLGFBQWE7WUFDbEMsb0JBQW9CLEVBQUUsY0FBYztZQUNwQyxxQkFBcUIsRUFBRSxlQUFlO1lBQ3RDLHNCQUFzQixFQUFFLGFBQWE7WUFDckMsdUJBQXVCLEVBQUUsY0FBYztZQUN2Qyx3QkFBd0IsRUFBRSx1QkFBdUI7WUFDakQsa0JBQWtCLEVBQUUsaUJBQWlCO1lBQ3JDLDZCQUE2QixFQUFFLHVCQUF1QjtTQUN2RDtLQUNGLENBQUM7R0FDVywwQkFBMEIsQ0E4QnRDO1NBOUJZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9udGhWaWV3RGF5LCBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5pbXBvcnQgeyBpc1dpdGhpblRocmVzaG9sZCwgdHJhY2tCeUV2ZW50SWQgfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XHJcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXHJcbiAgICAgIGxldC1kYXk9XCJkYXlcIlxyXG4gICAgICBsZXQtb3BlbkRheT1cIm9wZW5EYXlcIlxyXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCJcclxuICAgICAgbGV0LXRvb2x0aXBQbGFjZW1lbnQ9XCJ0b29sdGlwUGxhY2VtZW50XCJcclxuICAgICAgbGV0LWhpZ2hsaWdodERheT1cImhpZ2hsaWdodERheVwiXHJcbiAgICAgIGxldC11bmhpZ2hsaWdodERheT1cInVuaGlnaGxpZ2h0RGF5XCJcclxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXHJcbiAgICAgIGxldC10b29sdGlwVGVtcGxhdGU9XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICBsZXQtdG9vbHRpcEFwcGVuZFRvQm9keT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxyXG4gICAgICBsZXQtdG9vbHRpcERlbGF5PVwidG9vbHRpcERlbGF5XCJcclxuICAgICAgbGV0LXRyYWNrQnlFdmVudElkPVwidHJhY2tCeUV2ZW50SWRcIlxyXG4gICAgICBsZXQtdmFsaWRhdGVEcmFnPVwidmFsaWRhdGVEcmFnXCJcclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiY2FsLWNlbGwtdG9wXCJcclxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxyXG4gICAgICAgICAgeyBkYXk6IGRheSwgbG9jYWxlOiBsb2NhbGUgfSB8IGNhbGVuZGFyQTExeTogJ21vbnRoQ2VsbCdcclxuICAgICAgICBcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1kYXktYmFkZ2VcIiAqbmdJZj1cImRheS5iYWRnZVRvdGFsID4gMFwiPnt7XHJcbiAgICAgICAgICAgIGRheS5iYWRnZVRvdGFsXHJcbiAgICAgICAgICB9fTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1udW1iZXJcIj57e1xyXG4gICAgICAgICAgICBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ21vbnRoVmlld0RheU51bWJlcic6bG9jYWxlXHJcbiAgICAgICAgICB9fTwvc3Bhbj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50c1wiICpuZ0lmPVwiZGF5LmV2ZW50cy5sZW5ndGggPiAwXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIGRheS5ldmVudHM7IHRyYWNrQnk6IHRyYWNrQnlFdmVudElkXCJcclxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsgYmFja2dyb3VuZENvbG9yOiBldmVudC5jb2xvcj8ucHJpbWFyeSB9XCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cImV2ZW50Py5jc3NDbGFzc1wiXHJcbiAgICAgICAgICAobW91c2VlbnRlcik9XCJoaWdobGlnaHREYXkuZW1pdCh7IGV2ZW50OiBldmVudCB9KVwiXHJcbiAgICAgICAgICAobW91c2VsZWF2ZSk9XCJ1bmhpZ2hsaWdodERheS5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCJcclxuICAgICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiXHJcbiAgICAgICAgICAgIGV2ZW50LnRpdGxlIHwgY2FsZW5kYXJFdmVudFRpdGxlOiAnbW9udGhUb29sdGlwJzpldmVudFxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICAgICAgW3Rvb2x0aXBFdmVudF09XCJldmVudFwiXHJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcclxuICAgICAgICAgIFt0b29sdGlwRGVsYXldPVwidG9vbHRpcERlbGF5XCJcclxuICAgICAgICAgIG13bERyYWdnYWJsZVxyXG4gICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiZXZlbnQuZHJhZ2dhYmxlXCJcclxuICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXHJcbiAgICAgICAgICBbZHJvcERhdGFdPVwieyBldmVudDogZXZlbnQsIGRyYWdnZWRGcm9tOiBkYXkgfVwiXHJcbiAgICAgICAgICBbZHJhZ0F4aXNdPVwieyB4OiBldmVudC5kcmFnZ2FibGUsIHk6IGV2ZW50LmRyYWdnYWJsZSB9XCJcclxuICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcclxuICAgICAgICAgIChtd2xDbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiBldmVudCwgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ7fSB8IGNhbGVuZGFyQTExeTogJ2hpZGVNb250aENlbGxFdmVudHMnXCJcclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIGRheTogZGF5LFxyXG4gICAgICAgIG9wZW5EYXk6IG9wZW5EYXksXHJcbiAgICAgICAgbG9jYWxlOiBsb2NhbGUsXHJcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudDogdG9vbHRpcFBsYWNlbWVudCxcclxuICAgICAgICBoaWdobGlnaHREYXk6IGhpZ2hsaWdodERheSxcclxuICAgICAgICB1bmhpZ2hsaWdodERheTogdW5oaWdobGlnaHREYXksXHJcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXHJcbiAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiB0b29sdGlwVGVtcGxhdGUsXHJcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keSxcclxuICAgICAgICB0b29sdGlwRGVsYXk6IHRvb2x0aXBEZWxheSxcclxuICAgICAgICB0cmFja0J5RXZlbnRJZDogdHJhY2tCeUV2ZW50SWQsXHJcbiAgICAgICAgdmFsaWRhdGVEcmFnOiB2YWxpZGF0ZURyYWdcclxuICAgICAgfVwiXHJcbiAgICA+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdjYWwtY2VsbCBjYWwtZGF5LWNlbGwnLFxyXG4gICAgJ1tjbGFzcy5jYWwtcGFzdF0nOiAnZGF5LmlzUGFzdCcsXHJcbiAgICAnW2NsYXNzLmNhbC10b2RheV0nOiAnZGF5LmlzVG9kYXknLFxyXG4gICAgJ1tjbGFzcy5jYWwtZnV0dXJlXSc6ICdkYXkuaXNGdXR1cmUnLFxyXG4gICAgJ1tjbGFzcy5jYWwtd2Vla2VuZF0nOiAnZGF5LmlzV2Vla2VuZCcsXHJcbiAgICAnW2NsYXNzLmNhbC1pbi1tb250aF0nOiAnZGF5LmluTW9udGgnLFxyXG4gICAgJ1tjbGFzcy5jYWwtb3V0LW1vbnRoXSc6ICchZGF5LmluTW9udGgnLFxyXG4gICAgJ1tjbGFzcy5jYWwtaGFzLWV2ZW50c10nOiAnZGF5LmV2ZW50cy5sZW5ndGggPiAwJyxcclxuICAgICdbY2xhc3MuY2FsLW9wZW5dJzogJ2RheSA9PT0gb3BlbkRheScsXHJcbiAgICAnW2NsYXNzLmNhbC1ldmVudC1oaWdobGlnaHRdJzogJyEhZGF5LmJhY2tncm91bmRDb2xvcidcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoQ2VsbENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgZGF5OiBNb250aFZpZXdEYXk7XHJcblxyXG4gIEBJbnB1dCgpIG9wZW5EYXk6IE1vbnRoVmlld0RheTtcclxuXHJcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xyXG5cclxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIEBPdXRwdXQoKSBoaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KCkgdW5oaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgdHJhY2tCeUV2ZW50SWQgPSB0cmFja0J5RXZlbnRJZDtcclxuXHJcbiAgdmFsaWRhdGVEcmFnID0gaXNXaXRoaW5UaHJlc2hvbGQ7XHJcbn1cclxuIl19