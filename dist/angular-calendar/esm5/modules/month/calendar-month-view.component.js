import * as tslib_1 from "tslib";
import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEventTimesChangedEventType } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * <mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-month-view>
 * ```
 */
var CalendarMonthViewComponent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarMonthViewComponent(cdr, utils, locale, dateAdapter) {
        var _this = this;
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view.
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * An output that will be called before the view is rendered for the current month.
         * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when a header week day is clicked. Returns ISO day number.
         */
        this.columnHeaderClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * @hidden
         */
        this.trackByRowOffset = function (index, offset) {
            return _this.view.days
                .slice(offset, _this.view.totalDaysVisibleInWeek)
                .map(function (day) { return day.date.toISOString(); })
                .join('-');
        };
        /**
         * @hidden
         */
        this.trackByDate = function (index, day) { return day.date.toISOString(); };
        this.locale = locale;
    }
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(function () {
                _this.refreshAll();
                _this.cdr.markForCheck();
            });
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnChanges = function (changes) {
        var refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays;
        var refreshBody = changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.weekendDays;
        if (refreshHeader) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshBody) {
            this.refreshBody();
        }
        if (refreshHeader || refreshBody) {
            this.emitBeforeViewRender();
        }
        if (changes.activeDayIsOpen ||
            changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.activeDay) {
            this.checkActiveDayIsOpen();
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.toggleDayHighlight = function (event, isHighlighted) {
        this.view.days.forEach(function (day) {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor =
                    (event.color && event.color.secondary) || '#D1E8FF';
            }
            else {
                delete day.backgroundColor;
            }
        });
    };
    /**
     * @hidden
     */
    CalendarMonthViewComponent.prototype.eventDropped = function (droppedOn, event, draggedFrom) {
        if (droppedOn !== draggedFrom) {
            var year = this.dateAdapter.getYear(droppedOn.date);
            var month = this.dateAdapter.getMonth(droppedOn.date);
            var date = this.dateAdapter.getDate(droppedOn.date);
            var newStart = this.dateAdapter.setDate(this.dateAdapter.setMonth(this.dateAdapter.setYear(event.start, year), month), date);
            var newEnd = void 0;
            if (event.end) {
                var secondsDiff = this.dateAdapter.differenceInSeconds(newStart, event.start);
                newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
            }
            this.eventTimesChanged.emit({
                event: event,
                newStart: newStart,
                newEnd: newEnd,
                day: droppedOn,
                type: CalendarEventTimesChangedEventType.Drop
            });
        }
    };
    CalendarMonthViewComponent.prototype.refreshHeader = function () {
        this.columnHeaders = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    };
    CalendarMonthViewComponent.prototype.refreshBody = function () {
        this.view = this.utils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    };
    CalendarMonthViewComponent.prototype.checkActiveDayIsOpen = function () {
        var _this = this;
        if (this.activeDayIsOpen === true) {
            var activeDay_1 = this.activeDay || this.viewDate;
            this.openDay = this.view.days.find(function (day) {
                return _this.dateAdapter.isSameDay(day.date, activeDay_1);
            });
            var index = this.view.days.indexOf(this.openDay);
            this.openRowIndex =
                Math.floor(index / this.view.totalDaysVisibleInWeek) *
                    this.view.totalDaysVisibleInWeek;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    };
    CalendarMonthViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
        this.checkActiveDayIsOpen();
    };
    CalendarMonthViewComponent.prototype.emitBeforeViewRender = function () {
        if (this.columnHeaders && this.view) {
            this.beforeViewRender.emit({
                header: this.columnHeaders,
                body: this.view.days,
                period: this.view.period
            });
        }
    };
    CalendarMonthViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: CalendarUtils },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
        { type: DateAdapter }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], CalendarMonthViewComponent.prototype, "viewDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CalendarMonthViewComponent.prototype, "events", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CalendarMonthViewComponent.prototype, "excludeDays", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CalendarMonthViewComponent.prototype, "activeDayIsOpen", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], CalendarMonthViewComponent.prototype, "activeDay", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Subject)
    ], CalendarMonthViewComponent.prototype, "refresh", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarMonthViewComponent.prototype, "locale", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthViewComponent.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthViewComponent.prototype, "tooltipTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CalendarMonthViewComponent.prototype, "tooltipAppendToBody", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarMonthViewComponent.prototype, "tooltipDelay", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CalendarMonthViewComponent.prototype, "weekStartsOn", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthViewComponent.prototype, "headerTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthViewComponent.prototype, "cellTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthViewComponent.prototype, "openDayEventsTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthViewComponent.prototype, "eventTitleTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarMonthViewComponent.prototype, "eventActionsTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CalendarMonthViewComponent.prototype, "weekendDays", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthViewComponent.prototype, "beforeViewRender", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthViewComponent.prototype, "dayClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthViewComponent.prototype, "eventClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthViewComponent.prototype, "columnHeaderClicked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarMonthViewComponent.prototype, "eventTimesChanged", void 0);
    CalendarMonthViewComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-month-view',
            template: "\n    <div class=\"cal-month-view\" role=\"grid\">\n      <mwl-calendar-month-view-header\n        [days]=\"columnHeaders\"\n        [locale]=\"locale\"\n        (columnHeaderClicked)=\"columnHeaderClicked.emit($event)\"\n        [customTemplate]=\"headerTemplate\"\n      >\n      </mwl-calendar-month-view-header>\n      <div class=\"cal-days\">\n        <div\n          *ngFor=\"let rowIndex of view.rowOffsets; trackBy: trackByRowOffset\"\n        >\n          <div class=\"cal-cell-row\">\n            <mwl-calendar-month-cell\n              *ngFor=\"\n                let day of view.days\n                  | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek;\n                trackBy: trackByDate\n              \"\n              [ngClass]=\"day?.cssClass\"\n              [day]=\"day\"\n              [openDay]=\"openDay\"\n              [locale]=\"locale\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipDelay]=\"tooltipDelay\"\n              [customTemplate]=\"cellTemplate\"\n              [ngStyle]=\"{ backgroundColor: day.backgroundColor }\"\n              (mwlClick)=\"dayClicked.emit({ day: day, sourceEvent: $event })\"\n              [clickListenerDisabled]=\"dayClicked.observers.length === 0\"\n              (mwlKeydownEnter)=\"\n                dayClicked.emit({ day: day, sourceEvent: $event })\n              \"\n              (highlightDay)=\"toggleDayHighlight($event.event, true)\"\n              (unhighlightDay)=\"toggleDayHighlight($event.event, false)\"\n              mwlDroppable\n              dragOverClass=\"cal-drag-over\"\n              (drop)=\"\n                eventDropped(\n                  day,\n                  $event.dropData.event,\n                  $event.dropData.draggedFrom\n                )\n              \"\n              (eventClicked)=\"\n                eventClicked.emit({\n                  event: $event.event,\n                  sourceEvent: $event.sourceEvent\n                })\n              \"\n              [attr.tabindex]=\"{} | calendarA11y: 'monthCellTabIndex'\"\n            >\n            </mwl-calendar-month-cell>\n          </div>\n          <mwl-calendar-open-day-events\n            [locale]=\"locale\"\n            [isOpen]=\"openRowIndex === rowIndex\"\n            [events]=\"openDay?.events\"\n            [date]=\"openDay?.date\"\n            [customTemplate]=\"openDayEventsTemplate\"\n            [eventTitleTemplate]=\"eventTitleTemplate\"\n            [eventActionsTemplate]=\"eventActionsTemplate\"\n            (eventClicked)=\"\n              eventClicked.emit({\n                event: $event.event,\n                sourceEvent: $event.sourceEvent\n              })\n            \"\n            mwlDroppable\n            dragOverClass=\"cal-drag-over\"\n            (drop)=\"\n              eventDropped(\n                openDay,\n                $event.dropData.event,\n                $event.dropData.draggedFrom\n              )\n            \"\n          >\n          </mwl-calendar-open-day-events>\n        </div>\n      </div>\n    </div>\n  "
        }),
        tslib_1.__param(2, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
            CalendarUtils, String, DateAdapter])
    ], CalendarMonthViewComponent);
    return CalendarMonthViewComponent;
}());
export { CalendarMonthViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUVMLGtDQUFrQyxFQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBZ0IvRDs7Ozs7Ozs7O0dBU0c7QUF5Rkg7SUE4S0U7O09BRUc7SUFDSCxvQ0FDWSxHQUFzQixFQUN0QixLQUFvQixFQUNYLE1BQWMsRUFDdkIsV0FBd0I7UUFKcEMsaUJBT0M7UUFOVyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixVQUFLLEdBQUwsS0FBSyxDQUFlO1FBRXBCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBOUtwQzs7O1dBR0c7UUFDTSxXQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUV0Qzs7V0FFRztRQUNNLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBRXBDOztXQUVHO1FBQ00sb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFpQjFDOztXQUVHO1FBQ00scUJBQWdCLEdBQW1CLE1BQU0sQ0FBQztRQU9uRDs7V0FFRztRQUNNLHdCQUFtQixH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U0FBUyxDQUFDLENBQUE7aURBRkgsaUJBQWlCO1lBQ2YsYUFBYSxVQUVQLFdBQVc7T0FyTHpCLDBCQUEwQixDQTRWdEM7SUFBRCxpQ0FBQztDQUFBLEFBNVZELElBNFZDO1NBNVZZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgTE9DQUxFX0lELFxyXG4gIEluamVjdCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENhbGVuZGFyRXZlbnQsXHJcbiAgV2Vla0RheSxcclxuICBNb250aFZpZXcsXHJcbiAgTW9udGhWaWV3RGF5LFxyXG4gIFZpZXdQZXJpb2RcclxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudCxcclxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlXHJcbn0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci11dGlscy5wcm92aWRlcic7XHJcbmltcG9ydCB7IHZhbGlkYXRlRXZlbnRzIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnQge1xyXG4gIGhlYWRlcjogV2Vla0RheVtdO1xyXG4gIGJvZHk6IE1vbnRoVmlld0RheVtdO1xyXG4gIHBlcmlvZDogVmlld1BlcmlvZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhck1vbnRoVmlld0V2ZW50VGltZXNDaGFuZ2VkRXZlbnQ8XHJcbiAgRXZlbnRNZXRhVHlwZSA9IGFueSxcclxuICBEYXlNZXRhVHlwZSA9IGFueVxyXG4+IGV4dGVuZHMgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PEV2ZW50TWV0YVR5cGU+IHtcclxuICBkYXk6IE1vbnRoVmlld0RheTxEYXlNZXRhVHlwZT47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gbW9udGguIEV4YW1wbGUgdXNhZ2U6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogPG13bC1jYWxlbmRhci1tb250aC12aWV3XHJcbiAqICBbdmlld0RhdGVdPVwidmlld0RhdGVcIlxyXG4gKiAgW2V2ZW50c109XCJldmVudHNcIj5cclxuICogPC9td2wtY2FsZW5kYXItbW9udGgtdmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1tb250aC12aWV3JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImNhbC1tb250aC12aWV3XCIgcm9sZT1cImdyaWRcIj5cclxuICAgICAgPG13bC1jYWxlbmRhci1tb250aC12aWV3LWhlYWRlclxyXG4gICAgICAgIFtkYXlzXT1cImNvbHVtbkhlYWRlcnNcIlxyXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICAoY29sdW1uSGVhZGVyQ2xpY2tlZCk9XCJjb2x1bW5IZWFkZXJDbGlja2VkLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhlYWRlclRlbXBsYXRlXCJcclxuICAgICAgPlxyXG4gICAgICA8L213bC1jYWxlbmRhci1tb250aC12aWV3LWhlYWRlcj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXlzXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHJvd0luZGV4IG9mIHZpZXcucm93T2Zmc2V0czsgdHJhY2tCeTogdHJhY2tCeVJvd09mZnNldFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1jZWxsLXJvd1wiPlxyXG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLW1vbnRoLWNlbGxcclxuICAgICAgICAgICAgICAqbmdGb3I9XCJcclxuICAgICAgICAgICAgICAgIGxldCBkYXkgb2Ygdmlldy5kYXlzXHJcbiAgICAgICAgICAgICAgICAgIHwgc2xpY2U6IHJvd0luZGV4OnJvd0luZGV4ICsgdmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrO1xyXG4gICAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeURhdGVcclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImRheT8uY3NzQ2xhc3NcIlxyXG4gICAgICAgICAgICAgIFtkYXldPVwiZGF5XCJcclxuICAgICAgICAgICAgICBbb3BlbkRheV09XCJvcGVuRGF5XCJcclxuICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwRGVsYXldPVwidG9vbHRpcERlbGF5XCJcclxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiY2VsbFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogZGF5LmJhY2tncm91bmRDb2xvciB9XCJcclxuICAgICAgICAgICAgICAobXdsQ2xpY2spPVwiZGF5Q2xpY2tlZC5lbWl0KHsgZGF5OiBkYXksIHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcIlxyXG4gICAgICAgICAgICAgIFtjbGlja0xpc3RlbmVyRGlzYWJsZWRdPVwiZGF5Q2xpY2tlZC5vYnNlcnZlcnMubGVuZ3RoID09PSAwXCJcclxuICAgICAgICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cIlxyXG4gICAgICAgICAgICAgICAgZGF5Q2xpY2tlZC5lbWl0KHsgZGF5OiBkYXksIHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIChoaWdobGlnaHREYXkpPVwidG9nZ2xlRGF5SGlnaGxpZ2h0KCRldmVudC5ldmVudCwgdHJ1ZSlcIlxyXG4gICAgICAgICAgICAgICh1bmhpZ2hsaWdodERheSk9XCJ0b2dnbGVEYXlIaWdobGlnaHQoJGV2ZW50LmV2ZW50LCBmYWxzZSlcIlxyXG4gICAgICAgICAgICAgIG13bERyb3BwYWJsZVxyXG4gICAgICAgICAgICAgIGRyYWdPdmVyQ2xhc3M9XCJjYWwtZHJhZy1vdmVyXCJcclxuICAgICAgICAgICAgICAoZHJvcCk9XCJcclxuICAgICAgICAgICAgICAgIGV2ZW50RHJvcHBlZChcclxuICAgICAgICAgICAgICAgICAgZGF5LFxyXG4gICAgICAgICAgICAgICAgICAkZXZlbnQuZHJvcERhdGEuZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICRldmVudC5kcm9wRGF0YS5kcmFnZ2VkRnJvbVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJcclxuICAgICAgICAgICAgICAgIGV2ZW50Q2xpY2tlZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgZXZlbnQ6ICRldmVudC5ldmVudCxcclxuICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudC5zb3VyY2VFdmVudFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInt9IHwgY2FsZW5kYXJBMTF5OiAnbW9udGhDZWxsVGFiSW5kZXgnXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci1tb250aC1jZWxsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8bXdsLWNhbGVuZGFyLW9wZW4tZGF5LWV2ZW50c1xyXG4gICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgICAgICAgIFtpc09wZW5dPVwib3BlblJvd0luZGV4ID09PSByb3dJbmRleFwiXHJcbiAgICAgICAgICAgIFtldmVudHNdPVwib3BlbkRheT8uZXZlbnRzXCJcclxuICAgICAgICAgICAgW2RhdGVdPVwib3BlbkRheT8uZGF0ZVwiXHJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJvcGVuRGF5RXZlbnRzVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIFtldmVudEFjdGlvbnNUZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiXHJcbiAgICAgICAgICAgICAgZXZlbnRDbGlja2VkLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICRldmVudC5ldmVudCxcclxuICAgICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnQuc291cmNlRXZlbnRcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICBtd2xEcm9wcGFibGVcclxuICAgICAgICAgICAgZHJhZ092ZXJDbGFzcz1cImNhbC1kcmFnLW92ZXJcIlxyXG4gICAgICAgICAgICAoZHJvcCk9XCJcclxuICAgICAgICAgICAgICBldmVudERyb3BwZWQoXHJcbiAgICAgICAgICAgICAgICBvcGVuRGF5LFxyXG4gICAgICAgICAgICAgICAgJGV2ZW50LmRyb3BEYXRhLmV2ZW50LFxyXG4gICAgICAgICAgICAgICAgJGV2ZW50LmRyb3BEYXRhLmRyYWdnZWRGcm9tXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcclxuICAgKi9cclxuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlldy5cclxuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgd2lsbCBiZSBoaWRkZW4gb24gdGhlIHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgZXZlbnRzIGxpc3QgZm9yIHRoZSBkYXkgb2YgdGhlIGB2aWV3RGF0ZWAgb3B0aW9uIGlzIHZpc2libGUgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlRGF5SXNPcGVuOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHNldCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkYXkgdGhhdCBzaG91bGQgYmUgb3Blbi4gSWYgbm90IHNldCwgdGhlIGB2aWV3RGF0ZWAgaXMgdXNlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFjdGl2ZURheTogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gYXBwZW5kIHRvb2x0aXBzIHRvIHRoZSBib2R5IG9yIG5leHQgdG8gdGhlIHRyaWdnZXIgZWxlbWVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkLiBJZiBub3QgcHJvdmlkZWQgdGhlIHRvb2x0aXBcclxuICAgKiB3aWxsIGJlIGRpc3BsYXllZCBpbW1lZGlhdGVseS5cclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3RhcnQgbnVtYmVyIG9mIHRoZSB3ZWVrXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2Vla1N0YXJ0c09uOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGRheSBjZWxsXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2VsbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBzbGlkZSBkb3duIGJveCBvZiBldmVudHMgZm9yIHRoZSBhY3RpdmUgZGF5XHJcbiAgICovXHJcbiAgQElucHV0KCkgb3BlbkRheUV2ZW50c1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCBhY3Rpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCBpbmRpY2F0ZSB3aGljaCBkYXlzIGFyZSB3ZWVrZW5kc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdlZWtlbmREYXlzOiBudW1iZXJbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb3V0cHV0IHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIHRoZSB2aWV3IGlzIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtb250aC5cclxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGEgZGF5IGluIHRoZSBib2R5IGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGNlbGwgZWxlbWVudCBpbiB0aGUgdGVtcGxhdGVcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhck1vbnRoVmlld0JlZm9yZVJlbmRlckV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZGF5IGNlbGwgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGRheUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGRheTogTW9udGhWaWV3RGF5O1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcclxuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhIGhlYWRlciB3ZWVrIGRheSBpcyBjbGlja2VkLiBSZXR1cm5zIElTTyBkYXkgbnVtYmVyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjb2x1bW5IZWFkZXJDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBpc29EYXlOdW1iZXI6IG51bWJlcjtcclxuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyBkcmFnZ2VkIGFuZCBkcm9wcGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRUaW1lc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgQ2FsZW5kYXJNb250aFZpZXdFdmVudFRpbWVzQ2hhbmdlZEV2ZW50XHJcbiAgPigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgY29sdW1uSGVhZGVyczogV2Vla0RheVtdO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdmlldzogTW9udGhWaWV3O1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgb3BlblJvd0luZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBvcGVuRGF5OiBNb250aFZpZXdEYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB0cmFja0J5Um93T2Zmc2V0ID0gKGluZGV4OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSA9PlxyXG4gICAgdGhpcy52aWV3LmRheXNcclxuICAgICAgLnNsaWNlKG9mZnNldCwgdGhpcy52aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWspXHJcbiAgICAgIC5tYXAoZGF5ID0+IGRheS5kYXRlLnRvSVNPU3RyaW5nKCkpXHJcbiAgICAgIC5qb2luKCctJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB0cmFja0J5RGF0ZSA9IChpbmRleDogbnVtYmVyLCBkYXk6IE1vbnRoVmlld0RheSkgPT4gZGF5LmRhdGUudG9JU09TdHJpbmcoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcm90ZWN0ZWQgdXRpbHM6IENhbGVuZGFyVXRpbHMsXHJcbiAgICBASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmcsXHJcbiAgICBwcm90ZWN0ZWQgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XHJcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVmcmVzaEhlYWRlciA9XHJcbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cyB8fCBjaGFuZ2VzLndlZWtlbmREYXlzO1xyXG4gICAgY29uc3QgcmVmcmVzaEJvZHkgPVxyXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XHJcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XHJcbiAgICAgIGNoYW5nZXMuZXhjbHVkZURheXMgfHxcclxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cztcclxuXHJcbiAgICBpZiAocmVmcmVzaEhlYWRlcikge1xyXG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcclxuICAgICAgdmFsaWRhdGVFdmVudHModGhpcy5ldmVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZWZyZXNoQm9keSkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlZnJlc2hIZWFkZXIgfHwgcmVmcmVzaEJvZHkpIHtcclxuICAgICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgY2hhbmdlcy5hY3RpdmVEYXlJc09wZW4gfHxcclxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxyXG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxyXG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XHJcbiAgICAgIGNoYW5nZXMuYWN0aXZlRGF5XHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jaGVja0FjdGl2ZURheUlzT3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB0b2dnbGVEYXlIaWdobGlnaHQoZXZlbnQ6IENhbGVuZGFyRXZlbnQsIGlzSGlnaGxpZ2h0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMudmlldy5kYXlzLmZvckVhY2goZGF5ID0+IHtcclxuICAgICAgaWYgKGlzSGlnaGxpZ2h0ZWQgJiYgZGF5LmV2ZW50cy5pbmRleE9mKGV2ZW50KSA+IC0xKSB7XHJcbiAgICAgICAgZGF5LmJhY2tncm91bmRDb2xvciA9XHJcbiAgICAgICAgICAoZXZlbnQuY29sb3IgJiYgZXZlbnQuY29sb3Iuc2Vjb25kYXJ5KSB8fCAnI0QxRThGRic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVsZXRlIGRheS5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGV2ZW50RHJvcHBlZChcclxuICAgIGRyb3BwZWRPbjogTW9udGhWaWV3RGF5LFxyXG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQsXHJcbiAgICBkcmFnZ2VkRnJvbT86IE1vbnRoVmlld0RheVxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKGRyb3BwZWRPbiAhPT0gZHJhZ2dlZEZyb20pIHtcclxuICAgICAgY29uc3QgeWVhcjogbnVtYmVyID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRyb3BwZWRPbi5kYXRlKTtcclxuICAgICAgY29uc3QgbW9udGg6IG51bWJlciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0TW9udGgoZHJvcHBlZE9uLmRhdGUpO1xyXG4gICAgICBjb25zdCBkYXRlOiBudW1iZXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldERhdGUoZHJvcHBlZE9uLmRhdGUpO1xyXG4gICAgICBjb25zdCBuZXdTdGFydDogRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0RGF0ZShcclxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLnNldE1vbnRoKFxyXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRZZWFyKGV2ZW50LnN0YXJ0LCB5ZWFyKSxcclxuICAgICAgICAgIG1vbnRoXHJcbiAgICAgICAgKSxcclxuICAgICAgICBkYXRlXHJcbiAgICAgICk7XHJcbiAgICAgIGxldCBuZXdFbmQ6IERhdGU7XHJcbiAgICAgIGlmIChldmVudC5lbmQpIHtcclxuICAgICAgICBjb25zdCBzZWNvbmRzRGlmZjogbnVtYmVyID0gdGhpcy5kYXRlQWRhcHRlci5kaWZmZXJlbmNlSW5TZWNvbmRzKFxyXG4gICAgICAgICAgbmV3U3RhcnQsXHJcbiAgICAgICAgICBldmVudC5zdGFydFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbmV3RW5kID0gdGhpcy5kYXRlQWRhcHRlci5hZGRTZWNvbmRzKGV2ZW50LmVuZCwgc2Vjb25kc0RpZmYpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgbmV3U3RhcnQsXHJcbiAgICAgICAgbmV3RW5kLFxyXG4gICAgICAgIGRheTogZHJvcHBlZE9uLFxyXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuRHJvcFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2x1bW5IZWFkZXJzID0gdGhpcy51dGlscy5nZXRXZWVrVmlld0hlYWRlcih7XHJcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxyXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcclxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xyXG4gICAgdGhpcy52aWV3ID0gdGhpcy51dGlscy5nZXRNb250aFZpZXcoe1xyXG4gICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxyXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICAgIHdlZWtlbmREYXlzOiB0aGlzLndlZWtlbmREYXlzXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjaGVja0FjdGl2ZURheUlzT3BlbigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZURheUlzT3BlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCBhY3RpdmVEYXkgPSB0aGlzLmFjdGl2ZURheSB8fCB0aGlzLnZpZXdEYXRlO1xyXG4gICAgICB0aGlzLm9wZW5EYXkgPSB0aGlzLnZpZXcuZGF5cy5maW5kKGRheSA9PlxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuaXNTYW1lRGF5KGRheS5kYXRlLCBhY3RpdmVEYXkpXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLnZpZXcuZGF5cy5pbmRleE9mKHRoaXMub3BlbkRheSk7XHJcbiAgICAgIHRoaXMub3BlblJvd0luZGV4ID1cclxuICAgICAgICBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy52aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWspICpcclxuICAgICAgICB0aGlzLnZpZXcudG90YWxEYXlzVmlzaWJsZUluV2VlaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub3BlblJvd0luZGV4ID0gbnVsbDtcclxuICAgICAgdGhpcy5vcGVuRGF5ID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZWZyZXNoQWxsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XHJcbiAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XHJcbiAgICB0aGlzLmNoZWNrQWN0aXZlRGF5SXNPcGVuKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5IZWFkZXJzICYmIHRoaXMudmlldykge1xyXG4gICAgICB0aGlzLmJlZm9yZVZpZXdSZW5kZXIuZW1pdCh7XHJcbiAgICAgICAgaGVhZGVyOiB0aGlzLmNvbHVtbkhlYWRlcnMsXHJcbiAgICAgICAgYm9keTogdGhpcy52aWV3LmRheXMsXHJcbiAgICAgICAgcGVyaW9kOiB0aGlzLnZpZXcucGVyaW9kXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=