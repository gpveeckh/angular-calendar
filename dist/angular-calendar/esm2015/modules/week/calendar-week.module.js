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
let CalendarWeekModule = class CalendarWeekModule {
};
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
export { CalendarWeekModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbkcsT0FBTyxFQUFFLDBDQUEwQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFaEgsT0FBTyxFQUNMLHlCQUF5QixFQUUxQixNQUFNLGdDQUFnQyxDQUFDO0FBTXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBMEJuRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFHLENBQUE7QUFBckIsa0JBQWtCO0lBeEI5QixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixvQkFBb0I7U0FDckI7UUFDRCxZQUFZLEVBQUU7WUFDWix5QkFBeUI7WUFDekIsK0JBQStCO1lBQy9CLDhCQUE4QjtZQUM5QixvQ0FBb0M7WUFDcEMsMENBQTBDO1NBQzNDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsZUFBZTtZQUNmLGlCQUFpQjtZQUNqQix5QkFBeUI7WUFDekIsK0JBQStCO1lBQy9CLDhCQUE4QjtZQUM5QixvQ0FBb0M7WUFDcEMsMENBQTBDO1NBQzNDO0tBQ0YsQ0FBQztHQUNXLGtCQUFrQixDQUFHO1NBQXJCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlc2l6YWJsZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xyXG5pbXBvcnQgeyBEcmFnQW5kRHJvcE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXctaGVhZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3SG91clNlZ21lbnRDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IHtcclxuICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxyXG4gIENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudFxyXG59IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudCc7XHJcbmV4cG9ydCB7XHJcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudCBhcyBDYWxlbmRhcldlZWtWaWV3QWxsRGF5RXZlbnQsXHJcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudFJvdyBhcyBDYWxlbmRhcldlZWtWaWV3QWxsRGF5RXZlbnRSb3csXHJcbiAgR2V0V2Vla1ZpZXdBcmdzIGFzIENhbGVuZGFyR2V0V2Vla1ZpZXdBcmdzXHJcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5leHBvcnQgeyBnZXRXZWVrVmlld1BlcmlvZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVzaXphYmxlTW9kdWxlLFxyXG4gICAgRHJhZ0FuZERyb3BNb2R1bGUsXHJcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCxcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCxcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdIb3VyU2VnbWVudENvbXBvbmVudCxcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgUmVzaXphYmxlTW9kdWxlLFxyXG4gICAgRHJhZ0FuZERyb3BNb2R1bGUsXHJcbiAgICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCxcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCxcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdIb3VyU2VnbWVudENvbXBvbmVudCxcclxuICAgIENhbGVuZGFyV2Vla1ZpZXdDdXJyZW50VGltZU1hcmtlckNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla01vZHVsZSB7fVxyXG4iXX0=