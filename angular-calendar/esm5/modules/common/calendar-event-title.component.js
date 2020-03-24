import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef } from '@angular/core';
var CalendarEventTitleComponent = /** @class */ (function () {
    function CalendarEventTitleComponent() {
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarEventTitleComponent.prototype, "event", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarEventTitleComponent.prototype, "customTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarEventTitleComponent.prototype, "view", void 0);
    CalendarEventTitleComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-event-title',
            template: "\n    <ng-template #defaultTemplate let-event=\"event\" let-view=\"view\">\n      <span\n        class=\"cal-event-title\"\n        [innerHTML]=\"event.title | calendarEventTitle: view:event\"\n        [attr.aria-hidden]=\"{} | calendarA11y: 'hideEventTitle'\"\n      >\n      </span>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        view: view\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarEventTitleComponent);
    return CalendarEventTitleComponent;
}());
export { CalendarEventTitleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBd0I5RDtJQUFBO0lBTUEsQ0FBQztJQUxVO1FBQVIsS0FBSyxFQUFFOzs4REFBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7MENBQWlCLFdBQVc7dUVBQU07SUFFakM7UUFBUixLQUFLLEVBQUU7OzZEQUFjO0lBTFgsMkJBQTJCO1FBckJ2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSw4ZkFpQlQ7U0FDRixDQUFDO09BQ1csMkJBQTJCLENBTXZDO0lBQUQsa0NBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGUnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZSBsZXQtZXZlbnQ9XCJldmVudFwiIGxldC12aWV3PVwidmlld1wiPlxyXG4gICAgICA8c3BhblxyXG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LXRpdGxlXCJcclxuICAgICAgICBbaW5uZXJIVE1MXT1cImV2ZW50LnRpdGxlIHwgY2FsZW5kYXJFdmVudFRpdGxlOiB2aWV3OmV2ZW50XCJcclxuICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ7fSB8IGNhbGVuZGFyQTExeTogJ2hpZGVFdmVudFRpdGxlJ1wiXHJcbiAgICAgID5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICB2aWV3OiB2aWV3XHJcbiAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50VGl0bGVDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xyXG5cclxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCkgdmlldzogc3RyaW5nO1xyXG59XHJcbiJdfQ==