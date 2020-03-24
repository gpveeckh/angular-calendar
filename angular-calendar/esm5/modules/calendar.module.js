import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CalendarCommonModule, CalendarEventTitleFormatter, CalendarDateFormatter, CalendarA11y } from './common/calendar-common.module';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { CalendarUtils } from './common/calendar-utils.provider';
export * from './common/calendar-common.module';
export * from './month/calendar-month.module';
export * from './week/calendar-week.module';
export * from './day/calendar-day.module';
/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { CalenderModule } from 'angular-calendar';
 *
 * @NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule_1 = CalendarModule;
    CalendarModule.forRoot = function (dateAdapter, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: CalendarModule_1,
            providers: [
                dateAdapter,
                config.eventTitleFormatter || CalendarEventTitleFormatter,
                config.dateFormatter || CalendarDateFormatter,
                config.utils || CalendarUtils,
                config.a11y || CalendarA11y
            ]
        };
    };
    var CalendarModule_1;
    CalendarModule = CalendarModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                CalendarCommonModule,
                CalendarMonthModule,
                CalendarWeekModule,
                CalendarDayModule
            ],
            exports: [
                CalendarCommonModule,
                CalendarMonthModule,
                CalendarWeekModule,
                CalendarDayModule
            ]
        })
    ], CalendarModule);
    return CalendarModule;
}());
export { CalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2FsZW5kYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsb0JBQW9CLEVBRXBCLDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsWUFBWSxFQUNiLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWpFLGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYywrQkFBK0IsQ0FBQztBQUM5QyxjQUFjLDZCQUE2QixDQUFDO0FBQzVDLGNBQWMsMkJBQTJCLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFlSDtJQUFBO0lBZ0JBLENBQUM7dUJBaEJZLGNBQWM7SUFDbEIsc0JBQU8sR0FBZCxVQUNFLFdBQXFCLEVBQ3JCLE1BQWlDO1FBQWpDLHVCQUFBLEVBQUEsV0FBaUM7UUFFakMsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsV0FBVztnQkFDWCxNQUFNLENBQUMsbUJBQW1CLElBQUksMkJBQTJCO2dCQUN6RCxNQUFNLENBQUMsYUFBYSxJQUFJLHFCQUFxQjtnQkFDN0MsTUFBTSxDQUFDLEtBQUssSUFBSSxhQUFhO2dCQUM3QixNQUFNLENBQUMsSUFBSSxJQUFJLFlBQVk7YUFDNUI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFmVSxjQUFjO1FBZDFCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxvQkFBb0I7Z0JBQ3BCLG1CQUFtQjtnQkFDbkIsa0JBQWtCO2dCQUNsQixpQkFBaUI7YUFDbEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Asb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLGtCQUFrQjtnQkFDbEIsaUJBQWlCO2FBQ2xCO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0FnQjFCO0lBQUQscUJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWhCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXHJcbiAgQ2FsZW5kYXJNb2R1bGVDb25maWcsXHJcbiAgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxyXG4gIENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcclxuICBDYWxlbmRhckExMXlcclxufSBmcm9tICcuL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJy4vbW9udGgvY2FsZW5kYXItbW9udGgubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrTW9kdWxlIH0gZnJvbSAnLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJEYXlNb2R1bGUgfSBmcm9tICcuL2RheS9jYWxlbmRhci1kYXkubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL21vbnRoL2NhbGVuZGFyLW1vbnRoLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vd2Vlay9jYWxlbmRhci13ZWVrLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGF5L2NhbGVuZGFyLWRheS5tb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBtYWluIG1vZHVsZSBvZiB0aGlzIGxpYnJhcnkuIEV4YW1wbGUgdXNhZ2U6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgQ2FsZW5kZXJNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcclxuICpcclxuICogQE5nTW9kdWxlKHtcclxuICogICBpbXBvcnRzOiBbXHJcbiAqICAgICBDYWxlbmRlck1vZHVsZS5mb3JSb290KClcclxuICogICBdXHJcbiAqIH0pXHJcbiAqIGNsYXNzIE15TW9kdWxlIHt9XHJcbiAqIGBgYFxyXG4gKlxyXG4gKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcclxuICAgIENhbGVuZGFyTW9udGhNb2R1bGUsXHJcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXHJcbiAgICBDYWxlbmRhckRheU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXHJcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxyXG4gICAgQ2FsZW5kYXJXZWVrTW9kdWxlLFxyXG4gICAgQ2FsZW5kYXJEYXlNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoXHJcbiAgICBkYXRlQWRhcHRlcjogUHJvdmlkZXIsXHJcbiAgICBjb25maWc6IENhbGVuZGFyTW9kdWxlQ29uZmlnID0ge31cclxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBDYWxlbmRhck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgY29uZmlnLmV2ZW50VGl0bGVGb3JtYXR0ZXIgfHwgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxyXG4gICAgICAgIGNvbmZpZy5kYXRlRm9ybWF0dGVyIHx8IENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcclxuICAgICAgICBjb25maWcudXRpbHMgfHwgQ2FsZW5kYXJVdGlscyxcclxuICAgICAgICBjb25maWcuYTExeSB8fCBDYWxlbmRhckExMXlcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19