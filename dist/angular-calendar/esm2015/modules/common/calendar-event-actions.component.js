import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef } from '@angular/core';
let CalendarEventActionsComponent = class CalendarEventActionsComponent {
    constructor() {
        this.trackByActionId = (index, action) => action.id ? action.id : action;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CalendarEventActionsComponent.prototype, "event", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarEventActionsComponent.prototype, "customTemplate", void 0);
CalendarEventActionsComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-event-actions',
        template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-trackByActionId="trackByActionId"
    >
      <span *ngIf="event.actions" class="cal-event-actions">
        <a
          class="cal-event-action"
          href="javascript:;"
          *ngFor="let action of event.actions; trackBy: trackByActionId"
          (mwlClick)="action.onClick({ event: event, sourceEvent: $event })"
          (mwlKeydownEnter)="
            action.onClick({ event: event, sourceEvent: $event })
          "
          [ngClass]="action.cssClass"
          [innerHtml]="action.label"
          tabindex="0"
          role="button"
          [attr.aria-label]="
            { action: action } | calendarA11y: 'actionButtonLabel'
          "
        >
        </a>
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        trackByActionId: trackByActionId
      }"
    >
    </ng-template>
  `
    })
], CalendarEventActionsComponent);
export { CalendarEventActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXlDOUQsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBNkI7SUF0QzFDO1FBMkNFLG9CQUFlLEdBQUcsQ0FBQyxLQUFhLEVBQUUsTUFBbUIsRUFBRSxFQUFFLENBQ3ZELE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0NBQUEsQ0FBQTtBQU5VO0lBQVIsS0FBSyxFQUFFOzs0REFBc0I7QUFFckI7SUFBUixLQUFLLEVBQUU7c0NBQWlCLFdBQVc7cUVBQU07QUFIL0IsNkJBQTZCO0lBdEN6QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDVDtLQUNGLENBQUM7R0FDVyw2QkFBNkIsQ0FPekM7U0FQWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50LCBFdmVudEFjdGlvbiB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnMnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGVcclxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxyXG4gICAgICBsZXQtZXZlbnQ9XCJldmVudFwiXHJcbiAgICAgIGxldC10cmFja0J5QWN0aW9uSWQ9XCJ0cmFja0J5QWN0aW9uSWRcIlxyXG4gICAgPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cImV2ZW50LmFjdGlvbnNcIiBjbGFzcz1cImNhbC1ldmVudC1hY3Rpb25zXCI+XHJcbiAgICAgICAgPGFcclxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvblwiXHJcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgZXZlbnQuYWN0aW9uczsgdHJhY2tCeTogdHJhY2tCeUFjdGlvbklkXCJcclxuICAgICAgICAgIChtd2xDbGljayk9XCJhY3Rpb24ub25DbGljayh7IGV2ZW50OiBldmVudCwgc291cmNlRXZlbnQ6ICRldmVudCB9KVwiXHJcbiAgICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cIlxyXG4gICAgICAgICAgICBhY3Rpb24ub25DbGljayh7IGV2ZW50OiBldmVudCwgc291cmNlRXZlbnQ6ICRldmVudCB9KVxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIFtuZ0NsYXNzXT1cImFjdGlvbi5jc3NDbGFzc1wiXHJcbiAgICAgICAgICBbaW5uZXJIdG1sXT1cImFjdGlvbi5sYWJlbFwiXHJcbiAgICAgICAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxyXG4gICAgICAgICAgICB7IGFjdGlvbjogYWN0aW9uIH0gfCBjYWxlbmRhckExMXk6ICdhY3Rpb25CdXR0b25MYWJlbCdcclxuICAgICAgICAgIFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICB0cmFja0J5QWN0aW9uSWQ6IHRyYWNrQnlBY3Rpb25JZFxyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xyXG5cclxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgdHJhY2tCeUFjdGlvbklkID0gKGluZGV4OiBudW1iZXIsIGFjdGlvbjogRXZlbnRBY3Rpb24pID0+XHJcbiAgICBhY3Rpb24uaWQgPyBhY3Rpb24uaWQgOiBhY3Rpb247XHJcbn1cclxuIl19