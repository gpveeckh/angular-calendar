import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekViewComponent } from './calendar-week-view.component';
import { CalendarWeekViewHeaderComponent } from './calendar-week-view-header.component';
import { CalendarWeekViewEventComponent } from './calendar-week-view-event.component';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { CalendarWeekViewHourSegmentComponent } from './calendar-week-view-hour-segment.component';
import { CalendarWeekViewCurrentTimeMarkerComponent } from './calendar-week-view-current-time-marker.component';
export { CalendarWeekViewComponent } from './calendar-week-view.component';
export { getWeekViewPeriod } from '../common/util';
var CalendarWeekModule = /** @class */ (function () {
    function CalendarWeekModule() {
    }
    CalendarWeekModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ResizableModule,
                DragAndDropModule,
                CalendarCommonModule
            ],
            declarations: [
                CalendarWeekViewComponent,
                CalendarWeekViewHeaderComponent,
                CalendarWeekViewEventComponent,
                CalendarWeekViewHourSegmentComponent,
                CalendarWeekViewCurrentTimeMarkerComponent
            ],
            exports: [
                ResizableModule,
                DragAndDropModule,
                CalendarWeekViewComponent,
                CalendarWeekViewHeaderComponent,
                CalendarWeekViewEventComponent,
                CalendarWeekViewHourSegmentComponent,
                CalendarWeekViewCurrentTimeMarkerComponent
            ]
        })
    ], CalendarWeekModule);
    return CalendarWeekModule;
}());
export { CalendarWeekModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkcsT0FBTyxFQUFFLDBDQUEwQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFaEgsT0FBTyxFQUNMLHlCQUF5QixFQUUxQixNQUFNLGdDQUFnQyxDQUFDO0FBTXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBMEJuRDtJQUFBO0lBQWlDLENBQUM7SUFBckIsa0JBQWtCO1FBeEI5QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsb0JBQW9CO2FBQ3JCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLHlCQUF5QjtnQkFDekIsK0JBQStCO2dCQUMvQiw4QkFBOEI7Z0JBQzlCLG9DQUFvQztnQkFDcEMsMENBQTBDO2FBQzNDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGVBQWU7Z0JBQ2YsaUJBQWlCO2dCQUNqQix5QkFBeUI7Z0JBQ3pCLCtCQUErQjtnQkFDL0IsOEJBQThCO2dCQUM5QixvQ0FBb0M7Z0JBQ3BDLDBDQUEwQzthQUMzQztTQUNGLENBQUM7T0FDVyxrQkFBa0IsQ0FBRztJQUFELHlCQUFDO0NBQUEsQUFBbEMsSUFBa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVzaXphYmxlTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1yZXNpemFibGUtZWxlbWVudCc7XHJcbmltcG9ydCB7IERyYWdBbmREcm9wTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy1oZWFkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdIb3VyU2VnbWVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyLmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQge1xyXG4gIENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQsXHJcbiAgQ2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50XHJcbn0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50JztcclxuZXhwb3J0IHtcclxuICBXZWVrVmlld0FsbERheUV2ZW50IGFzIENhbGVuZGFyV2Vla1ZpZXdBbGxEYXlFdmVudCxcclxuICBXZWVrVmlld0FsbERheUV2ZW50Um93IGFzIENhbGVuZGFyV2Vla1ZpZXdBbGxEYXlFdmVudFJvdyxcclxuICBHZXRXZWVrVmlld0FyZ3MgYXMgQ2FsZW5kYXJHZXRXZWVrVmlld0FyZ3NcclxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XHJcbmV4cG9ydCB7IGdldFdlZWtWaWV3UGVyaW9kIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZXNpemFibGVNb2R1bGUsXHJcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcclxuICAgIENhbGVuZGFyQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQsXHJcbiAgICBDYWxlbmRhcldlZWtWaWV3SGVhZGVyQ29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0hvdXJTZWdtZW50Q29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBSZXNpemFibGVNb2R1bGUsXHJcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQsXHJcbiAgICBDYWxlbmRhcldlZWtWaWV3SGVhZGVyQ29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0hvdXJTZWdtZW50Q29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrTW9kdWxlIHt9XHJcbiJdfQ==