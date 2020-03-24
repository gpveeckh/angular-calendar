import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarMonthViewComponent } from './calendar-month-view.component';
import { CalendarMonthViewHeaderComponent } from './calendar-month-view-header.component';
import { CalendarMonthCellComponent } from './calendar-month-cell.component';
import { CalendarOpenDayEventsComponent } from './calendar-open-day-events.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
export { CalendarMonthViewComponent } from './calendar-month-view.component';
export { collapseAnimation } from './calendar-open-day-events.component';
var CalendarMonthModule = /** @class */ (function () {
    function CalendarMonthModule() {
    }
    CalendarMonthModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, DragAndDropModule, CalendarCommonModule],
            declarations: [
                CalendarMonthViewComponent,
                CalendarMonthCellComponent,
                CalendarOpenDayEventsComponent,
                CalendarMonthViewHeaderComponent
            ],
            exports: [
                DragAndDropModule,
                CalendarMonthViewComponent,
                CalendarMonthCellComponent,
                CalendarOpenDayEventsComponent,
                CalendarMonthViewHeaderComponent
            ]
        })
    ], CalendarMonthModule);
    return CalendarMonthModule;
}());
export { CalendarMonthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUV4RSxPQUFPLEVBQ0wsMEJBQTBCLEVBRzNCLE1BQU0saUNBQWlDLENBQUM7QUFFekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFrQnpFO0lBQUE7SUFBa0MsQ0FBQztJQUF0QixtQkFBbUI7UUFoQi9CLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQztZQUNoRSxZQUFZLEVBQUU7Z0JBQ1osMEJBQTBCO2dCQUMxQiwwQkFBMEI7Z0JBQzFCLDhCQUE4QjtnQkFDOUIsZ0NBQWdDO2FBQ2pDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlCQUFpQjtnQkFDakIsMEJBQTBCO2dCQUMxQiwwQkFBMEI7Z0JBQzFCLDhCQUE4QjtnQkFDOUIsZ0NBQWdDO2FBQ2pDO1NBQ0YsQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBQSxBQUFuQyxJQUFtQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhck9wZW5EYXlFdmVudHNDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQsXHJcbiAgQ2FsZW5kYXJNb250aFZpZXdCZWZvcmVSZW5kZXJFdmVudCxcclxuICBDYWxlbmRhck1vbnRoVmlld0V2ZW50VGltZXNDaGFuZ2VkRXZlbnRcclxufSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcclxuZXhwb3J0IHsgTW9udGhWaWV3RGF5IGFzIENhbGVuZGFyTW9udGhWaWV3RGF5IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5leHBvcnQgeyBjb2xsYXBzZUFuaW1hdGlvbiB9IGZyb20gJy4vY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIERyYWdBbmREcm9wTW9kdWxlLCBDYWxlbmRhckNvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCxcclxuICAgIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJPcGVuRGF5RXZlbnRzQ29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJNb250aFZpZXdIZWFkZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIERyYWdBbmREcm9wTW9kdWxlLFxyXG4gICAgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQsXHJcbiAgICBDYWxlbmRhck1vbnRoQ2VsbENvbXBvbmVudCxcclxuICAgIENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCxcclxuICAgIENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aE1vZHVsZSB7fVxyXG4iXX0=