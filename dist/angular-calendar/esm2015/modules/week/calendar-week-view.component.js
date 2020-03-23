import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnInit, OnDestroy, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import { CalendarEventTimesChangedEventType } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, roundToNearest, trackByWeekDayHeaderDate, trackByHourSegment, trackByHour, getMinutesMoved, getDefaultEventEnd, getMinimumEventHeightInMinutes, addDaysWithExclusions, isDraggedWithinPeriod, shouldFireDroppedEvent, getWeekViewPeriod, trackByWeekAllDayEvent, trackByWeekTimeEvent } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-week-view>
 * ```
 */
let CalendarWeekViewComponent = class CalendarWeekViewComponent {
    /**
     * @hidden
     */
    constructor(cdr, utils, locale, dateAdapter) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
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
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
        /**
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
         */
        this.dayHeaderClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current week.
         * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.allDayEventResizes = new Map();
        /**
         * @hidden
         */
        this.timeEventResizes = new Map();
        /**
         * @hidden
         */
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0
        };
        /**
         * @hidden
         */
        this.dragActive = false;
        /**
         * @hidden
         */
        this.dragAlreadyMoved = false;
        /**
         * @hidden
         */
        this.calendarId = Symbol('angular calendar week view id');
        /**
         * @hidden
         */
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        /**
         * @hidden
         */
        this.trackByHourSegment = trackByHourSegment;
        /**
         * @hidden
         */
        this.trackByHour = trackByHour;
        /**
         * @hidden
         */
        this.trackByWeekAllDayEvent = trackByWeekAllDayEvent;
        /**
         * @hidden
         */
        this.trackByWeekTimeEvent = trackByWeekTimeEvent;
        /**
         * @hidden
         */
        this.trackByHourColumn = (index, column) => column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
        /**
         * @hidden
         */
        this.trackById = (index, row) => row.id;
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
        const refreshHeader = changes.viewDate ||
            changes.excludeDays ||
            changes.weekendDays ||
            changes.daysInWeek ||
            changes.weekStartsOn;
        const refreshBody = changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments ||
            changes.weekStartsOn ||
            changes.weekendDays ||
            changes.excludeDays ||
            changes.hourSegmentHeight ||
            changes.events ||
            changes.daysInWeek;
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
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    resizeStarted(eventsContainer, minWidth) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        const resizeHelper = new CalendarResizeHelper(eventsContainer, minWidth);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    timeEventResizeStarted(eventsContainer, timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        this.resizeStarted(eventsContainer);
    }
    /**
     * @hidden
     */
    timeEventResizing(timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        const adjustedEvents = new Map();
        const tempEvents = [...this.events];
        this.timeEventResizes.forEach((lastResizeEvent, event) => {
            const newEventDates = this.getTimeEventResizedDates(event, lastResizeEvent);
            const adjustedEvent = Object.assign({}, event, newEventDates);
            adjustedEvents.set(adjustedEvent, event);
            const eventIndex = tempEvents.indexOf(event);
            tempEvents[eventIndex] = adjustedEvent;
        });
        this.restoreOriginalEvents(tempEvents, adjustedEvents);
    }
    /**
     * @hidden
     */
    timeEventResizeEnded(timeEvent) {
        this.view = this.getWeekView(this.events);
        const lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
        if (lastResizeEvent) {
            this.timeEventResizes.delete(timeEvent.event);
            const newEventDates = this.getTimeEventResizedDates(timeEvent.event, lastResizeEvent);
            this.eventTimesChanged.emit({
                newStart: newEventDates.start,
                newEnd: newEventDates.end,
                event: timeEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
        }
    }
    /**
     * @hidden
     */
    allDayEventResizeStarted(allDayEventsContainer, allDayEvent, resizeEvent) {
        this.allDayEventResizes.set(allDayEvent, {
            originalOffset: allDayEvent.offset,
            originalSpan: allDayEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.resizeStarted(allDayEventsContainer, this.getDayColumnWidth(allDayEventsContainer));
    }
    /**
     * @hidden
     */
    allDayEventResizing(allDayEvent, resizeEvent, dayWidth) {
        const currentResize = this.allDayEventResizes.get(allDayEvent);
        if (typeof resizeEvent.edges.left !== 'undefined') {
            const diff = Math.round(+resizeEvent.edges.left / dayWidth);
            allDayEvent.offset = currentResize.originalOffset + diff;
            allDayEvent.span = currentResize.originalSpan - diff;
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            const diff = Math.round(+resizeEvent.edges.right / dayWidth);
            allDayEvent.span = currentResize.originalSpan + diff;
        }
    }
    /**
     * @hidden
     */
    allDayEventResizeEnded(allDayEvent) {
        const currentResize = this.allDayEventResizes.get(allDayEvent);
        if (currentResize) {
            const allDayEventResizingBeforeStart = currentResize.edge === 'left';
            let daysDiff;
            if (allDayEventResizingBeforeStart) {
                daysDiff = allDayEvent.offset - currentResize.originalOffset;
            }
            else {
                daysDiff = allDayEvent.span - currentResize.originalSpan;
            }
            allDayEvent.offset = currentResize.originalOffset;
            allDayEvent.span = currentResize.originalSpan;
            let newStart = allDayEvent.event.start;
            let newEnd = allDayEvent.event.end || allDayEvent.event.start;
            if (allDayEventResizingBeforeStart) {
                newStart = addDaysWithExclusions(this.dateAdapter, newStart, daysDiff, this.excludeDays);
            }
            else {
                newEnd = addDaysWithExclusions(this.dateAdapter, newEnd, daysDiff, this.excludeDays);
            }
            this.eventTimesChanged.emit({
                newStart,
                newEnd,
                event: allDayEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
            this.allDayEventResizes.delete(allDayEvent);
        }
    }
    /**
     * @hidden
     */
    getDayColumnWidth(eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    }
    /**
     * @hidden
     */
    dateDragEnter(date) {
        this.lastDragEnterDate = date;
    }
    /**
     * @hidden
     */
    eventDropped(dropEvent, date, allDay) {
        if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId) &&
            this.lastDragEnterDate.getTime() === date.getTime()) {
            this.eventTimesChanged.emit({
                type: CalendarEventTimesChangedEventType.Drop,
                event: dropEvent.dropData.event,
                newStart: date,
                allDay
            });
        }
    }
    /**
     * @hidden
     */
    dragEnter(type) {
        this.eventDragEnterByType[type]++;
    }
    /**
     * @hidden
     */
    dragLeave(type) {
        this.eventDragEnterByType[type]--;
    }
    /**
     * @hidden
     */
    dragStarted(eventsContainer, event, dayEvent) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        const dragHelper = new CalendarDragHelper(eventsContainer, event);
        this.validateDrag = ({ x, y, transform }) => this.allDayEventResizes.size === 0 &&
            this.timeEventResizes.size === 0 &&
            dragHelper.validateDrag({
                x,
                y,
                snapDraggedEvents: this.snapDraggedEvents,
                dragAlreadyMoved: this.dragAlreadyMoved,
                transform
            });
        this.dragActive = true;
        this.dragAlreadyMoved = false;
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0
        };
        if (!this.snapDraggedEvents && dayEvent) {
            this.view.hourColumns.forEach(column => {
                const linkedEvent = column.events.find(columnEvent => columnEvent.event === dayEvent.event && columnEvent !== dayEvent);
                // hide any linked events while dragging
                if (linkedEvent) {
                    linkedEvent.width = 0;
                    linkedEvent.height = 0;
                }
            });
        }
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    dragMove(dayEvent, dragEvent) {
        if (this.snapDraggedEvents) {
            const newEventTimes = this.getDragMovedEventTimes(dayEvent, dragEvent, this.dayColumnWidth, true);
            const originalEvent = dayEvent.event;
            const adjustedEvent = Object.assign({}, originalEvent, newEventTimes);
            const tempEvents = this.events.map(event => {
                if (event === originalEvent) {
                    return adjustedEvent;
                }
                return event;
            });
            this.restoreOriginalEvents(tempEvents, new Map([[adjustedEvent, originalEvent]]));
        }
        this.dragAlreadyMoved = true;
    }
    /**
     * @hidden
     */
    allDayEventDragMove() {
        this.dragAlreadyMoved = true;
    }
    /**
     * @hidden
     */
    dragEnded(weekEvent, dragEndEvent, dayWidth, useY = false) {
        this.view = this.getWeekView(this.events);
        this.dragActive = false;
        const { start, end } = this.getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY);
        if (this.eventDragEnterByType[useY ? 'time' : 'allDay'] > 0 &&
            isDraggedWithinPeriod(start, end, this.view.period)) {
            this.eventTimesChanged.emit({
                newStart: start,
                newEnd: end,
                event: weekEvent.event,
                type: CalendarEventTimesChangedEventType.Drag,
                allDay: !useY
            });
        }
    }
    refreshHeader() {
        this.days = this.utils.getWeekViewHeader(Object.assign({ viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    }
    refreshBody() {
        this.view = this.getWeekView(this.events);
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
    }
    emitBeforeViewRender() {
        if (this.days && this.view) {
            this.beforeViewRender.emit(Object.assign({ header: this.days }, this.view));
        }
    }
    getWeekView(events) {
        return this.utils.getWeekView(Object.assign({ events, viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, precision: this.precision, absolutePositionedEvents: true, hourSegments: this.hourSegments, dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            }, dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }, segmentHeight: this.hourSegmentHeight, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    }
    getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY) {
        const daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
        const minutesMoved = useY
            ? getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize)
            : 0;
        const start = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.start, daysDragged, this.excludeDays), minutesMoved);
        let end;
        if (weekEvent.event.end) {
            end = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.end, daysDragged, this.excludeDays), minutesMoved);
        }
        return { start, end };
    }
    restoreOriginalEvents(tempEvents, adjustedEvents) {
        const previousView = this.view;
        this.view = this.getWeekView(tempEvents);
        const adjustedEventsArray = tempEvents.filter(event => adjustedEvents.has(event));
        this.view.hourColumns.forEach((column, columnIndex) => {
            previousView.hourColumns[columnIndex].hours.forEach((hour, hourIndex) => {
                hour.segments.forEach((segment, segmentIndex) => {
                    column.hours[hourIndex].segments[segmentIndex].cssClass =
                        segment.cssClass;
                });
            });
            adjustedEventsArray.forEach(adjustedEvent => {
                const originalEvent = adjustedEvents.get(adjustedEvent);
                const existingColumnEvent = column.events.find(columnEvent => columnEvent.event === adjustedEvent);
                if (existingColumnEvent) {
                    // restore the original event so trackBy kicks in and the dom isn't changed
                    existingColumnEvent.event = originalEvent;
                }
                else {
                    // add a dummy event to the drop so if the event was removed from the original column the drag doesn't end early
                    column.events.push({
                        event: originalEvent,
                        left: 0,
                        top: 0,
                        height: 0,
                        width: 0,
                        startsBeforeDay: false,
                        endsAfterDay: false
                    });
                }
            });
        });
        adjustedEvents.clear();
    }
    getTimeEventResizedDates(calendarEvent, resizeEvent) {
        const minimumEventHeight = getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight);
        const newEventDates = {
            start: calendarEvent.start,
            end: getDefaultEventEnd(this.dateAdapter, calendarEvent, minimumEventHeight)
        };
        const { end } = calendarEvent, eventWithoutEnd = tslib_1.__rest(calendarEvent, ["end"]);
        const smallestResizes = {
            start: this.dateAdapter.addMinutes(newEventDates.end, minimumEventHeight * -1),
            end: getDefaultEventEnd(this.dateAdapter, eventWithoutEnd, minimumEventHeight)
        };
        if (typeof resizeEvent.edges.left !== 'undefined') {
            const daysDiff = Math.round(+resizeEvent.edges.left / this.dayColumnWidth);
            const newStart = addDaysWithExclusions(this.dateAdapter, newEventDates.start, daysDiff, this.excludeDays);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            const daysDiff = Math.round(+resizeEvent.edges.right / this.dayColumnWidth);
            const newEnd = addDaysWithExclusions(this.dateAdapter, newEventDates.end, daysDiff, this.excludeDays);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        if (typeof resizeEvent.edges.top !== 'undefined') {
            const minutesMoved = getMinutesMoved(resizeEvent.edges.top, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            const newStart = this.dateAdapter.addMinutes(newEventDates.start, minutesMoved);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.bottom !== 'undefined') {
            const minutesMoved = getMinutesMoved(resizeEvent.edges.bottom, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            const newEnd = this.dateAdapter.addMinutes(newEventDates.end, minutesMoved);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        return newEventDates;
    }
};
CalendarWeekViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Date)
], CalendarWeekViewComponent.prototype, "viewDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarWeekViewComponent.prototype, "events", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarWeekViewComponent.prototype, "excludeDays", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Subject)
], CalendarWeekViewComponent.prototype, "refresh", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CalendarWeekViewComponent.prototype, "locale", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "tooltipPlacement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "tooltipTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], CalendarWeekViewComponent.prototype, "tooltipAppendToBody", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "tooltipDelay", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "weekStartsOn", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "headerTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "eventTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "eventTitleTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "eventActionsTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CalendarWeekViewComponent.prototype, "precision", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CalendarWeekViewComponent.prototype, "weekendDays", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], CalendarWeekViewComponent.prototype, "snapDraggedEvents", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "hourSegments", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "hourSegmentHeight", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayStartHour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayStartMinute", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayEndHour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayEndMinute", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "hourSegmentTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "eventSnapSize", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "daysInWeek", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "dayHeaderClicked", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "eventClicked", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "eventTimesChanged", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "beforeViewRender", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "hourSegmentClicked", void 0);
CalendarWeekViewComponent = tslib_1.__decorate([
    Component({
        selector: 'mwl-calendar-week-view',
        template: `
    <div class="cal-week-view" role="grid">
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="
          eventDropped({ dropData: $event }, $event.newStart, true)
        "
        (dragEnter)="dateDragEnter($event.date)"
      >
      </mwl-calendar-week-view-header>
      <div
        class="cal-all-day-events"
        #allDayEventsContainer
        *ngIf="view.allDayEventRows.length > 0"
        mwlDroppable
        (dragEnter)="dragEnter('allDay')"
        (dragLeave)="dragLeave('allDay')"
      >
        <div class="cal-day-columns">
          <div
            class="cal-time-label-column"
            [ngTemplateOutlet]="allDayEventsLabelTemplate"
          ></div>
          <div
            class="cal-day-column"
            *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="eventDropped($event, day.date, true)"
            (dragEnter)="dateDragEnter(day.date)"
          ></div>
        </div>
        <div
          *ngFor="let eventRow of view.allDayEventRows; trackBy: trackById"
          #eventRowContainer
          class="cal-events-row"
        >
          <div
            *ngFor="
              let allDayEvent of eventRow.row;
              trackBy: trackByWeekAllDayEvent
            "
            #event
            class="cal-event-container"
            [class.cal-draggable]="
              allDayEvent.event.draggable && allDayEventResizes.size === 0
            "
            [class.cal-starts-within-week]="!allDayEvent.startsBeforeWeek"
            [class.cal-ends-within-week]="!allDayEvent.endsAfterWeek"
            [ngClass]="allDayEvent.event?.cssClass"
            [style.width.%]="(100 / days.length) * allDayEvent.span"
            [style.marginLeft.%]="(100 / days.length) * allDayEvent.offset"
            mwlResizable
            [resizeSnapGrid]="{ left: dayColumnWidth, right: dayColumnWidth }"
            [validateResize]="validateResize"
            (resizeStart)="
              allDayEventResizeStarted(eventRowContainer, allDayEvent, $event)
            "
            (resizing)="
              allDayEventResizing(allDayEvent, $event, dayColumnWidth)
            "
            (resizeEnd)="allDayEventResizeEnded(allDayEvent)"
            mwlDraggable
            dragActiveClass="cal-drag-active"
            [dropData]="{ event: allDayEvent.event, calendarId: calendarId }"
            [dragAxis]="{
              x: allDayEvent.event.draggable && allDayEventResizes.size === 0,
              y:
                !snapDraggedEvents &&
                allDayEvent.event.draggable &&
                allDayEventResizes.size === 0
            }"
            [dragSnapGrid]="snapDraggedEvents ? { x: dayColumnWidth } : {}"
            [validateDrag]="validateDrag"
            (dragStart)="dragStarted(eventRowContainer, event)"
            (dragging)="allDayEventDragMove()"
            (dragEnd)="dragEnded(allDayEvent, $event, dayColumnWidth)"
          >
            <div
              class="cal-resize-handle cal-resize-handle-before-start"
              *ngIf="
                allDayEvent.event?.resizable?.beforeStart &&
                !allDayEvent.startsBeforeWeek
              "
              mwlResizeHandle
              [resizeEdges]="{ left: true }"
            ></div>
            <mwl-calendar-week-view-event
              [locale]="locale"
              [weekEvent]="allDayEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              [daysInWeek]="daysInWeek"
              (eventClicked)="
                eventClicked.emit({
                  event: allDayEvent.event,
                  sourceEvent: $event.sourceEvent
                })
              "
            >
            </mwl-calendar-week-view-event>
            <div
              class="cal-resize-handle cal-resize-handle-after-end"
              *ngIf="
                allDayEvent.event?.resizable?.afterEnd &&
                !allDayEvent.endsAfterWeek
              "
              mwlResizeHandle
              [resizeEdges]="{ right: true }"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="cal-time-events"
        mwlDroppable
        (dragEnter)="dragEnter('time')"
        (dragLeave)="dragLeave('time')"
      >
        <div
          class="cal-time-label-column"
          *ngIf="view.hourColumns.length > 0 && daysInWeek !== 1"
        >
          <div
            *ngFor="
              let hour of view.hourColumns[0].hours;
              trackBy: trackByHour;
              let odd = odd
            "
            class="cal-hour"
            [class.cal-hour-odd]="odd"
          >
            <mwl-calendar-week-view-hour-segment
              *ngFor="let segment of hour.segments; trackBy: trackByHourSegment"
              [style.height.px]="hourSegmentHeight"
              [segment]="segment"
              [segmentHeight]="hourSegmentHeight"
              [locale]="locale"
              [customTemplate]="hourSegmentTemplate"
              [isTimeLabel]="true"
              [daysInWeek]="daysInWeek"
            >
            </mwl-calendar-week-view-hour-segment>
          </div>
        </div>
        <div
          class="cal-day-columns"
          [class.cal-resize-active]="timeEventResizes.size > 0"
          #dayColumns
        >
          <div
            class="cal-day-column"
            *ngFor="let column of view.hourColumns; trackBy: trackByHourColumn"
          >
            <mwl-calendar-week-view-current-time-marker
              [columnDate]="column.date"
              [dayStartHour]="dayStartHour"
              [dayStartMinute]="dayStartMinute"
              [dayEndHour]="dayEndHour"
              [dayEndMinute]="dayEndMinute"
              [hourSegments]="hourSegments"
              [hourSegmentHeight]="hourSegmentHeight"
              [customTemplate]="currentTimeMarkerTemplate"
            ></mwl-calendar-week-view-current-time-marker>
            <div class="cal-events-container">
              <div
                *ngFor="
                  let timeEvent of column.events;
                  trackBy: trackByWeekTimeEvent
                "
                #event
                class="cal-event-container"
                [class.cal-draggable]="
                  timeEvent.event.draggable && timeEventResizes.size === 0
                "
                [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
                [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
                [ngClass]="timeEvent.event.cssClass"
                [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
                [style.top.px]="timeEvent.top"
                [style.height.px]="timeEvent.height"
                [style.left.%]="timeEvent.left"
                [style.width.%]="timeEvent.width"
                mwlResizable
                [resizeSnapGrid]="{
                  left: dayColumnWidth,
                  right: dayColumnWidth,
                  top: eventSnapSize || hourSegmentHeight,
                  bottom: eventSnapSize || hourSegmentHeight
                }"
                [validateResize]="validateResize"
                [allowNegativeResizes]="true"
                (resizeStart)="
                  timeEventResizeStarted(dayColumns, timeEvent, $event)
                "
                (resizing)="timeEventResizing(timeEvent, $event)"
                (resizeEnd)="timeEventResizeEnded(timeEvent)"
                mwlDraggable
                dragActiveClass="cal-drag-active"
                [dropData]="{ event: timeEvent.event, calendarId: calendarId }"
                [dragAxis]="{
                  x: timeEvent.event.draggable && timeEventResizes.size === 0,
                  y: timeEvent.event.draggable && timeEventResizes.size === 0
                }"
                [dragSnapGrid]="
                  snapDraggedEvents
                    ? {
                        x: dayColumnWidth,
                        y: eventSnapSize || hourSegmentHeight
                      }
                    : {}
                "
                [ghostDragEnabled]="!snapDraggedEvents"
                [validateDrag]="validateDrag"
                (dragStart)="dragStarted(dayColumns, event, timeEvent)"
                (dragging)="dragMove(timeEvent, $event)"
                (dragEnd)="dragEnded(timeEvent, $event, dayColumnWidth, true)"
              >
                <div
                  class="cal-resize-handle cal-resize-handle-before-start"
                  *ngIf="
                    timeEvent.event?.resizable?.beforeStart &&
                    !timeEvent.startsBeforeDay
                  "
                  mwlResizeHandle
                  [resizeEdges]="{
                    left: true,
                    top: true
                  }"
                ></div>
                <mwl-calendar-week-view-event
                  [locale]="locale"
                  [weekEvent]="timeEvent"
                  [tooltipPlacement]="tooltipPlacement"
                  [tooltipTemplate]="tooltipTemplate"
                  [tooltipAppendToBody]="tooltipAppendToBody"
                  [tooltipDisabled]="dragActive || timeEventResizes.size > 0"
                  [tooltipDelay]="tooltipDelay"
                  [customTemplate]="eventTemplate"
                  [eventTitleTemplate]="eventTitleTemplate"
                  [eventActionsTemplate]="eventActionsTemplate"
                  [column]="column"
                  [daysInWeek]="daysInWeek"
                  (eventClicked)="
                    eventClicked.emit({
                      event: timeEvent.event,
                      sourceEvent: $event.sourceEvent
                    })
                  "
                >
                </mwl-calendar-week-view-event>
                <div
                  class="cal-resize-handle cal-resize-handle-after-end"
                  *ngIf="
                    timeEvent.event?.resizable?.afterEnd &&
                    !timeEvent.endsAfterDay
                  "
                  mwlResizeHandle
                  [resizeEdges]="{
                    right: true,
                    bottom: true
                  }"
                ></div>
              </div>
            </div>

            <div
              *ngFor="
                let hour of column.hours;
                trackBy: trackByHour;
                let odd = odd
              "
              class="cal-hour"
              [class.cal-hour-odd]="odd"
            >
              <mwl-calendar-week-view-hour-segment
                *ngFor="
                  let segment of hour.segments;
                  trackBy: trackByHourSegment
                "
                [style.height.px]="hourSegmentHeight"
                [segment]="segment"
                [segmentHeight]="hourSegmentHeight"
                [locale]="locale"
                [customTemplate]="hourSegmentTemplate"
                [daysInWeek]="daysInWeek"
                (mwlClick)="
                  hourSegmentClicked.emit({
                    date: segment.date,
                    sourceEvent: $event
                  })
                "
                [clickListenerDisabled]="
                  hourSegmentClicked.observers.length === 0
                "
                mwlDroppable
                [dragOverClass]="
                  !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null
                "
                dragActiveClass="cal-drag-active"
                (drop)="eventDropped($event, segment.date, false)"
                (dragEnter)="dateDragEnter(segment.date)"
                [isTimeLabel]="daysInWeek === 1"
              >
              </mwl-calendar-week-view-hour-segment>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
    }),
    tslib_1.__param(2, Inject(LOCALE_ID)),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
        CalendarUtils, String, DateAdapter])
], CalendarWeekViewComponent);
export { CalendarWeekViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFjN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUVMLGtDQUFrQyxFQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0QixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLG9CQUFvQixFQUNyQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQW1CL0Q7Ozs7Ozs7OztHQVNHO0FBbVVILElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBc1NwQzs7T0FFRztJQUNILFlBQ1ksR0FBc0IsRUFDdEIsS0FBb0IsRUFDWCxNQUFjLEVBQ3ZCLFdB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RUFJSjtBQXpMTSx5QkFBeUI7SUFsVXJDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4VFQ7S0FDRixDQUFDO0lBNlNHLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FGSCxpQkFBaUI7UUFDZixhQUFhLFVBRVAsV0FBVztHQTdTekIseUJBQXlCLENBKzVCckM7U0EvNUJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgTE9DQUxFX0lELFxyXG4gIEluamVjdCxcclxuICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtcclxuICBXZWVrRGF5LFxyXG4gIENhbGVuZGFyRXZlbnQsXHJcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudCxcclxuICBXZWVrVmlldyxcclxuICBWaWV3UGVyaW9kLFxyXG4gIFdlZWtWaWV3SG91ckNvbHVtbixcclxuICBXZWVrVmlld1RpbWVFdmVudCxcclxuICBXZWVrVmlld0hvdXJTZWdtZW50LFxyXG4gIFdlZWtWaWV3SG91cixcclxuICBXZWVrVmlld0FsbERheUV2ZW50Um93XHJcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5pbXBvcnQgeyBSZXNpemVFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXphYmxlLWVsZW1lbnQnO1xyXG5pbXBvcnQgeyBDYWxlbmRhckRyYWdIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXInO1xyXG5pbXBvcnQgeyBDYWxlbmRhclJlc2l6ZUhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1yZXNpemUtaGVscGVyLnByb3ZpZGVyJztcclxuaW1wb3J0IHtcclxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXHJcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZVxyXG59IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xyXG5pbXBvcnQge1xyXG4gIHZhbGlkYXRlRXZlbnRzLFxyXG4gIHJvdW5kVG9OZWFyZXN0LFxyXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSxcclxuICB0cmFja0J5SG91clNlZ21lbnQsXHJcbiAgdHJhY2tCeUhvdXIsXHJcbiAgZ2V0TWludXRlc01vdmVkLFxyXG4gIGdldERlZmF1bHRFdmVudEVuZCxcclxuICBnZXRNaW5pbXVtRXZlbnRIZWlnaHRJbk1pbnV0ZXMsXHJcbiAgYWRkRGF5c1dpdGhFeGNsdXNpb25zLFxyXG4gIGlzRHJhZ2dlZFdpdGhpblBlcmlvZCxcclxuICBzaG91bGRGaXJlRHJvcHBlZEV2ZW50LFxyXG4gIGdldFdlZWtWaWV3UGVyaW9kLFxyXG4gIHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQsXHJcbiAgdHJhY2tCeVdlZWtUaW1lRXZlbnRcclxufSBmcm9tICcuLi9jb21tb24vdXRpbCc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xyXG5pbXBvcnQge1xyXG4gIERyYWdFbmRFdmVudCxcclxuICBEcm9wRXZlbnQsXHJcbiAgRHJhZ01vdmVFdmVudCxcclxuICBWYWxpZGF0ZURyYWdcclxufSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xyXG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2Vla1ZpZXdBbGxEYXlFdmVudFJlc2l6ZSB7XHJcbiAgb3JpZ2luYWxPZmZzZXQ6IG51bWJlcjtcclxuICBvcmlnaW5hbFNwYW46IG51bWJlcjtcclxuICBlZGdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50IGV4dGVuZHMgV2Vla1ZpZXcge1xyXG4gIGhlYWRlcjogV2Vla0RheVtdO1xyXG59XHJcblxyXG4vKipcclxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIHdlZWsuIEV4YW1wbGUgdXNhZ2U6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogPG13bC1jYWxlbmRhci13ZWVrLXZpZXdcclxuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXHJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxyXG4gKiA8L213bC1jYWxlbmRhci13ZWVrLXZpZXc+XHJcbiAqIGBgYFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cImNhbC13ZWVrLXZpZXdcIiByb2xlPVwiZ3JpZFwiPlxyXG4gICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1oZWFkZXJcclxuICAgICAgICBbZGF5c109XCJkYXlzXCJcclxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhlYWRlclRlbXBsYXRlXCJcclxuICAgICAgICAoZGF5SGVhZGVyQ2xpY2tlZCk9XCJkYXlIZWFkZXJDbGlja2VkLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICAgKGV2ZW50RHJvcHBlZCk9XCJcclxuICAgICAgICAgIGV2ZW50RHJvcHBlZCh7IGRyb3BEYXRhOiAkZXZlbnQgfSwgJGV2ZW50Lm5ld1N0YXJ0LCB0cnVlKVxyXG4gICAgICAgIFwiXHJcbiAgICAgICAgKGRyYWdFbnRlcik9XCJkYXRlRHJhZ0VudGVyKCRldmVudC5kYXRlKVwiXHJcbiAgICAgID5cclxuICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlcj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiY2FsLWFsbC1kYXktZXZlbnRzXCJcclxuICAgICAgICAjYWxsRGF5RXZlbnRzQ29udGFpbmVyXHJcbiAgICAgICAgKm5nSWY9XCJ2aWV3LmFsbERheUV2ZW50Um93cy5sZW5ndGggPiAwXCJcclxuICAgICAgICBtd2xEcm9wcGFibGVcclxuICAgICAgICAoZHJhZ0VudGVyKT1cImRyYWdFbnRlcignYWxsRGF5JylcIlxyXG4gICAgICAgIChkcmFnTGVhdmUpPVwiZHJhZ0xlYXZlKCdhbGxEYXknKVwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1jb2x1bW5zXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLXRpbWUtbGFiZWwtY29sdW1uXCJcclxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZVwiXHJcbiAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWRheS1jb2x1bW5cIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXM7IHRyYWNrQnk6IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXHJcbiAgICAgICAgICAgIG13bERyb3BwYWJsZVxyXG4gICAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXHJcbiAgICAgICAgICAgIChkcm9wKT1cImV2ZW50RHJvcHBlZCgkZXZlbnQsIGRheS5kYXRlLCB0cnVlKVwiXHJcbiAgICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF0ZURyYWdFbnRlcihkYXkuZGF0ZSlcIlxyXG4gICAgICAgICAgPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudFJvdyBvZiB2aWV3LmFsbERheUV2ZW50Um93czsgdHJhY2tCeTogdHJhY2tCeUlkXCJcclxuICAgICAgICAgICNldmVudFJvd0NvbnRhaW5lclxyXG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRzLXJvd1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJcclxuICAgICAgICAgICAgICBsZXQgYWxsRGF5RXZlbnQgb2YgZXZlbnRSb3cucm93O1xyXG4gICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlXZWVrQWxsRGF5RXZlbnRcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgI2V2ZW50XHJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lclwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cIlxyXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiBhbGxEYXlFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICBbY2xhc3MuY2FsLXN0YXJ0cy13aXRoaW4td2Vla109XCIhYWxsRGF5RXZlbnQuc3RhcnRzQmVmb3JlV2Vla1wiXHJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4td2Vla109XCIhYWxsRGF5RXZlbnQuZW5kc0FmdGVyV2Vla1wiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImFsbERheUV2ZW50LmV2ZW50Py5jc3NDbGFzc1wiXHJcbiAgICAgICAgICAgIFtzdHlsZS53aWR0aC4lXT1cIigxMDAgLyBkYXlzLmxlbmd0aCkgKiBhbGxEYXlFdmVudC5zcGFuXCJcclxuICAgICAgICAgICAgW3N0eWxlLm1hcmdpbkxlZnQuJV09XCIoMTAwIC8gZGF5cy5sZW5ndGgpICogYWxsRGF5RXZlbnQub2Zmc2V0XCJcclxuICAgICAgICAgICAgbXdsUmVzaXphYmxlXHJcbiAgICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7IGxlZnQ6IGRheUNvbHVtbldpZHRoLCByaWdodDogZGF5Q29sdW1uV2lkdGggfVwiXHJcbiAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXHJcbiAgICAgICAgICAgIChyZXNpemVTdGFydCk9XCJcclxuICAgICAgICAgICAgICBhbGxEYXlFdmVudFJlc2l6ZVN0YXJ0ZWQoZXZlbnRSb3dDb250YWluZXIsIGFsbERheUV2ZW50LCAkZXZlbnQpXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIChyZXNpemluZyk9XCJcclxuICAgICAgICAgICAgICBhbGxEYXlFdmVudFJlc2l6aW5nKGFsbERheUV2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoKVxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAocmVzaXplRW5kKT1cImFsbERheUV2ZW50UmVzaXplRW5kZWQoYWxsRGF5RXZlbnQpXCJcclxuICAgICAgICAgICAgbXdsRHJhZ2dhYmxlXHJcbiAgICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXHJcbiAgICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiBhbGxEYXlFdmVudC5ldmVudCwgY2FsZW5kYXJJZDogY2FsZW5kYXJJZCB9XCJcclxuICAgICAgICAgICAgW2RyYWdBeGlzXT1cIntcclxuICAgICAgICAgICAgICB4OiBhbGxEYXlFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgYWxsRGF5RXZlbnRSZXNpemVzLnNpemUgPT09IDAsXHJcbiAgICAgICAgICAgICAgeTpcclxuICAgICAgICAgICAgICAgICFzbmFwRHJhZ2dlZEV2ZW50cyAmJlxyXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmXHJcbiAgICAgICAgICAgICAgICBhbGxEYXlFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxyXG4gICAgICAgICAgICB9XCJcclxuICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJzbmFwRHJhZ2dlZEV2ZW50cyA/IHsgeDogZGF5Q29sdW1uV2lkdGggfSA6IHt9XCJcclxuICAgICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxyXG4gICAgICAgICAgICAoZHJhZ1N0YXJ0KT1cImRyYWdTdGFydGVkKGV2ZW50Um93Q29udGFpbmVyLCBldmVudClcIlxyXG4gICAgICAgICAgICAoZHJhZ2dpbmcpPVwiYWxsRGF5RXZlbnREcmFnTW92ZSgpXCJcclxuICAgICAgICAgICAgKGRyYWdFbmQpPVwiZHJhZ0VuZGVkKGFsbERheUV2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoKVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWJlZm9yZS1zdGFydFwiXHJcbiAgICAgICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmJlZm9yZVN0YXJ0ICYmXHJcbiAgICAgICAgICAgICAgICAhYWxsRGF5RXZlbnQuc3RhcnRzQmVmb3JlV2Vla1xyXG4gICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgbXdsUmVzaXplSGFuZGxlXHJcbiAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cInsgbGVmdDogdHJ1ZSB9XCJcclxuICAgICAgICAgICAgPjwvZGl2PlxyXG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudFxyXG4gICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICAgICAgICBbd2Vla0V2ZW50XT1cImFsbERheUV2ZW50XCJcclxuICAgICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcclxuICAgICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXHJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxyXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcclxuICAgICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cIlxyXG4gICAgICAgICAgICAgICAgZXZlbnRDbGlja2VkLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICBldmVudDogYWxsRGF5RXZlbnQuZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUV2ZW50OiAkZXZlbnQuc291cmNlRXZlbnRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQ+XHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWFmdGVyLWVuZFwiXHJcbiAgICAgICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmFmdGVyRW5kICYmXHJcbiAgICAgICAgICAgICAgICAhYWxsRGF5RXZlbnQuZW5kc0FmdGVyV2Vla1xyXG4gICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgbXdsUmVzaXplSGFuZGxlXHJcbiAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cInsgcmlnaHQ6IHRydWUgfVwiXHJcbiAgICAgICAgICAgID48L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiY2FsLXRpbWUtZXZlbnRzXCJcclxuICAgICAgICBtd2xEcm9wcGFibGVcclxuICAgICAgICAoZHJhZ0VudGVyKT1cImRyYWdFbnRlcigndGltZScpXCJcclxuICAgICAgICAoZHJhZ0xlYXZlKT1cImRyYWdMZWF2ZSgndGltZScpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwiY2FsLXRpbWUtbGFiZWwtY29sdW1uXCJcclxuICAgICAgICAgICpuZ0lmPVwidmlldy5ob3VyQ29sdW1ucy5sZW5ndGggPiAwICYmIGRheXNJbldlZWsgIT09IDFcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgKm5nRm9yPVwiXHJcbiAgICAgICAgICAgICAgbGV0IGhvdXIgb2Ygdmlldy5ob3VyQ29sdW1uc1swXS5ob3VycztcclxuICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5SG91cjtcclxuICAgICAgICAgICAgICBsZXQgb2RkID0gb2RkXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxyXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWhvdXItb2RkXT1cIm9kZFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudFxyXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzZWdtZW50IG9mIGhvdXIuc2VnbWVudHM7IHRyYWNrQnk6IHRyYWNrQnlIb3VyU2VnbWVudFwiXHJcbiAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJob3VyU2VnbWVudEhlaWdodFwiXHJcbiAgICAgICAgICAgICAgW3NlZ21lbnRdPVwic2VnbWVudFwiXHJcbiAgICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxyXG4gICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgW2lzVGltZUxhYmVsXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzcz1cImNhbC1kYXktY29sdW1uc1wiXHJcbiAgICAgICAgICBbY2xhc3MuY2FsLXJlc2l6ZS1hY3RpdmVdPVwidGltZUV2ZW50UmVzaXplcy5zaXplID4gMFwiXHJcbiAgICAgICAgICAjZGF5Q29sdW1uc1xyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZGF5LWNvbHVtblwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2Ygdmlldy5ob3VyQ29sdW1uczsgdHJhY2tCeTogdHJhY2tCeUhvdXJDb2x1bW5cIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyXHJcbiAgICAgICAgICAgICAgW2NvbHVtbkRhdGVdPVwiY29sdW1uLmRhdGVcIlxyXG4gICAgICAgICAgICAgIFtkYXlTdGFydEhvdXJdPVwiZGF5U3RhcnRIb3VyXCJcclxuICAgICAgICAgICAgICBbZGF5U3RhcnRNaW51dGVdPVwiZGF5U3RhcnRNaW51dGVcIlxyXG4gICAgICAgICAgICAgIFtkYXlFbmRIb3VyXT1cImRheUVuZEhvdXJcIlxyXG4gICAgICAgICAgICAgIFtkYXlFbmRNaW51dGVdPVwiZGF5RW5kTWludXRlXCJcclxuICAgICAgICAgICAgICBbaG91clNlZ21lbnRzXT1cImhvdXJTZWdtZW50c1wiXHJcbiAgICAgICAgICAgICAgW2hvdXJTZWdtZW50SGVpZ2h0XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcclxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgID48L213bC1jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlcj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwiXHJcbiAgICAgICAgICAgICAgICAgIGxldCB0aW1lRXZlbnQgb2YgY29sdW1uLmV2ZW50cztcclxuICAgICAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeVdlZWtUaW1lRXZlbnRcclxuICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICAjZXZlbnRcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lclwiXHJcbiAgICAgICAgICAgICAgICBbY2xhc3MuY2FsLWRyYWdnYWJsZV09XCJcclxuICAgICAgICAgICAgICAgICAgdGltZUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiB0aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDBcclxuICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICBbY2xhc3MuY2FsLXN0YXJ0cy13aXRoaW4tZGF5XT1cIiF0aW1lRXZlbnQuc3RhcnRzQmVmb3JlRGF5XCJcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4tZGF5XT1cIiF0aW1lRXZlbnQuZW5kc0FmdGVyRGF5XCJcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInRpbWVFdmVudC5ldmVudC5jc3NDbGFzc1wiXHJcbiAgICAgICAgICAgICAgICBbaGlkZGVuXT1cInRpbWVFdmVudC5oZWlnaHQgPT09IDAgJiYgdGltZUV2ZW50LndpZHRoID09PSAwXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS50b3AucHhdPVwidGltZUV2ZW50LnRvcFwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInRpbWVFdmVudC5oZWlnaHRcIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmxlZnQuJV09XCJ0aW1lRXZlbnQubGVmdFwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGguJV09XCJ0aW1lRXZlbnQud2lkdGhcIlxyXG4gICAgICAgICAgICAgICAgbXdsUmVzaXphYmxlXHJcbiAgICAgICAgICAgICAgICBbcmVzaXplU25hcEdyaWRdPVwie1xyXG4gICAgICAgICAgICAgICAgICBsZWZ0OiBkYXlDb2x1bW5XaWR0aCxcclxuICAgICAgICAgICAgICAgICAgcmlnaHQ6IGRheUNvbHVtbldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICB0b3A6IGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgIGJvdHRvbTogZXZlbnRTbmFwU2l6ZSB8fCBob3VyU2VnbWVudEhlaWdodFxyXG4gICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgICAgICBbdmFsaWRhdGVSZXNpemVdPVwidmFsaWRhdGVSZXNpemVcIlxyXG4gICAgICAgICAgICAgICAgW2FsbG93TmVnYXRpdmVSZXNpemVzXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgKHJlc2l6ZVN0YXJ0KT1cIlxyXG4gICAgICAgICAgICAgICAgICB0aW1lRXZlbnRSZXNpemVTdGFydGVkKGRheUNvbHVtbnMsIHRpbWVFdmVudCwgJGV2ZW50KVxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgIChyZXNpemluZyk9XCJ0aW1lRXZlbnRSZXNpemluZyh0aW1lRXZlbnQsICRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgKHJlc2l6ZUVuZCk9XCJ0aW1lRXZlbnRSZXNpemVFbmRlZCh0aW1lRXZlbnQpXCJcclxuICAgICAgICAgICAgICAgIG13bERyYWdnYWJsZVxyXG4gICAgICAgICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiB0aW1lRXZlbnQuZXZlbnQsIGNhbGVuZGFySWQ6IGNhbGVuZGFySWQgfVwiXHJcbiAgICAgICAgICAgICAgICBbZHJhZ0F4aXNdPVwie1xyXG4gICAgICAgICAgICAgICAgICB4OiB0aW1lRXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCxcclxuICAgICAgICAgICAgICAgICAgeTogdGltZUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiB0aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDBcclxuICAgICAgICAgICAgICAgIH1cIlxyXG4gICAgICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJcclxuICAgICAgICAgICAgICAgICAgc25hcERyYWdnZWRFdmVudHNcclxuICAgICAgICAgICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogZGF5Q29sdW1uV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGV2ZW50U25hcFNpemUgfHwgaG91clNlZ21lbnRIZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA6IHt9XHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgW2dob3N0RHJhZ0VuYWJsZWRdPVwiIXNuYXBEcmFnZ2VkRXZlbnRzXCJcclxuICAgICAgICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcclxuICAgICAgICAgICAgICAgIChkcmFnU3RhcnQpPVwiZHJhZ1N0YXJ0ZWQoZGF5Q29sdW1ucywgZXZlbnQsIHRpbWVFdmVudClcIlxyXG4gICAgICAgICAgICAgICAgKGRyYWdnaW5nKT1cImRyYWdNb3ZlKHRpbWVFdmVudCwgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAoZHJhZ0VuZCk9XCJkcmFnRW5kZWQodGltZUV2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoLCB0cnVlKVwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWJlZm9yZS1zdGFydFwiXHJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmJlZm9yZVN0YXJ0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIXRpbWVFdmVudC5zdGFydHNCZWZvcmVEYXlcclxuICAgICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgICAgbXdsUmVzaXplSGFuZGxlXHJcbiAgICAgICAgICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRydWVcclxuICAgICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudFxyXG4gICAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgICAgICAgICAgICAgIFt3ZWVrRXZlbnRdPVwidGltZUV2ZW50XCJcclxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXHJcbiAgICAgICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXHJcbiAgICAgICAgICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwiZHJhZ0FjdGl2ZSB8fCB0aW1lRXZlbnRSZXNpemVzLnNpemUgPiAwXCJcclxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxyXG4gICAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxyXG4gICAgICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcclxuICAgICAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJcclxuICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICBldmVudDogdGltZUV2ZW50LmV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudC5zb3VyY2VFdmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQ+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYWZ0ZXItZW5kXCJcclxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgICAgICAgICB0aW1lRXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYWZ0ZXJFbmQgJiZcclxuICAgICAgICAgICAgICAgICAgICAhdGltZUV2ZW50LmVuZHNBZnRlckRheVxyXG4gICAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcclxuICAgICAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cIntcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBib3R0b206IHRydWVcclxuICAgICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICpuZ0Zvcj1cIlxyXG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgb2YgY29sdW1uLmhvdXJzO1xyXG4gICAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeUhvdXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2RkID0gb2RkXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1ob3VyXCJcclxuICAgICAgICAgICAgICBbY2xhc3MuY2FsLWhvdXItb2RkXT1cIm9kZFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnRcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cIlxyXG4gICAgICAgICAgICAgICAgICBsZXQgc2VnbWVudCBvZiBob3VyLnNlZ21lbnRzO1xyXG4gICAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5SG91clNlZ21lbnRcclxuICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcclxuICAgICAgICAgICAgICAgIFtzZWdtZW50XT1cInNlZ21lbnRcIlxyXG4gICAgICAgICAgICAgICAgW3NlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxyXG4gICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhvdXJTZWdtZW50VGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXHJcbiAgICAgICAgICAgICAgICAobXdsQ2xpY2spPVwiXHJcbiAgICAgICAgICAgICAgICAgIGhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBzZWdtZW50LmRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgIFtjbGlja0xpc3RlbmVyRGlzYWJsZWRdPVwiXHJcbiAgICAgICAgICAgICAgICAgIGhvdXJTZWdtZW50Q2xpY2tlZC5vYnNlcnZlcnMubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgbXdsRHJvcHBhYmxlXHJcbiAgICAgICAgICAgICAgICBbZHJhZ092ZXJDbGFzc109XCJcclxuICAgICAgICAgICAgICAgICAgIWRyYWdBY3RpdmUgfHwgIXNuYXBEcmFnZ2VkRXZlbnRzID8gJ2NhbC1kcmFnLW92ZXInIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAoZHJvcCk9XCJldmVudERyb3BwZWQoJGV2ZW50LCBzZWdtZW50LmRhdGUsIGZhbHNlKVwiXHJcbiAgICAgICAgICAgICAgICAoZHJhZ0VudGVyKT1cImRhdGVEcmFnRW50ZXIoc2VnbWVudC5kYXRlKVwiXHJcbiAgICAgICAgICAgICAgICBbaXNUaW1lTGFiZWxdPVwiZGF5c0luV2VlayA9PT0gMVwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XHJcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IHdpbGwgYmUgaGlkZGVuIG9uIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgZXhjbHVkZURheXM6IG51bWJlcltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCB3aGVuIGVtaXR0ZWQgb24gd2lsbCByZS1yZW5kZXIgdGhlIGN1cnJlbnQgdmlld1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYXV0byc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGV2ZW50IHRvb2x0aXBzXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgbm90IHByb3ZpZGVkIHRoZSB0b29sdGlwXHJcbiAgICogd2lsbCBiZSBkaXNwbGF5ZWQgaW1tZWRpYXRlbHkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vlay5cclxuICAgKiBUaGlzIGlzIGlnbm9yZWQgd2hlbiB0aGUgYGRheXNJbldlZWtgIGlucHV0IGlzIGFsc28gc2V0IGFzIHRoZSBgdmlld0RhdGVgIHdpbGwgYmUgdXNlZCBhcyB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgaW5zdGVhZC5cclxuICAgKiBOb3RlLCB5b3Ugc2hvdWxkIGFsc28gcGFzcyB0aGlzIHRvIHRoZSBjYWxlbmRhciB0aXRsZSBwaXBlIHNvIGl0IHNob3dzIHRoZSBzYW1lIGRheXM6IHt7IHZpZXdEYXRlIHwgY2FsZW5kYXJEYXRlOih2aWV3ICsgJ1ZpZXdUaXRsZScpOmxvY2FsZTp3ZWVrU3RhcnRzT24gfX1cclxuICAgKi9cclxuICBASW5wdXQoKSB3ZWVrU3RhcnRzT246IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhlYWRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHdlZWsgdmlldyBldmVudHNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCBhY3Rpb25zXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwcmVjaXNpb24gdG8gZGlzcGxheSBldmVudHMuXHJcbiAgICogYGRheXNgIHdpbGwgcm91bmQgZXZlbnQgc3RhcnQgYW5kIGVuZCBkYXRlcyB0byB0aGUgbmVhcmVzdCBkYXkgYW5kIGBtaW51dGVzYCB3aWxsIG5vdCBkbyB0aGlzIHJvdW5kaW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHJlY2lzaW9uOiAnZGF5cycgfCAnbWludXRlcycgPSAnZGF5cyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCBpbmRpY2F0ZSB3aGljaCBkYXlzIGFyZSB3ZWVrZW5kc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdlZWtlbmREYXlzOiBudW1iZXJbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBzbmFwIGV2ZW50cyB0byBhIGdyaWQgd2hlbiBkcmFnZ2luZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNuYXBEcmFnZ2VkRXZlbnRzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiBzZWdtZW50cyBpbiBhbiBob3VyLiBNdXN0IGJlIDw9IDZcclxuICAgKi9cclxuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlciA9IDI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWlnaHQgaW4gcGl4ZWxzIG9mIGVhY2ggaG91ciBzZWdtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlciA9IDMwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IHN0YXJ0IGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheVN0YXJ0TWludXRlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IGVuZCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlciA9IDIzO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IGVuZCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgaG91clNlZ21lbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdyaWQgc2l6ZSB0byBzbmFwIHJlc2l6aW5nIGFuZCBkcmFnZ2luZyBvZiBob3VybHkgZXZlbnRzIHRvXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRTbmFwU2l6ZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBhbGwgZGF5IGV2ZW50cyBsYWJlbCB0ZXh0XHJcbiAgICovXHJcbiAgQElucHV0KCkgYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiBkYXlzIGluIGEgd2Vlay4gQ2FuIGJlIHVzZWQgdG8gY3JlYXRlIGEgc2hvcnRlciBvciBsb25nZXIgd2VlayB2aWV3LlxyXG4gICAqIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgd2lsbCBhbHdheXMgYmUgdGhlIGB2aWV3RGF0ZWAgYW5kIGB3ZWVrU3RhcnRzT25gIGlmIHNldCB3aWxsIGJlIGlnbm9yZWRcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXlzSW5XZWVrOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGN1cnJlbnQgdGltZSBtYXJrZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhIGhlYWRlciB3ZWVrIGRheSBpcyBjbGlja2VkLiBBZGRpbmcgYSBgY3NzQ2xhc3NgIHByb3BlcnR5IG9uIGAkZXZlbnQuZGF5YCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBoZWFkZXIgZWxlbWVudFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGRheUhlYWRlckNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGRheTogV2Vla0RheTtcclxuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50O1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcclxuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyByZXNpemVkIG9yIGRyYWdnZWQgYW5kIGRyb3BwZWRcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBldmVudFRpbWVzQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBvdXRwdXQgdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgdGhlIHZpZXcgaXMgcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IHdlZWsuXHJcbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhIGRheSBpbiB0aGUgaGVhZGVyIGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGNlbGwgZWxlbWVudCBpbiB0aGUgdGVtcGxhdGVcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBiZWZvcmVWaWV3UmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIGFuIGhvdXIgc2VnbWVudCBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgaG91clNlZ21lbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBkYXRlOiBEYXRlO1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGRheXM6IFdlZWtEYXlbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHZpZXc6IFdlZWtWaWV3O1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgYWxsRGF5RXZlbnRSZXNpemVzOiBNYXA8XHJcbiAgICBXZWVrVmlld0FsbERheUV2ZW50LFxyXG4gICAgV2Vla1ZpZXdBbGxEYXlFdmVudFJlc2l6ZVxyXG4gID4gPSBuZXcgTWFwKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB0aW1lRXZlbnRSZXNpemVzOiBNYXA8Q2FsZW5kYXJFdmVudCwgUmVzaXplRXZlbnQ+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZXZlbnREcmFnRW50ZXJCeVR5cGUgPSB7XHJcbiAgICBhbGxEYXk6IDAsXHJcbiAgICB0aW1lOiAwXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGRyYWdBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGRyYWdBbHJlYWR5TW92ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHZhbGlkYXRlRHJhZzogVmFsaWRhdGVEcmFnO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVSZXNpemU6IChhcmdzOiBhbnkpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBkYXlDb2x1bW5XaWR0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgY2FsZW5kYXJJZCA9IFN5bWJvbCgnYW5ndWxhciBjYWxlbmRhciB3ZWVrIHZpZXcgaWQnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRyYWNrQnlIb3VyU2VnbWVudCA9IHRyYWNrQnlIb3VyU2VnbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRyYWNrQnlIb3VyID0gdHJhY2tCeUhvdXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB0cmFja0J5V2Vla0FsbERheUV2ZW50ID0gdHJhY2tCeVdlZWtBbGxEYXlFdmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50ID0gdHJhY2tCeVdlZWtUaW1lRXZlbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBwcml2YXRlIGxhc3REcmFnRW50ZXJEYXRlOiBEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeUhvdXJDb2x1bW4gPSAoaW5kZXg6IG51bWJlciwgY29sdW1uOiBXZWVrVmlld0hvdXJDb2x1bW4pID0+XHJcbiAgICBjb2x1bW4uaG91cnNbMF0gPyBjb2x1bW4uaG91cnNbMF0uc2VnbWVudHNbMF0uZGF0ZS50b0lTT1N0cmluZygpIDogY29sdW1uO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIHJvdzogV2Vla1ZpZXdBbGxEYXlFdmVudFJvdykgPT4gcm93LmlkO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByb3RlY3RlZCB1dGlsczogQ2FsZW5kYXJVdGlscyxcclxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZyxcclxuICAgIHByb3RlY3RlZCBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXJcclxuICApIHtcclxuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcclxuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCByZWZyZXNoSGVhZGVyID1cclxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxyXG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XHJcbiAgICAgIGNoYW5nZXMud2Vla2VuZERheXMgfHxcclxuICAgICAgY2hhbmdlcy5kYXlzSW5XZWVrIHx8XHJcbiAgICAgIGNoYW5nZXMud2Vla1N0YXJ0c09uO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2hCb2R5ID1cclxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxyXG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fFxyXG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0TWludXRlIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5RW5kSG91ciB8fFxyXG4gICAgICBjaGFuZ2VzLmRheUVuZE1pbnV0ZSB8fFxyXG4gICAgICBjaGFuZ2VzLmhvdXJTZWdtZW50cyB8fFxyXG4gICAgICBjaGFuZ2VzLndlZWtTdGFydHNPbiB8fFxyXG4gICAgICBjaGFuZ2VzLndlZWtlbmREYXlzIHx8XHJcbiAgICAgIGNoYW5nZXMuZXhjbHVkZURheXMgfHxcclxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudEhlaWdodCB8fFxyXG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxyXG4gICAgICBjaGFuZ2VzLmRheXNJbldlZWs7XHJcblxyXG4gICAgaWYgKHJlZnJlc2hIZWFkZXIpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzKSB7XHJcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVmcmVzaEJvZHkpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZWZyZXNoSGVhZGVyIHx8IHJlZnJlc2hCb2R5KSB7XHJcbiAgICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVzaXplU3RhcnRlZChldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LCBtaW5XaWR0aD86IG51bWJlcikge1xyXG4gICAgdGhpcy5kYXlDb2x1bW5XaWR0aCA9IHRoaXMuZ2V0RGF5Q29sdW1uV2lkdGgoZXZlbnRzQ29udGFpbmVyKTtcclxuICAgIGNvbnN0IHJlc2l6ZUhlbHBlcjogQ2FsZW5kYXJSZXNpemVIZWxwZXIgPSBuZXcgQ2FsZW5kYXJSZXNpemVIZWxwZXIoXHJcbiAgICAgIGV2ZW50c0NvbnRhaW5lcixcclxuICAgICAgbWluV2lkdGhcclxuICAgICk7XHJcbiAgICB0aGlzLnZhbGlkYXRlUmVzaXplID0gKHsgcmVjdGFuZ2xlIH0pID0+XHJcbiAgICAgIHJlc2l6ZUhlbHBlci52YWxpZGF0ZVJlc2l6ZSh7IHJlY3RhbmdsZSB9KTtcclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRpbWVFdmVudFJlc2l6ZVN0YXJ0ZWQoXHJcbiAgICBldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LFxyXG4gICAgdGltZUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCxcclxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudFxyXG4gICk6IHZvaWQge1xyXG4gICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLnNldCh0aW1lRXZlbnQuZXZlbnQsIHJlc2l6ZUV2ZW50KTtcclxuICAgIHRoaXMucmVzaXplU3RhcnRlZChldmVudHNDb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRpbWVFdmVudFJlc2l6aW5nKHRpbWVFdmVudDogV2Vla1ZpZXdUaW1lRXZlbnQsIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCkge1xyXG4gICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLnNldCh0aW1lRXZlbnQuZXZlbnQsIHJlc2l6ZUV2ZW50KTtcclxuICAgIGNvbnN0IGFkanVzdGVkRXZlbnRzID0gbmV3IE1hcDxDYWxlbmRhckV2ZW50LCBDYWxlbmRhckV2ZW50PigpO1xyXG5cclxuICAgIGNvbnN0IHRlbXBFdmVudHMgPSBbLi4udGhpcy5ldmVudHNdO1xyXG5cclxuICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5mb3JFYWNoKChsYXN0UmVzaXplRXZlbnQsIGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld0V2ZW50RGF0ZXMgPSB0aGlzLmdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcclxuICAgICAgICBldmVudCxcclxuICAgICAgICBsYXN0UmVzaXplRXZlbnRcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgYWRqdXN0ZWRFdmVudCA9IHsgLi4uZXZlbnQsIC4uLm5ld0V2ZW50RGF0ZXMgfTtcclxuICAgICAgYWRqdXN0ZWRFdmVudHMuc2V0KGFkanVzdGVkRXZlbnQsIGV2ZW50KTtcclxuICAgICAgY29uc3QgZXZlbnRJbmRleCA9IHRlbXBFdmVudHMuaW5kZXhPZihldmVudCk7XHJcbiAgICAgIHRlbXBFdmVudHNbZXZlbnRJbmRleF0gPSBhZGp1c3RlZEV2ZW50O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZXN0b3JlT3JpZ2luYWxFdmVudHModGVtcEV2ZW50cywgYWRqdXN0ZWRFdmVudHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRpbWVFdmVudFJlc2l6ZUVuZGVkKHRpbWVFdmVudDogV2Vla1ZpZXdUaW1lRXZlbnQpIHtcclxuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0V2Vla1ZpZXcodGhpcy5ldmVudHMpO1xyXG4gICAgY29uc3QgbGFzdFJlc2l6ZUV2ZW50ID0gdGhpcy50aW1lRXZlbnRSZXNpemVzLmdldCh0aW1lRXZlbnQuZXZlbnQpO1xyXG4gICAgaWYgKGxhc3RSZXNpemVFdmVudCkge1xyXG4gICAgICB0aGlzLnRpbWVFdmVudFJlc2l6ZXMuZGVsZXRlKHRpbWVFdmVudC5ldmVudCk7XHJcbiAgICAgIGNvbnN0IG5ld0V2ZW50RGF0ZXMgPSB0aGlzLmdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcclxuICAgICAgICB0aW1lRXZlbnQuZXZlbnQsXHJcbiAgICAgICAgbGFzdFJlc2l6ZUV2ZW50XHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgbmV3U3RhcnQ6IG5ld0V2ZW50RGF0ZXMuc3RhcnQsXHJcbiAgICAgICAgbmV3RW5kOiBuZXdFdmVudERhdGVzLmVuZCxcclxuICAgICAgICBldmVudDogdGltZUV2ZW50LmV2ZW50LFxyXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuUmVzaXplXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGFsbERheUV2ZW50UmVzaXplU3RhcnRlZChcclxuICAgIGFsbERheUV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsXHJcbiAgICBhbGxEYXlFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCxcclxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudFxyXG4gICk6IHZvaWQge1xyXG4gICAgdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuc2V0KGFsbERheUV2ZW50LCB7XHJcbiAgICAgIG9yaWdpbmFsT2Zmc2V0OiBhbGxEYXlFdmVudC5vZmZzZXQsXHJcbiAgICAgIG9yaWdpbmFsU3BhbjogYWxsRGF5RXZlbnQuc3BhbixcclxuICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgIT09ICd1bmRlZmluZWQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlc2l6ZVN0YXJ0ZWQoXHJcbiAgICAgIGFsbERheUV2ZW50c0NvbnRhaW5lcixcclxuICAgICAgdGhpcy5nZXREYXlDb2x1bW5XaWR0aChhbGxEYXlFdmVudHNDb250YWluZXIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGFsbERheUV2ZW50UmVzaXppbmcoXHJcbiAgICBhbGxEYXlFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCxcclxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCxcclxuICAgIGRheVdpZHRoOiBudW1iZXJcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0IGN1cnJlbnRSZXNpemU6IFdlZWtWaWV3QWxsRGF5RXZlbnRSZXNpemUgPSB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5nZXQoXHJcbiAgICAgIGFsbERheUV2ZW50XHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5yb3VuZCgrcmVzaXplRXZlbnQuZWRnZXMubGVmdCAvIGRheVdpZHRoKTtcclxuICAgICAgYWxsRGF5RXZlbnQub2Zmc2V0ID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbE9mZnNldCArIGRpZmY7XHJcbiAgICAgIGFsbERheUV2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiAtIGRpZmY7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5yaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5yb3VuZCgrcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgLyBkYXlXaWR0aCk7XHJcbiAgICAgIGFsbERheUV2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiArIGRpZmY7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgYWxsRGF5RXZlbnRSZXNpemVFbmRlZChhbGxEYXlFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogV2Vla1ZpZXdBbGxEYXlFdmVudFJlc2l6ZSA9IHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLmdldChcclxuICAgICAgYWxsRGF5RXZlbnRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRSZXNpemUpIHtcclxuICAgICAgY29uc3QgYWxsRGF5RXZlbnRSZXNpemluZ0JlZm9yZVN0YXJ0ID0gY3VycmVudFJlc2l6ZS5lZGdlID09PSAnbGVmdCc7XHJcbiAgICAgIGxldCBkYXlzRGlmZjogbnVtYmVyO1xyXG4gICAgICBpZiAoYWxsRGF5RXZlbnRSZXNpemluZ0JlZm9yZVN0YXJ0KSB7XHJcbiAgICAgICAgZGF5c0RpZmYgPSBhbGxEYXlFdmVudC5vZmZzZXQgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRheXNEaWZmID0gYWxsRGF5RXZlbnQuc3BhbiAtIGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbGxEYXlFdmVudC5vZmZzZXQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xyXG4gICAgICBhbGxEYXlFdmVudC5zcGFuID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XHJcblxyXG4gICAgICBsZXQgbmV3U3RhcnQ6IERhdGUgPSBhbGxEYXlFdmVudC5ldmVudC5zdGFydDtcclxuICAgICAgbGV0IG5ld0VuZDogRGF0ZSA9IGFsbERheUV2ZW50LmV2ZW50LmVuZCB8fCBhbGxEYXlFdmVudC5ldmVudC5zdGFydDtcclxuICAgICAgaWYgKGFsbERheUV2ZW50UmVzaXppbmdCZWZvcmVTdGFydCkge1xyXG4gICAgICAgIG5ld1N0YXJ0ID0gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxyXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICAgIG5ld1N0YXJ0LFxyXG4gICAgICAgICAgZGF5c0RpZmYsXHJcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdFbmQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxyXG4gICAgICAgICAgbmV3RW5kLFxyXG4gICAgICAgICAgZGF5c0RpZmYsXHJcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICBuZXdTdGFydCxcclxuICAgICAgICBuZXdFbmQsXHJcbiAgICAgICAgZXZlbnQ6IGFsbERheUV2ZW50LmV2ZW50LFxyXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuUmVzaXplXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5kZWxldGUoYWxsRGF5RXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGdldERheUNvbHVtbldpZHRoKGV2ZW50Um93Q29udGFpbmVyOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihldmVudFJvd0NvbnRhaW5lci5vZmZzZXRXaWR0aCAvIHRoaXMuZGF5cy5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGRhdGVEcmFnRW50ZXIoZGF0ZTogRGF0ZSkge1xyXG4gICAgdGhpcy5sYXN0RHJhZ0VudGVyRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZXZlbnREcm9wcGVkKFxyXG4gICAgZHJvcEV2ZW50OiBEcm9wRXZlbnQ8eyBldmVudD86IENhbGVuZGFyRXZlbnQ7IGNhbGVuZGFySWQ/OiBzeW1ib2wgfT4sXHJcbiAgICBkYXRlOiBEYXRlLFxyXG4gICAgYWxsRGF5OiBib29sZWFuXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHNob3VsZEZpcmVEcm9wcGVkRXZlbnQoZHJvcEV2ZW50LCBkYXRlLCBhbGxEYXksIHRoaXMuY2FsZW5kYXJJZCkgJiZcclxuICAgICAgdGhpcy5sYXN0RHJhZ0VudGVyRGF0ZS5nZXRUaW1lKCkgPT09IGRhdGUuZ2V0VGltZSgpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICB0eXBlOiBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlLkRyb3AsXHJcbiAgICAgICAgZXZlbnQ6IGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCxcclxuICAgICAgICBuZXdTdGFydDogZGF0ZSxcclxuICAgICAgICBhbGxEYXlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZHJhZ0VudGVyKHR5cGU6ICdhbGxEYXknIHwgJ3RpbWUnKSB7XHJcbiAgICB0aGlzLmV2ZW50RHJhZ0VudGVyQnlUeXBlW3R5cGVdKys7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZHJhZ0xlYXZlKHR5cGU6ICdhbGxEYXknIHwgJ3RpbWUnKSB7XHJcbiAgICB0aGlzLmV2ZW50RHJhZ0VudGVyQnlUeXBlW3R5cGVdLS07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZHJhZ1N0YXJ0ZWQoXHJcbiAgICBldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEhUTUxFbGVtZW50LFxyXG4gICAgZGF5RXZlbnQ/OiBXZWVrVmlld1RpbWVFdmVudFxyXG4gICk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXlDb2x1bW5XaWR0aCA9IHRoaXMuZ2V0RGF5Q29sdW1uV2lkdGgoZXZlbnRzQ29udGFpbmVyKTtcclxuICAgIGNvbnN0IGRyYWdIZWxwZXI6IENhbGVuZGFyRHJhZ0hlbHBlciA9IG5ldyBDYWxlbmRhckRyYWdIZWxwZXIoXHJcbiAgICAgIGV2ZW50c0NvbnRhaW5lcixcclxuICAgICAgZXZlbnRcclxuICAgICk7XHJcbiAgICB0aGlzLnZhbGlkYXRlRHJhZyA9ICh7IHgsIHksIHRyYW5zZm9ybSB9KSA9PlxyXG4gICAgICB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5zaXplID09PSAwICYmXHJcbiAgICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5zaXplID09PSAwICYmXHJcbiAgICAgIGRyYWdIZWxwZXIudmFsaWRhdGVEcmFnKHtcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgc25hcERyYWdnZWRFdmVudHM6IHRoaXMuc25hcERyYWdnZWRFdmVudHMsXHJcbiAgICAgICAgZHJhZ0FscmVhZHlNb3ZlZDogdGhpcy5kcmFnQWxyZWFkeU1vdmVkLFxyXG4gICAgICAgIHRyYW5zZm9ybVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMuZHJhZ0FjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLmRyYWdBbHJlYWR5TW92ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGUgPSB7XHJcbiAgICAgIGFsbERheTogMCxcclxuICAgICAgdGltZTogMFxyXG4gICAgfTtcclxuICAgIGlmICghdGhpcy5zbmFwRHJhZ2dlZEV2ZW50cyAmJiBkYXlFdmVudCkge1xyXG4gICAgICB0aGlzLnZpZXcuaG91ckNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZEV2ZW50ID0gY29sdW1uLmV2ZW50cy5maW5kKFxyXG4gICAgICAgICAgY29sdW1uRXZlbnQgPT5cclxuICAgICAgICAgICAgY29sdW1uRXZlbnQuZXZlbnQgPT09IGRheUV2ZW50LmV2ZW50ICYmIGNvbHVtbkV2ZW50ICE9PSBkYXlFdmVudFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gaGlkZSBhbnkgbGlua2VkIGV2ZW50cyB3aGlsZSBkcmFnZ2luZ1xyXG4gICAgICAgIGlmIChsaW5rZWRFdmVudCkge1xyXG4gICAgICAgICAgbGlua2VkRXZlbnQud2lkdGggPSAwO1xyXG4gICAgICAgICAgbGlua2VkRXZlbnQuaGVpZ2h0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZHJhZ01vdmUoZGF5RXZlbnQ6IFdlZWtWaWV3VGltZUV2ZW50LCBkcmFnRXZlbnQ6IERyYWdNb3ZlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnNuYXBEcmFnZ2VkRXZlbnRzKSB7XHJcbiAgICAgIGNvbnN0IG5ld0V2ZW50VGltZXMgPSB0aGlzLmdldERyYWdNb3ZlZEV2ZW50VGltZXMoXHJcbiAgICAgICAgZGF5RXZlbnQsXHJcbiAgICAgICAgZHJhZ0V2ZW50LFxyXG4gICAgICAgIHRoaXMuZGF5Q29sdW1uV2lkdGgsXHJcbiAgICAgICAgdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gZGF5RXZlbnQuZXZlbnQ7XHJcbiAgICAgIGNvbnN0IGFkanVzdGVkRXZlbnQgPSB7IC4uLm9yaWdpbmFsRXZlbnQsIC4uLm5ld0V2ZW50VGltZXMgfTtcclxuICAgICAgY29uc3QgdGVtcEV2ZW50cyA9IHRoaXMuZXZlbnRzLm1hcChldmVudCA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSBvcmlnaW5hbEV2ZW50KSB7XHJcbiAgICAgICAgICByZXR1cm4gYWRqdXN0ZWRFdmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5yZXN0b3JlT3JpZ2luYWxFdmVudHMoXHJcbiAgICAgICAgdGVtcEV2ZW50cyxcclxuICAgICAgICBuZXcgTWFwKFtbYWRqdXN0ZWRFdmVudCwgb3JpZ2luYWxFdmVudF1dKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kcmFnQWxyZWFkeU1vdmVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBhbGxEYXlFdmVudERyYWdNb3ZlKCkge1xyXG4gICAgdGhpcy5kcmFnQWxyZWFkeU1vdmVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBkcmFnRW5kZWQoXHJcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudCxcclxuICAgIGRyYWdFbmRFdmVudDogRHJhZ0VuZEV2ZW50LFxyXG4gICAgZGF5V2lkdGg6IG51bWJlcixcclxuICAgIHVzZVkgPSBmYWxzZVxyXG4gICk6IHZvaWQge1xyXG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0aGlzLmV2ZW50cyk7XHJcbiAgICB0aGlzLmRyYWdBY3RpdmUgPSBmYWxzZTtcclxuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcy5nZXREcmFnTW92ZWRFdmVudFRpbWVzKFxyXG4gICAgICB3ZWVrRXZlbnQsXHJcbiAgICAgIGRyYWdFbmRFdmVudCxcclxuICAgICAgZGF5V2lkdGgsXHJcbiAgICAgIHVzZVlcclxuICAgICk7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGVbdXNlWSA/ICd0aW1lJyA6ICdhbGxEYXknXSA+IDAgJiZcclxuICAgICAgaXNEcmFnZ2VkV2l0aGluUGVyaW9kKHN0YXJ0LCBlbmQsIHRoaXMudmlldy5wZXJpb2QpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICBuZXdTdGFydDogc3RhcnQsXHJcbiAgICAgICAgbmV3RW5kOiBlbmQsXHJcbiAgICAgICAgZXZlbnQ6IHdlZWtFdmVudC5ldmVudCxcclxuICAgICAgICB0eXBlOiBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlLkRyYWcsXHJcbiAgICAgICAgYWxsRGF5OiAhdXNlWVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXlzID0gdGhpcy51dGlscy5nZXRXZWVrVmlld0hlYWRlcih7XHJcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxyXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcclxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXMsXHJcbiAgICAgIC4uLmdldFdlZWtWaWV3UGVyaW9kKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgdGhpcy52aWV3RGF0ZSxcclxuICAgICAgICB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzLFxyXG4gICAgICAgIHRoaXMuZGF5c0luV2Vla1xyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZWZyZXNoQm9keSgpOiB2b2lkIHtcclxuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0V2Vla1ZpZXcodGhpcy5ldmVudHMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlZnJlc2hBbGwoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcclxuICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcclxuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBlbWl0QmVmb3JlVmlld1JlbmRlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRheXMgJiYgdGhpcy52aWV3KSB7XHJcbiAgICAgIHRoaXMuYmVmb3JlVmlld1JlbmRlci5lbWl0KHtcclxuICAgICAgICBoZWFkZXI6IHRoaXMuZGF5cyxcclxuICAgICAgICAuLi50aGlzLnZpZXdcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0V2Vla1ZpZXcoZXZlbnRzOiBDYWxlbmRhckV2ZW50W10pIHtcclxuICAgIHJldHVybiB0aGlzLnV0aWxzLmdldFdlZWtWaWV3KHtcclxuICAgICAgZXZlbnRzLFxyXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcclxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICAgIHByZWNpc2lvbjogdGhpcy5wcmVjaXNpb24sXHJcbiAgICAgIGFic29sdXRlUG9zaXRpb25lZEV2ZW50czogdHJ1ZSxcclxuICAgICAgaG91clNlZ21lbnRzOiB0aGlzLmhvdXJTZWdtZW50cyxcclxuICAgICAgZGF5U3RhcnQ6IHtcclxuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcclxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGVcclxuICAgICAgfSxcclxuICAgICAgZGF5RW5kOiB7XHJcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxyXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlFbmRNaW51dGVcclxuICAgICAgfSxcclxuICAgICAgc2VnbWVudEhlaWdodDogdGhpcy5ob3VyU2VnbWVudEhlaWdodCxcclxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXMsXHJcbiAgICAgIC4uLmdldFdlZWtWaWV3UGVyaW9kKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgdGhpcy52aWV3RGF0ZSxcclxuICAgICAgICB0aGlzLndlZWtTdGFydHNPbixcclxuICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzLFxyXG4gICAgICAgIHRoaXMuZGF5c0luV2Vla1xyXG4gICAgICApXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXREcmFnTW92ZWRFdmVudFRpbWVzKFxyXG4gICAgd2Vla0V2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50IHwgV2Vla1ZpZXdUaW1lRXZlbnQsXHJcbiAgICBkcmFnRW5kRXZlbnQ6IERyYWdFbmRFdmVudCB8IERyYWdNb3ZlRXZlbnQsXHJcbiAgICBkYXlXaWR0aDogbnVtYmVyLFxyXG4gICAgdXNlWTogYm9vbGVhblxyXG4gICkge1xyXG4gICAgY29uc3QgZGF5c0RyYWdnZWQgPSByb3VuZFRvTmVhcmVzdChkcmFnRW5kRXZlbnQueCwgZGF5V2lkdGgpIC8gZGF5V2lkdGg7XHJcbiAgICBjb25zdCBtaW51dGVzTW92ZWQgPSB1c2VZXHJcbiAgICAgID8gZ2V0TWludXRlc01vdmVkKFxyXG4gICAgICAgICAgZHJhZ0VuZEV2ZW50LnksXHJcbiAgICAgICAgICB0aGlzLmhvdXJTZWdtZW50cyxcclxuICAgICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXHJcbiAgICAgICAgICB0aGlzLmV2ZW50U25hcFNpemVcclxuICAgICAgICApXHJcbiAgICAgIDogMDtcclxuXHJcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcclxuICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgd2Vla0V2ZW50LmV2ZW50LnN0YXJ0LFxyXG4gICAgICAgIGRheXNEcmFnZ2VkLFxyXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXNcclxuICAgICAgKSxcclxuICAgICAgbWludXRlc01vdmVkXHJcbiAgICApO1xyXG4gICAgbGV0IGVuZDogRGF0ZTtcclxuICAgIGlmICh3ZWVrRXZlbnQuZXZlbnQuZW5kKSB7XHJcbiAgICAgIGVuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcclxuICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxyXG4gICAgICAgICAgd2Vla0V2ZW50LmV2ZW50LmVuZCxcclxuICAgICAgICAgIGRheXNEcmFnZ2VkLFxyXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xyXG4gICAgICAgICksXHJcbiAgICAgICAgbWludXRlc01vdmVkXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgc3RhcnQsIGVuZCB9O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlc3RvcmVPcmlnaW5hbEV2ZW50cyhcclxuICAgIHRlbXBFdmVudHM6IENhbGVuZGFyRXZlbnRbXSxcclxuICAgIGFkanVzdGVkRXZlbnRzOiBNYXA8Q2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJFdmVudD5cclxuICApIHtcclxuICAgIGNvbnN0IHByZXZpb3VzVmlldyA9IHRoaXMudmlldztcclxuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0V2Vla1ZpZXcodGVtcEV2ZW50cyk7XHJcbiAgICBjb25zdCBhZGp1c3RlZEV2ZW50c0FycmF5ID0gdGVtcEV2ZW50cy5maWx0ZXIoZXZlbnQgPT5cclxuICAgICAgYWRqdXN0ZWRFdmVudHMuaGFzKGV2ZW50KVxyXG4gICAgKTtcclxuICAgIHRoaXMudmlldy5ob3VyQ29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XHJcbiAgICAgIHByZXZpb3VzVmlldy5ob3VyQ29sdW1uc1tjb2x1bW5JbmRleF0uaG91cnMuZm9yRWFjaCgoaG91ciwgaG91ckluZGV4KSA9PiB7XHJcbiAgICAgICAgaG91ci5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBzZWdtZW50SW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbHVtbi5ob3Vyc1tob3VySW5kZXhdLnNlZ21lbnRzW3NlZ21lbnRJbmRleF0uY3NzQ2xhc3MgPVxyXG4gICAgICAgICAgICBzZWdtZW50LmNzc0NsYXNzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgYWRqdXN0ZWRFdmVudHNBcnJheS5mb3JFYWNoKGFkanVzdGVkRXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBhZGp1c3RlZEV2ZW50cy5nZXQoYWRqdXN0ZWRFdmVudCk7XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdDb2x1bW5FdmVudCA9IGNvbHVtbi5ldmVudHMuZmluZChcclxuICAgICAgICAgIGNvbHVtbkV2ZW50ID0+IGNvbHVtbkV2ZW50LmV2ZW50ID09PSBhZGp1c3RlZEV2ZW50XHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoZXhpc3RpbmdDb2x1bW5FdmVudCkge1xyXG4gICAgICAgICAgLy8gcmVzdG9yZSB0aGUgb3JpZ2luYWwgZXZlbnQgc28gdHJhY2tCeSBraWNrcyBpbiBhbmQgdGhlIGRvbSBpc24ndCBjaGFuZ2VkXHJcbiAgICAgICAgICBleGlzdGluZ0NvbHVtbkV2ZW50LmV2ZW50ID0gb3JpZ2luYWxFdmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gYWRkIGEgZHVtbXkgZXZlbnQgdG8gdGhlIGRyb3Agc28gaWYgdGhlIGV2ZW50IHdhcyByZW1vdmVkIGZyb20gdGhlIG9yaWdpbmFsIGNvbHVtbiB0aGUgZHJhZyBkb2Vzbid0IGVuZCBlYXJseVxyXG4gICAgICAgICAgY29sdW1uLmV2ZW50cy5wdXNoKHtcclxuICAgICAgICAgICAgZXZlbnQ6IG9yaWdpbmFsRXZlbnQsXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgc3RhcnRzQmVmb3JlRGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgZW5kc0FmdGVyRGF5OiBmYWxzZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgYWRqdXN0ZWRFdmVudHMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRUaW1lRXZlbnRSZXNpemVkRGF0ZXMoXHJcbiAgICBjYWxlbmRhckV2ZW50OiBDYWxlbmRhckV2ZW50LFxyXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XHJcbiAgKSB7XHJcbiAgICBjb25zdCBtaW5pbXVtRXZlbnRIZWlnaHQgPSBnZXRNaW5pbXVtRXZlbnRIZWlnaHRJbk1pbnV0ZXMoXHJcbiAgICAgIHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0XHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV3RXZlbnREYXRlcyA9IHtcclxuICAgICAgc3RhcnQ6IGNhbGVuZGFyRXZlbnQuc3RhcnQsXHJcbiAgICAgIGVuZDogZ2V0RGVmYXVsdEV2ZW50RW5kKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgY2FsZW5kYXJFdmVudCxcclxuICAgICAgICBtaW5pbXVtRXZlbnRIZWlnaHRcclxuICAgICAgKVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHsgZW5kLCAuLi5ldmVudFdpdGhvdXRFbmQgfSA9IGNhbGVuZGFyRXZlbnQ7XHJcbiAgICBjb25zdCBzbWFsbGVzdFJlc2l6ZXMgPSB7XHJcbiAgICAgIHN0YXJ0OiB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQsXHJcbiAgICAgICAgbWluaW11bUV2ZW50SGVpZ2h0ICogLTFcclxuICAgICAgKSxcclxuICAgICAgZW5kOiBnZXREZWZhdWx0RXZlbnRFbmQoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICBldmVudFdpdGhvdXRFbmQsXHJcbiAgICAgICAgbWluaW11bUV2ZW50SGVpZ2h0XHJcbiAgICAgIClcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5sZWZ0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBkYXlzRGlmZiA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgK3Jlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgLyB0aGlzLmRheUNvbHVtbldpZHRoXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5zdGFydCxcclxuICAgICAgICBkYXlzRGlmZixcclxuICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChuZXdTdGFydCA8IHNtYWxsZXN0UmVzaXplcy5zdGFydCkge1xyXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQgPSBuZXdTdGFydDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gc21hbGxlc3RSZXNpemVzLnN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5yaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgZGF5c0RpZmYgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICtyZXNpemVFdmVudC5lZGdlcy5yaWdodCAvIHRoaXMuZGF5Q29sdW1uV2lkdGhcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbmV3RW5kID0gYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxyXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQsXHJcbiAgICAgICAgZGF5c0RpZmYsXHJcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xyXG4gICAgICApO1xyXG4gICAgICBpZiAobmV3RW5kID4gc21hbGxlc3RSZXNpemVzLmVuZCkge1xyXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gbmV3RW5kO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gc21hbGxlc3RSZXNpemVzLmVuZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBtaW51dGVzTW92ZWQgPSBnZXRNaW51dGVzTW92ZWQoXHJcbiAgICAgICAgcmVzaXplRXZlbnQuZWRnZXMudG9wIGFzIG51bWJlcixcclxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50cyxcclxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxyXG4gICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBuZXdTdGFydCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcclxuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0LFxyXG4gICAgICAgIG1pbnV0ZXNNb3ZlZFxyXG4gICAgICApO1xyXG4gICAgICBpZiAobmV3U3RhcnQgPCBzbWFsbGVzdFJlc2l6ZXMuc3RhcnQpIHtcclxuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gbmV3U3RhcnQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5zdGFydCA9IHNtYWxsZXN0UmVzaXplcy5zdGFydDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMuYm90dG9tICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBtaW51dGVzTW92ZWQgPSBnZXRNaW51dGVzTW92ZWQoXHJcbiAgICAgICAgcmVzaXplRXZlbnQuZWRnZXMuYm90dG9tIGFzIG51bWJlcixcclxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50cyxcclxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxyXG4gICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBuZXdFbmQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQsXHJcbiAgICAgICAgbWludXRlc01vdmVkXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChuZXdFbmQgPiBzbWFsbGVzdFJlc2l6ZXMuZW5kKSB7XHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBuZXdFbmQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBzbWFsbGVzdFJlc2l6ZXMuZW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld0V2ZW50RGF0ZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==