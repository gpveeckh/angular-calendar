var CalendarCommonModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { CalendarEventActionsComponent } from './calendar-event-actions.component';
import { CalendarEventTitleComponent } from './calendar-event-title.component';
import { CalendarTooltipDirective, CalendarTooltipWindowComponent } from './calendar-tooltip.directive';
import { CalendarPreviousViewDirective } from './calendar-previous-view.directive';
import { CalendarNextViewDirective } from './calendar-next-view.directive';
import { CalendarTodayDirective } from './calendar-today.directive';
import { CalendarDatePipe } from './calendar-date.pipe';
import { CalendarEventTitlePipe } from './calendar-event-title.pipe';
import { ClickDirective } from './click.directive';
import { KeydownEnterDirective } from './keydown-enter.directive';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from './calendar-date-formatter.provider';
import { CalendarUtils } from './calendar-utils.provider';
import { CalendarA11y } from './calendar-a11y.provider';
import { CalendarA11yPipe } from './calendar-a11y.pipe';
export * from './calendar-event-title-formatter.provider';
export * from './calendar-moment-date-formatter.provider';
export * from './calendar-native-date-formatter.provider';
export * from './calendar-angular-date-formatter.provider';
export * from './calendar-date-formatter.provider';
export * from './calendar-utils.provider';
export * from './calendar-a11y.provider';
export * from './calendar-event-times-changed-event.interface';
export * from '../../date-adapters/date-adapter';
export * from './calendar-view.enum';
export { DAYS_OF_WEEK } from 'calendar-utils';
/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalendarCommonModule.forRoot(),
 *     CalendarMonthModule
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
let CalendarCommonModule = CalendarCommonModule_1 = class CalendarCommonModule {
    static forRoot(dateAdapter, config = {}) {
        return {
            ngModule: CalendarCommonModule_1,
            providers: [
                dateAdapter,
                config.eventTitleFormatter || CalendarEventTitleFormatter,
                config.dateFormatter || CalendarDateFormatter,
                config.utils || CalendarUtils,
                config.a11y || CalendarA11y
            ]
        };
    }
};
CalendarCommonModule = CalendarCommonModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [
            CalendarEventActionsComponent,
            CalendarEventTitleComponent,
            CalendarTooltipWindowComponent,
            CalendarTooltipDirective,
            CalendarPreviousViewDirective,
            CalendarNextViewDirective,
            CalendarTodayDirective,
            CalendarDatePipe,
            CalendarEventTitlePipe,
            CalendarA11yPipe,
            ClickDirective,
            KeydownEnterDirective
        ],
        imports: [CommonModule],
        exports: [
            CalendarEventActionsComponent,
            CalendarEventTitleComponent,
            CalendarTooltipWindowComponent,
            CalendarTooltipDirective,
            CalendarPreviousViewDirective,
            CalendarNextViewDirective,
            CalendarTodayDirective,
            CalendarDatePipe,
            CalendarEventTitlePipe,
            CalendarA11yPipe,
            ClickDirective,
            KeydownEnterDirective
        ],
        providers: [I18nPluralPipe],
        entryComponents: [CalendarTooltipWindowComponent]
    })
], CalendarCommonModule);
export { CalendarCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLDhCQUE4QixFQUMvQixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBU3hELGNBQWMsMkNBQTJDLENBQUM7QUFDMUQsY0FBYywyQ0FBMkMsQ0FBQztBQUMxRCxjQUFjLDJDQUEyQyxDQUFDO0FBQzFELGNBQWMsNENBQTRDLENBQUM7QUFDM0QsY0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsMEJBQTBCLENBQUM7QUFHekMsY0FBYyxnREFBZ0QsQ0FBQztBQUMvRCxjQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGNBQWMsc0JBQXNCLENBQUM7QUFFckMsT0FBTyxFQUdMLFlBQVksRUFFYixNQUFNLGdCQUFnQixDQUFDO0FBRXhCOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQWtDSCxJQUFhLG9CQUFvQiw0QkFBakMsTUFBYSxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FDWixXQUFxQixFQUNyQixTQUErQixFQUFFO1FBRWpDLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSwyQkFBMkI7Z0JBQ3pELE1BQU0sQ0FBQyxhQUFhLElBQUkscUJBQXFCO2dCQUM3QyxNQUFNLENBQUMsS0FBSyxJQUFJLGFBQWE7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLElBQUksWUFBWTthQUM1QjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWhCWSxvQkFBb0I7SUFqQ2hDLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLDZCQUE2QjtZQUM3QiwyQkFBMkI7WUFDM0IsOEJBQThCO1lBQzlCLHdCQUF3QjtZQUN4Qiw2QkFBNkI7WUFDN0IseUJBQXlCO1lBQ3pCLHNCQUFzQjtZQUN0QixnQkFBZ0I7WUFDaEIsc0JBQXNCO1lBQ3RCLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QscUJBQXFCO1NBQ3RCO1FBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRTtZQUNQLDZCQUE2QjtZQUM3QiwyQkFBMkI7WUFDM0IsOEJBQThCO1lBQzlCLHdCQUF3QjtZQUN4Qiw2QkFBNkI7WUFDN0IseUJBQXlCO1lBQ3pCLHNCQUFzQjtZQUN0QixnQkFBZ0I7WUFDaEIsc0JBQXNCO1lBQ3RCLGdCQUFnQjtZQUNoQixjQUFjO1lBQ2QscUJBQXFCO1NBQ3RCO1FBQ0QsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1FBQzNCLGVBQWUsRUFBRSxDQUFDLDhCQUE4QixDQUFDO0tBQ2xELENBQUM7R0FDVyxvQkFBb0IsQ0FnQmhDO1NBaEJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIEkxOG5QbHVyYWxQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LWFjdGlvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aXRsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSxcclxuICBDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnRcclxufSBmcm9tICcuL2NhbGVuZGFyLXRvb2x0aXAuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUgfSBmcm9tICcuL2NhbGVuZGFyLXByZXZpb3VzLXZpZXcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJOZXh0Vmlld0RpcmVjdGl2ZSB9IGZyb20gJy4vY2FsZW5kYXItbmV4dC12aWV3LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyVG9kYXlEaXJlY3RpdmUgfSBmcm9tICcuL2NhbGVuZGFyLXRvZGF5LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyRGF0ZVBpcGUgfSBmcm9tICcuL2NhbGVuZGFyLWRhdGUucGlwZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZVBpcGUgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpdGxlLnBpcGUnO1xyXG5pbXBvcnQgeyBDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vY2xpY2suZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgS2V5ZG93bkVudGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9rZXlkb3duLWVudGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XHJcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJBMTF5IH0gZnJvbSAnLi9jYWxlbmRhci1hMTF5LnByb3ZpZGVyJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJBMTF5UGlwZSB9IGZyb20gJy4vY2FsZW5kYXItYTExeS5waXBlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJNb2R1bGVDb25maWcge1xyXG4gIGV2ZW50VGl0bGVGb3JtYXR0ZXI/OiBQcm92aWRlcjtcclxuICBkYXRlRm9ybWF0dGVyPzogUHJvdmlkZXI7XHJcbiAgdXRpbHM/OiBQcm92aWRlcjtcclxuICBhMTF5PzogUHJvdmlkZXI7XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1tb21lbnQtZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLW5hdGl2ZS1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItYW5ndWxhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1hMTF5LnByb3ZpZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1hMTF5LmludGVyZmFjZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci12aWV3LmVudW0nO1xyXG5cclxuZXhwb3J0IHtcclxuICBDYWxlbmRhckV2ZW50LFxyXG4gIEV2ZW50QWN0aW9uIGFzIENhbGVuZGFyRXZlbnRBY3Rpb24sXHJcbiAgREFZU19PRl9XRUVLLFxyXG4gIFZpZXdQZXJpb2QgYXMgQ2FsZW5kYXJWaWV3UGVyaW9kXHJcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIEltcG9ydCB0aGlzIG1vZHVsZSB0byBpZiB5b3UncmUganVzdCB1c2luZyBhIHNpbmd1bGFyIHZpZXcgYW5kIHdhbnQgdG8gc2F2ZSBvbiBidW5kbGUgc2l6ZS4gRXhhbXBsZSB1c2FnZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSwgQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xyXG4gKlxyXG4gKiBATmdNb2R1bGUoe1xyXG4gKiAgIGltcG9ydHM6IFtcclxuICogICAgIENhbGVuZGFyQ29tbW9uTW9kdWxlLmZvclJvb3QoKSxcclxuICogICAgIENhbGVuZGFyTW9udGhNb2R1bGVcclxuICogICBdXHJcbiAqIH0pXHJcbiAqIGNsYXNzIE15TW9kdWxlIHt9XHJcbiAqIGBgYFxyXG4gKlxyXG4gKi9cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIENhbGVuZGFyRXZlbnRBY3Rpb25zQ29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJFdmVudFRpdGxlQ29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50LFxyXG4gICAgQ2FsZW5kYXJUb29sdGlwRGlyZWN0aXZlLFxyXG4gICAgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUsXHJcbiAgICBDYWxlbmRhck5leHRWaWV3RGlyZWN0aXZlLFxyXG4gICAgQ2FsZW5kYXJUb2RheURpcmVjdGl2ZSxcclxuICAgIENhbGVuZGFyRGF0ZVBpcGUsXHJcbiAgICBDYWxlbmRhckV2ZW50VGl0bGVQaXBlLFxyXG4gICAgQ2FsZW5kYXJBMTF5UGlwZSxcclxuICAgIENsaWNrRGlyZWN0aXZlLFxyXG4gICAgS2V5ZG93bkVudGVyRGlyZWN0aXZlXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBDYWxlbmRhckV2ZW50QWN0aW9uc0NvbXBvbmVudCxcclxuICAgIENhbGVuZGFyRXZlbnRUaXRsZUNvbXBvbmVudCxcclxuICAgIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudCxcclxuICAgIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSxcclxuICAgIENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlLFxyXG4gICAgQ2FsZW5kYXJOZXh0Vmlld0RpcmVjdGl2ZSxcclxuICAgIENhbGVuZGFyVG9kYXlEaXJlY3RpdmUsXHJcbiAgICBDYWxlbmRhckRhdGVQaXBlLFxyXG4gICAgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSxcclxuICAgIENhbGVuZGFyQTExeVBpcGUsXHJcbiAgICBDbGlja0RpcmVjdGl2ZSxcclxuICAgIEtleWRvd25FbnRlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbSTE4blBsdXJhbFBpcGVdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0NhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29tbW9uTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChcclxuICAgIGRhdGVBZGFwdGVyOiBQcm92aWRlcixcclxuICAgIGNvbmZpZzogQ2FsZW5kYXJNb2R1bGVDb25maWcgPSB7fVxyXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IENhbGVuZGFyQ29tbW9uTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBkYXRlQWRhcHRlcixcclxuICAgICAgICBjb25maWcuZXZlbnRUaXRsZUZvcm1hdHRlciB8fCBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsXHJcbiAgICAgICAgY29uZmlnLmRhdGVGb3JtYXR0ZXIgfHwgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxyXG4gICAgICAgIGNvbmZpZy51dGlscyB8fCBDYWxlbmRhclV0aWxzLFxyXG4gICAgICAgIGNvbmZpZy5hMTF5IHx8IENhbGVuZGFyQTExeVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=