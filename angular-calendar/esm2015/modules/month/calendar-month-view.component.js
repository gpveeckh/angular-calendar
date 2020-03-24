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
let CalendarMonthViewComponent = class CalendarMonthViewComponent {
    /**
     * @hidden
     */
    constructor(cdr, utils, locale, dateAdapter) {
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
        this.trackByRowOffset = (index, offset) => this.view.days
            .slice(offset, this.view.totalDaysVisibleInWeek)
            .map(day => day.date.toISOString())
            .join('-');
        /**
         * @hidden
         */
        this.trackByDate = (index, day) => day.date.toISOString();
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        const refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays;
        const refreshBody = changes.viewDate ||
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
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    toggleDayHighlight(event, isHighlighted) {
        this.view.days.forEach(day => {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor =
                    (event.color && event.color.secondary) || '#D1E8FF';
            }
            else {
                delete day.backgroundColor;
            }
        });
    }
    /**
     * @hidden
     */
    eventDropped(droppedOn, event, draggedFrom) {
        if (droppedOn !== draggedFrom) {
            const year = this.dateAdapter.getYear(droppedOn.date);
            const month = this.dateAdapter.getMonth(droppedOn.date);
            const date = this.dateAdapter.getDate(droppedOn.date);
            const newStart = this.dateAdapter.setDate(this.dateAdapter.setMonth(this.dateAdapter.setYear(event.start, year), month), date);
            let newEnd;
            if (event.end) {
                const secondsDiff = this.dateAdapter.differenceInSeconds(newStart, event.start);
                newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
            }
            this.eventTimesChanged.emit({
                event,
                newStart,
                newEnd,
                day: droppedOn,
                type: CalendarEventTimesChangedEventType.Drop
            });
        }
    }
    refreshHeader() {
        this.columnHeaders = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    }
    refreshBody() {
        this.view = this.utils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    }
    checkActiveDayIsOpen() {
        if (this.activeDayIsOpen === true) {
            const activeDay = this.activeDay || this.viewDate;
            this.openDay = this.view.days.find(day => this.dateAdapter.isSameDay(day.date, activeDay));
            const index = this.view.days.indexOf(this.openDay);
            this.openRowIndex =
                Math.floor(index / this.view.totalDaysVisibleInWeek) *
                    this.view.totalDaysVisibleInWeek;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
        this.checkActiveDayIsOpen();
    }
    emitBeforeViewRender() {
        if (this.columnHeaders && this.view) {
            this.beforeViewRender.emit({
                header: this.columnHeaders,
                body: this.view.days,
                period: this.view.period
            });
        }
    }
};
CalendarMonthViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
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
        template: `
    <div class="cal-month-view" role="grid">
      <mwl-calendar-month-view-header
        [days]="columnHeaders"
        [locale]="locale"
        (columnHeaderClicked)="columnHeaderClicked.emit($event)"
        [customTemplate]="headerTemplate"
      >
      </mwl-calendar-month-view-header>
      <div class="cal-days">
        <div
          *ngFor="let rowIndex of view.rowOffsets; trackBy: trackByRowOffset"
        >
          <div class="cal-cell-row">
            <mwl-calendar-month-cell
              *ngFor="
                let day of view.days
                  | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek;
                trackBy: trackByDate
              "
              [ngClass]="day?.cssClass"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="cellTemplate"
              [ngStyle]="{ backgroundColor: day.backgroundColor }"
              (mwlClick)="dayClicked.emit({ day: day, sourceEvent: $event })"
              [clickListenerDisabled]="dayClicked.observers.length === 0"
              (mwlKeydownEnter)="
                dayClicked.emit({ day: day, sourceEvent: $event })
              "
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              mwlDroppable
              dragOverClass="cal-drag-over"
              (drop)="
                eventDropped(
                  day,
                  $event.dropData.event,
                  $event.dropData.draggedFrom
                )
              "
              (eventClicked)="
                eventClicked.emit({
                  event: $event.event,
                  sourceEvent: $event.sourceEvent
                })
              "
              [attr.tabindex]="{} | calendarA11y: 'monthCellTabIndex'"
            >
            </mwl-calendar-month-cell>
          </div>
          <mwl-calendar-open-day-events
            [locale]="locale"
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            [date]="openDay?.date"
            [customTemplate]="openDayEventsTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            [eventActionsTemplate]="eventActionsTemplate"
            (eventClicked)="
              eventClicked.emit({
                event: $event.event,
                sourceEvent: $event.sourceEvent
              })
            "
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped(
                openDay,
                $event.dropData.event,
                $event.dropData.draggedFrom
              )
            "
          >
          </mwl-calendar-open-day-events>
        </div>
      </div>
    </div>
  `
    }),
    tslib_1.__param(2, Inject(LOCALE_ID)),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
        CalendarUtils, String, DateAdapter])
], CalendarMonthViewComponent);
export { CalendarMonthViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUVMLGtDQUFrQyxFQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBZ0IvRDs7Ozs7Ozs7O0dBU0c7QUF5RkgsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUE4S3JDOztPQUVHO0lBQ0gsWUFDWSxHQUFzQixFQUN0QixLQUFvQixFQUNYLE1BQWMsRUFDdkIsV0FBd0I7UUFIeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUVwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTlLcEM7OztXQUdHO1FBQ00sV0FBTSxHQUFvQixFQUFFLENBQUM7UUFFdEM7O1dBRUc7UUFDTSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUVwQzs7V0FFRztRQUNNLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBaUIxQzs7V0FFRztRQUNNLHFCQUFnQixHQUFtQixNQUFNLENBQUM7UUFPbkQ7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SCxpQkFBaUI7UUFDZixhQUFhLFVBRVAsV0FBVztHQXJMekIsMEJBQTBCLENBNFZ0QztTQTVWWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIExPQ0FMRV9JRCxcclxuICBJbmplY3QsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDYWxlbmRhckV2ZW50LFxyXG4gIFdlZWtEYXksXHJcbiAgTW9udGhWaWV3LFxyXG4gIE1vbnRoVmlld0RheSxcclxuICBWaWV3UGVyaW9kXHJcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtcclxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXHJcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZVxyXG59IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50cyB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhck1vbnRoVmlld0JlZm9yZVJlbmRlckV2ZW50IHtcclxuICBoZWFkZXI6IFdlZWtEYXlbXTtcclxuICBib2R5OiBNb250aFZpZXdEYXlbXTtcclxuICBwZXJpb2Q6IFZpZXdQZXJpb2Q7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJNb250aFZpZXdFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PFxyXG4gIEV2ZW50TWV0YVR5cGUgPSBhbnksXHJcbiAgRGF5TWV0YVR5cGUgPSBhbnlcclxuPiBleHRlbmRzIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudDxFdmVudE1ldGFUeXBlPiB7XHJcbiAgZGF5OiBNb250aFZpZXdEYXk8RGF5TWV0YVR5cGU+O1xyXG59XHJcblxyXG4vKipcclxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIG1vbnRoLiBFeGFtcGxlIHVzYWdlOlxyXG4gKlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIDxtd2wtY2FsZW5kYXItbW9udGgtdmlld1xyXG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcclxuICogIFtldmVudHNdPVwiZXZlbnRzXCI+XHJcbiAqIDwvbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXc+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtdmlldycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJjYWwtbW9udGgtdmlld1wiIHJvbGU9XCJncmlkXCI+XHJcbiAgICAgIDxtd2wtY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXJcclxuICAgICAgICBbZGF5c109XCJjb2x1bW5IZWFkZXJzXCJcclxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgICAgKGNvbHVtbkhlYWRlckNsaWNrZWQpPVwiY29sdW1uSGVhZGVyQ2xpY2tlZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJoZWFkZXJUZW1wbGF0ZVwiXHJcbiAgICAgID5cclxuICAgICAgPC9td2wtY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5c1wiPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCByb3dJbmRleCBvZiB2aWV3LnJvd09mZnNldHM7IHRyYWNrQnk6IHRyYWNrQnlSb3dPZmZzZXRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtY2VsbC1yb3dcIj5cclxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci1tb250aC1jZWxsXHJcbiAgICAgICAgICAgICAgKm5nRm9yPVwiXHJcbiAgICAgICAgICAgICAgICBsZXQgZGF5IG9mIHZpZXcuZGF5c1xyXG4gICAgICAgICAgICAgICAgICB8IHNsaWNlOiByb3dJbmRleDpyb3dJbmRleCArIHZpZXcudG90YWxEYXlzVmlzaWJsZUluV2VlaztcclxuICAgICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlEYXRlXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJkYXk/LmNzc0NsYXNzXCJcclxuICAgICAgICAgICAgICBbZGF5XT1cImRheVwiXHJcbiAgICAgICAgICAgICAgW29wZW5EYXldPVwib3BlbkRheVwiXHJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXHJcbiAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImNlbGxUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyBiYWNrZ3JvdW5kQ29sb3I6IGRheS5iYWNrZ3JvdW5kQ29sb3IgfVwiXHJcbiAgICAgICAgICAgICAgKG13bENsaWNrKT1cImRheUNsaWNrZWQuZW1pdCh7IGRheTogZGF5LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcclxuICAgICAgICAgICAgICBbY2xpY2tMaXN0ZW5lckRpc2FibGVkXT1cImRheUNsaWNrZWQub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMFwiXHJcbiAgICAgICAgICAgICAgKG13bEtleWRvd25FbnRlcik9XCJcclxuICAgICAgICAgICAgICAgIGRheUNsaWNrZWQuZW1pdCh7IGRheTogZGF5LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAoaGlnaGxpZ2h0RGF5KT1cInRvZ2dsZURheUhpZ2hsaWdodCgkZXZlbnQuZXZlbnQsIHRydWUpXCJcclxuICAgICAgICAgICAgICAodW5oaWdobGlnaHREYXkpPVwidG9nZ2xlRGF5SGlnaGxpZ2h0KCRldmVudC5ldmVudCwgZmFsc2UpXCJcclxuICAgICAgICAgICAgICBtd2xEcm9wcGFibGVcclxuICAgICAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXHJcbiAgICAgICAgICAgICAgKGRyb3ApPVwiXHJcbiAgICAgICAgICAgICAgICBldmVudERyb3BwZWQoXHJcbiAgICAgICAgICAgICAgICAgIGRheSxcclxuICAgICAgICAgICAgICAgICAgJGV2ZW50LmRyb3BEYXRhLmV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAkZXZlbnQuZHJvcERhdGEuZHJhZ2dlZEZyb21cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiXHJcbiAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiAkZXZlbnQuZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnQuc291cmNlRXZlbnRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ7fSB8IGNhbGVuZGFyQTExeTogJ21vbnRoQ2VsbFRhYkluZGV4J1wiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItbW9udGgtY2VsbD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPG13bC1jYWxlbmRhci1vcGVuLWRheS1ldmVudHNcclxuICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICBbaXNPcGVuXT1cIm9wZW5Sb3dJbmRleCA9PT0gcm93SW5kZXhcIlxyXG4gICAgICAgICAgICBbZXZlbnRzXT1cIm9wZW5EYXk/LmV2ZW50c1wiXHJcbiAgICAgICAgICAgIFtkYXRlXT1cIm9wZW5EYXk/LmRhdGVcIlxyXG4gICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwib3BlbkRheUV2ZW50c1RlbXBsYXRlXCJcclxuICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cIlxyXG4gICAgICAgICAgICAgIGV2ZW50Q2xpY2tlZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGV2ZW50OiAkZXZlbnQuZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VFdmVudDogJGV2ZW50LnNvdXJjZUV2ZW50XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgbXdsRHJvcHBhYmxlXHJcbiAgICAgICAgICAgIGRyYWdPdmVyQ2xhc3M9XCJjYWwtZHJhZy1vdmVyXCJcclxuICAgICAgICAgICAgKGRyb3ApPVwiXHJcbiAgICAgICAgICAgICAgZXZlbnREcm9wcGVkKFxyXG4gICAgICAgICAgICAgICAgb3BlbkRheSxcclxuICAgICAgICAgICAgICAgICRldmVudC5kcm9wRGF0YS5ldmVudCxcclxuICAgICAgICAgICAgICAgICRldmVudC5kcm9wRGF0YS5kcmFnZ2VkRnJvbVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXcuXHJcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IHdpbGwgYmUgaGlkZGVuIG9uIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGV2ZW50cyBsaXN0IGZvciB0aGUgZGF5IG9mIHRoZSBgdmlld0RhdGVgIG9wdGlvbiBpcyB2aXNpYmxlIG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFjdGl2ZURheUlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBzZXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGF5IHRoYXQgc2hvdWxkIGJlIG9wZW4uIElmIG5vdCBzZXQsIHRoZSBgdmlld0RhdGVgIGlzIHVzZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBhY3RpdmVEYXk6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYXV0byc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGV2ZW50IHRvb2x0aXBzXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgbm90IHByb3ZpZGVkIHRoZSB0b29sdGlwXHJcbiAgICogd2lsbCBiZSBkaXNwbGF5ZWQgaW1tZWRpYXRlbHkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaGVhZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBkYXkgY2VsbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNlbGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgc2xpZGUgZG93biBib3ggb2YgZXZlbnRzIGZvciB0aGUgYWN0aXZlIGRheVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wZW5EYXlFdmVudHNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgYWN0aW9uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgaW5kaWNhdGUgd2hpY2ggZGF5cyBhcmUgd2Vla2VuZHNcclxuICAgKi9cclxuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbW9udGguXHJcbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhIGRheSBpbiB0aGUgYm9keSBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBjZWxsIGVsZW1lbnQgaW4gdGhlIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgYmVmb3JlVmlld1JlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJNb250aFZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGRheSBjZWxsIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBkYXlDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBkYXk6IE1vbnRoVmlld0RheTtcclxuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XHJcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gYSBoZWFkZXIgd2VlayBkYXkgaXMgY2xpY2tlZC4gUmV0dXJucyBJU08gZGF5IG51bWJlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgY29sdW1uSGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgaXNvRGF5TnVtYmVyOiBudW1iZXI7XHJcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgZHJhZ2dlZCBhbmQgZHJvcHBlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50VGltZXNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIENhbGVuZGFyTW9udGhWaWV3RXZlbnRUaW1lc0NoYW5nZWRFdmVudFxyXG4gID4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGNvbHVtbkhlYWRlcnM6IFdlZWtEYXlbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHZpZXc6IE1vbnRoVmlldztcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIG9wZW5Sb3dJbmRleDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgb3BlbkRheTogTW9udGhWaWV3RGF5O1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeVJvd09mZnNldCA9IChpbmRleDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikgPT5cclxuICAgIHRoaXMudmlldy5kYXlzXHJcbiAgICAgIC5zbGljZShvZmZzZXQsIHRoaXMudmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrKVxyXG4gICAgICAubWFwKGRheSA9PiBkYXkuZGF0ZS50b0lTT1N0cmluZygpKVxyXG4gICAgICAuam9pbignLScpO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeURhdGUgPSAoaW5kZXg6IG51bWJlciwgZGF5OiBNb250aFZpZXdEYXkpID0+IGRheS5kYXRlLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJvdGVjdGVkIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxyXG4gICAgQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nLFxyXG4gICAgcHJvdGVjdGVkIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlclxyXG4gICkge1xyXG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlZnJlc2hIZWFkZXIgPVxyXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8IGNoYW5nZXMuZXhjbHVkZURheXMgfHwgY2hhbmdlcy53ZWVrZW5kRGF5cztcclxuICAgIGNvbnN0IHJlZnJlc2hCb2R5ID1cclxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxyXG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxyXG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XHJcbiAgICAgIGNoYW5nZXMud2Vla2VuZERheXM7XHJcblxyXG4gICAgaWYgKHJlZnJlc2hIZWFkZXIpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzKSB7XHJcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVmcmVzaEJvZHkpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZWZyZXNoSGVhZGVyIHx8IHJlZnJlc2hCb2R5KSB7XHJcbiAgICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGNoYW5nZXMuYWN0aXZlRGF5SXNPcGVuIHx8XHJcbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcclxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcclxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxyXG4gICAgICBjaGFuZ2VzLmFjdGl2ZURheVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY2hlY2tBY3RpdmVEYXlJc09wZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdG9nZ2xlRGF5SGlnaGxpZ2h0KGV2ZW50OiBDYWxlbmRhckV2ZW50LCBpc0hpZ2hsaWdodGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXcuZGF5cy5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgIGlmIChpc0hpZ2hsaWdodGVkICYmIGRheS5ldmVudHMuaW5kZXhPZihldmVudCkgPiAtMSkge1xyXG4gICAgICAgIGRheS5iYWNrZ3JvdW5kQ29sb3IgPVxyXG4gICAgICAgICAgKGV2ZW50LmNvbG9yICYmIGV2ZW50LmNvbG9yLnNlY29uZGFyeSkgfHwgJyNEMUU4RkYnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlbGV0ZSBkYXkuYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBldmVudERyb3BwZWQoXHJcbiAgICBkcm9wcGVkT246IE1vbnRoVmlld0RheSxcclxuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50LFxyXG4gICAgZHJhZ2dlZEZyb20/OiBNb250aFZpZXdEYXlcclxuICApOiB2b2lkIHtcclxuICAgIGlmIChkcm9wcGVkT24gIT09IGRyYWdnZWRGcm9tKSB7XHJcbiAgICAgIGNvbnN0IHllYXI6IG51bWJlciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkcm9wcGVkT24uZGF0ZSk7XHJcbiAgICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRyb3BwZWRPbi5kYXRlKTtcclxuICAgICAgY29uc3QgZGF0ZTogbnVtYmVyID0gdGhpcy5kYXRlQWRhcHRlci5nZXREYXRlKGRyb3BwZWRPbi5kYXRlKTtcclxuICAgICAgY29uc3QgbmV3U3RhcnQ6IERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLnNldERhdGUoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRNb250aChcclxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuc2V0WWVhcihldmVudC5zdGFydCwgeWVhciksXHJcbiAgICAgICAgICBtb250aFxyXG4gICAgICAgICksXHJcbiAgICAgICAgZGF0ZVxyXG4gICAgICApO1xyXG4gICAgICBsZXQgbmV3RW5kOiBEYXRlO1xyXG4gICAgICBpZiAoZXZlbnQuZW5kKSB7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kc0RpZmY6IG51bWJlciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZGlmZmVyZW5jZUluU2Vjb25kcyhcclxuICAgICAgICAgIG5ld1N0YXJ0LFxyXG4gICAgICAgICAgZXZlbnQuc3RhcnRcclxuICAgICAgICApO1xyXG4gICAgICAgIG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkU2Vjb25kcyhldmVudC5lbmQsIHNlY29uZHNEaWZmKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIGV2ZW50LFxyXG4gICAgICAgIG5ld1N0YXJ0LFxyXG4gICAgICAgIG5ld0VuZCxcclxuICAgICAgICBkYXk6IGRyb3BwZWRPbixcclxuICAgICAgICB0eXBlOiBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlLkRyb3BcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVmcmVzaEhlYWRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuY29sdW1uSGVhZGVycyA9IHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXdIZWFkZXIoe1xyXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICAgIHdlZWtlbmREYXlzOiB0aGlzLndlZWtlbmREYXlzXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZWZyZXNoQm9keSgpOiB2b2lkIHtcclxuICAgIHRoaXMudmlldyA9IHRoaXMudXRpbHMuZ2V0TW9udGhWaWV3KHtcclxuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcclxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXHJcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXHJcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxyXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5c1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY2hlY2tBY3RpdmVEYXlJc09wZW4oKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVEYXlJc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgYWN0aXZlRGF5ID0gdGhpcy5hY3RpdmVEYXkgfHwgdGhpcy52aWV3RGF0ZTtcclxuICAgICAgdGhpcy5vcGVuRGF5ID0gdGhpcy52aWV3LmRheXMuZmluZChkYXkgPT5cclxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLmlzU2FtZURheShkYXkuZGF0ZSwgYWN0aXZlRGF5KVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy52aWV3LmRheXMuaW5kZXhPZih0aGlzLm9wZW5EYXkpO1xyXG4gICAgICB0aGlzLm9wZW5Sb3dJbmRleCA9XHJcbiAgICAgICAgTWF0aC5mbG9vcihpbmRleCAvIHRoaXMudmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrKSAqXHJcbiAgICAgICAgdGhpcy52aWV3LnRvdGFsRGF5c1Zpc2libGVJbldlZWs7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW5Sb3dJbmRleCA9IG51bGw7XHJcbiAgICAgIHRoaXMub3BlbkRheSA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVmcmVzaEFsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xyXG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xyXG4gICAgdGhpcy5jaGVja0FjdGl2ZURheUlzT3BlbigpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29sdW1uSGVhZGVycyAmJiB0aGlzLnZpZXcpIHtcclxuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xyXG4gICAgICAgIGhlYWRlcjogdGhpcy5jb2x1bW5IZWFkZXJzLFxyXG4gICAgICAgIGJvZHk6IHRoaXMudmlldy5kYXlzLFxyXG4gICAgICAgIHBlcmlvZDogdGhpcy52aWV3LnBlcmlvZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19