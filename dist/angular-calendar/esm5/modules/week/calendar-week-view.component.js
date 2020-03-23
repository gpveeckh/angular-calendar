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
var CalendarWeekViewComponent = /** @class */ (function () {
    /**
     * @hidden
     */
    function CalendarWeekViewComponent(cdr, utils, locale, dateAdapter) {
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
        this.trackByHourColumn = function (index, column) {
            return column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
        };
        /**
         * @hidden
         */
        this.trackById = function (index, row) { return row.id; };
        this.locale = locale;
    }
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnInit = function () {
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
    CalendarWeekViewComponent.prototype.ngOnChanges = function (changes) {
        var refreshHeader = changes.viewDate ||
            changes.excludeDays ||
            changes.weekendDays ||
            changes.daysInWeek ||
            changes.weekStartsOn;
        var refreshBody = changes.viewDate ||
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
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.ngOnDestroy = function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    CalendarWeekViewComponent.prototype.resizeStarted = function (eventsContainer, minWidth) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        var resizeHelper = new CalendarResizeHelper(eventsContainer, minWidth);
        this.validateResize = function (_a) {
            var rectangle = _a.rectangle;
            return resizeHelper.validateResize({ rectangle: rectangle });
        };
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.timeEventResizeStarted = function (eventsContainer, timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        this.resizeStarted(eventsContainer);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.timeEventResizing = function (timeEvent, resizeEvent) {
        var _this = this;
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        var adjustedEvents = new Map();
        var tempEvents = tslib_1.__spread(this.events);
        this.timeEventResizes.forEach(function (lastResizeEvent, event) {
            var newEventDates = _this.getTimeEventResizedDates(event, lastResizeEvent);
            var adjustedEvent = tslib_1.__assign({}, event, newEventDates);
            adjustedEvents.set(adjustedEvent, event);
            var eventIndex = tempEvents.indexOf(event);
            tempEvents[eventIndex] = adjustedEvent;
        });
        this.restoreOriginalEvents(tempEvents, adjustedEvents);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.timeEventResizeEnded = function (timeEvent) {
        this.view = this.getWeekView(this.events);
        var lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
        if (lastResizeEvent) {
            this.timeEventResizes.delete(timeEvent.event);
            var newEventDates = this.getTimeEventResizedDates(timeEvent.event, lastResizeEvent);
            this.eventTimesChanged.emit({
                newStart: newEventDates.start,
                newEnd: newEventDates.end,
                event: timeEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventResizeStarted = function (allDayEventsContainer, allDayEvent, resizeEvent) {
        this.allDayEventResizes.set(allDayEvent, {
            originalOffset: allDayEvent.offset,
            originalSpan: allDayEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.resizeStarted(allDayEventsContainer, this.getDayColumnWidth(allDayEventsContainer));
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventResizing = function (allDayEvent, resizeEvent, dayWidth) {
        var currentResize = this.allDayEventResizes.get(allDayEvent);
        if (typeof resizeEvent.edges.left !== 'undefined') {
            var diff = Math.round(+resizeEvent.edges.left / dayWidth);
            allDayEvent.offset = currentResize.originalOffset + diff;
            allDayEvent.span = currentResize.originalSpan - diff;
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            var diff = Math.round(+resizeEvent.edges.right / dayWidth);
            allDayEvent.span = currentResize.originalSpan + diff;
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventResizeEnded = function (allDayEvent) {
        var currentResize = this.allDayEventResizes.get(allDayEvent);
        if (currentResize) {
            var allDayEventResizingBeforeStart = currentResize.edge === 'left';
            var daysDiff = void 0;
            if (allDayEventResizingBeforeStart) {
                daysDiff = allDayEvent.offset - currentResize.originalOffset;
            }
            else {
                daysDiff = allDayEvent.span - currentResize.originalSpan;
            }
            allDayEvent.offset = currentResize.originalOffset;
            allDayEvent.span = currentResize.originalSpan;
            var newStart = allDayEvent.event.start;
            var newEnd = allDayEvent.event.end || allDayEvent.event.start;
            if (allDayEventResizingBeforeStart) {
                newStart = addDaysWithExclusions(this.dateAdapter, newStart, daysDiff, this.excludeDays);
            }
            else {
                newEnd = addDaysWithExclusions(this.dateAdapter, newEnd, daysDiff, this.excludeDays);
            }
            this.eventTimesChanged.emit({
                newStart: newStart,
                newEnd: newEnd,
                event: allDayEvent.event,
                type: CalendarEventTimesChangedEventType.Resize
            });
            this.allDayEventResizes.delete(allDayEvent);
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.getDayColumnWidth = function (eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dateDragEnter = function (date) {
        this.lastDragEnterDate = date;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.eventDropped = function (dropEvent, date, allDay) {
        if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId) &&
            this.lastDragEnterDate.getTime() === date.getTime()) {
            this.eventTimesChanged.emit({
                type: CalendarEventTimesChangedEventType.Drop,
                event: dropEvent.dropData.event,
                newStart: date,
                allDay: allDay
            });
        }
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragEnter = function (type) {
        this.eventDragEnterByType[type]++;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragLeave = function (type) {
        this.eventDragEnterByType[type]--;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragStarted = function (eventsContainer, event, dayEvent) {
        var _this = this;
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        var dragHelper = new CalendarDragHelper(eventsContainer, event);
        this.validateDrag = function (_a) {
            var x = _a.x, y = _a.y, transform = _a.transform;
            return _this.allDayEventResizes.size === 0 &&
                _this.timeEventResizes.size === 0 &&
                dragHelper.validateDrag({
                    x: x,
                    y: y,
                    snapDraggedEvents: _this.snapDraggedEvents,
                    dragAlreadyMoved: _this.dragAlreadyMoved,
                    transform: transform
                });
        };
        this.dragActive = true;
        this.dragAlreadyMoved = false;
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0
        };
        if (!this.snapDraggedEvents && dayEvent) {
            this.view.hourColumns.forEach(function (column) {
                var linkedEvent = column.events.find(function (columnEvent) {
                    return columnEvent.event === dayEvent.event && columnEvent !== dayEvent;
                });
                // hide any linked events while dragging
                if (linkedEvent) {
                    linkedEvent.width = 0;
                    linkedEvent.height = 0;
                }
            });
        }
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragMove = function (dayEvent, dragEvent) {
        if (this.snapDraggedEvents) {
            var newEventTimes = this.getDragMovedEventTimes(dayEvent, dragEvent, this.dayColumnWidth, true);
            var originalEvent_1 = dayEvent.event;
            var adjustedEvent_1 = tslib_1.__assign({}, originalEvent_1, newEventTimes);
            var tempEvents = this.events.map(function (event) {
                if (event === originalEvent_1) {
                    return adjustedEvent_1;
                }
                return event;
            });
            this.restoreOriginalEvents(tempEvents, new Map([[adjustedEvent_1, originalEvent_1]]));
        }
        this.dragAlreadyMoved = true;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.allDayEventDragMove = function () {
        this.dragAlreadyMoved = true;
    };
    /**
     * @hidden
     */
    CalendarWeekViewComponent.prototype.dragEnded = function (weekEvent, dragEndEvent, dayWidth, useY) {
        if (useY === void 0) { useY = false; }
        this.view = this.getWeekView(this.events);
        this.dragActive = false;
        var _a = this.getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY), start = _a.start, end = _a.end;
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
    };
    CalendarWeekViewComponent.prototype.refreshHeader = function () {
        this.days = this.utils.getWeekViewHeader(tslib_1.__assign({ viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    };
    CalendarWeekViewComponent.prototype.refreshBody = function () {
        this.view = this.getWeekView(this.events);
    };
    CalendarWeekViewComponent.prototype.refreshAll = function () {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
    };
    CalendarWeekViewComponent.prototype.emitBeforeViewRender = function () {
        if (this.days && this.view) {
            this.beforeViewRender.emit(tslib_1.__assign({ header: this.days }, this.view));
        }
    };
    CalendarWeekViewComponent.prototype.getWeekView = function (events) {
        return this.utils.getWeekView(tslib_1.__assign({ events: events, viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, precision: this.precision, absolutePositionedEvents: true, hourSegments: this.hourSegments, dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            }, dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }, segmentHeight: this.hourSegmentHeight, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    };
    CalendarWeekViewComponent.prototype.getDragMovedEventTimes = function (weekEvent, dragEndEvent, dayWidth, useY) {
        var daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
        var minutesMoved = useY
            ? getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize)
            : 0;
        var start = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.start, daysDragged, this.excludeDays), minutesMoved);
        var end;
        if (weekEvent.event.end) {
            end = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.end, daysDragged, this.excludeDays), minutesMoved);
        }
        return { start: start, end: end };
    };
    CalendarWeekViewComponent.prototype.restoreOriginalEvents = function (tempEvents, adjustedEvents) {
        var previousView = this.view;
        this.view = this.getWeekView(tempEvents);
        var adjustedEventsArray = tempEvents.filter(function (event) {
            return adjustedEvents.has(event);
        });
        this.view.hourColumns.forEach(function (column, columnIndex) {
            previousView.hourColumns[columnIndex].hours.forEach(function (hour, hourIndex) {
                hour.segments.forEach(function (segment, segmentIndex) {
                    column.hours[hourIndex].segments[segmentIndex].cssClass =
                        segment.cssClass;
                });
            });
            adjustedEventsArray.forEach(function (adjustedEvent) {
                var originalEvent = adjustedEvents.get(adjustedEvent);
                var existingColumnEvent = column.events.find(function (columnEvent) { return columnEvent.event === adjustedEvent; });
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
    };
    CalendarWeekViewComponent.prototype.getTimeEventResizedDates = function (calendarEvent, resizeEvent) {
        var minimumEventHeight = getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight);
        var newEventDates = {
            start: calendarEvent.start,
            end: getDefaultEventEnd(this.dateAdapter, calendarEvent, minimumEventHeight)
        };
        var end = calendarEvent.end, eventWithoutEnd = tslib_1.__rest(calendarEvent, ["end"]);
        var smallestResizes = {
            start: this.dateAdapter.addMinutes(newEventDates.end, minimumEventHeight * -1),
            end: getDefaultEventEnd(this.dateAdapter, eventWithoutEnd, minimumEventHeight)
        };
        if (typeof resizeEvent.edges.left !== 'undefined') {
            var daysDiff = Math.round(+resizeEvent.edges.left / this.dayColumnWidth);
            var newStart = addDaysWithExclusions(this.dateAdapter, newEventDates.start, daysDiff, this.excludeDays);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            var daysDiff = Math.round(+resizeEvent.edges.right / this.dayColumnWidth);
            var newEnd = addDaysWithExclusions(this.dateAdapter, newEventDates.end, daysDiff, this.excludeDays);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        if (typeof resizeEvent.edges.top !== 'undefined') {
            var minutesMoved = getMinutesMoved(resizeEvent.edges.top, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            var newStart = this.dateAdapter.addMinutes(newEventDates.start, minutesMoved);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.bottom !== 'undefined') {
            var minutesMoved = getMinutesMoved(resizeEvent.edges.bottom, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            var newEnd = this.dateAdapter.addMinutes(newEventDates.end, minutesMoved);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        return newEventDates;
    };
    CalendarWeekViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: CalendarUtils },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
        { type: DateAdapter }
    ]; };
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
            template: "\n    <div class=\"cal-week-view\" role=\"grid\">\n      <mwl-calendar-week-view-header\n        [days]=\"days\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\"\n        (dayHeaderClicked)=\"dayHeaderClicked.emit($event)\"\n        (eventDropped)=\"\n          eventDropped({ dropData: $event }, $event.newStart, true)\n        \"\n        (dragEnter)=\"dateDragEnter($event.date)\"\n      >\n      </mwl-calendar-week-view-header>\n      <div\n        class=\"cal-all-day-events\"\n        #allDayEventsContainer\n        *ngIf=\"view.allDayEventRows.length > 0\"\n        mwlDroppable\n        (dragEnter)=\"dragEnter('allDay')\"\n        (dragLeave)=\"dragLeave('allDay')\"\n      >\n        <div class=\"cal-day-columns\">\n          <div\n            class=\"cal-time-label-column\"\n            [ngTemplateOutlet]=\"allDayEventsLabelTemplate\"\n          ></div>\n          <div\n            class=\"cal-day-column\"\n            *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n            mwlDroppable\n            dragOverClass=\"cal-drag-over\"\n            (drop)=\"eventDropped($event, day.date, true)\"\n            (dragEnter)=\"dateDragEnter(day.date)\"\n          ></div>\n        </div>\n        <div\n          *ngFor=\"let eventRow of view.allDayEventRows; trackBy: trackById\"\n          #eventRowContainer\n          class=\"cal-events-row\"\n        >\n          <div\n            *ngFor=\"\n              let allDayEvent of eventRow.row;\n              trackBy: trackByWeekAllDayEvent\n            \"\n            #event\n            class=\"cal-event-container\"\n            [class.cal-draggable]=\"\n              allDayEvent.event.draggable && allDayEventResizes.size === 0\n            \"\n            [class.cal-starts-within-week]=\"!allDayEvent.startsBeforeWeek\"\n            [class.cal-ends-within-week]=\"!allDayEvent.endsAfterWeek\"\n            [ngClass]=\"allDayEvent.event?.cssClass\"\n            [style.width.%]=\"(100 / days.length) * allDayEvent.span\"\n            [style.marginLeft.%]=\"(100 / days.length) * allDayEvent.offset\"\n            mwlResizable\n            [resizeSnapGrid]=\"{ left: dayColumnWidth, right: dayColumnWidth }\"\n            [validateResize]=\"validateResize\"\n            (resizeStart)=\"\n              allDayEventResizeStarted(eventRowContainer, allDayEvent, $event)\n            \"\n            (resizing)=\"\n              allDayEventResizing(allDayEvent, $event, dayColumnWidth)\n            \"\n            (resizeEnd)=\"allDayEventResizeEnded(allDayEvent)\"\n            mwlDraggable\n            dragActiveClass=\"cal-drag-active\"\n            [dropData]=\"{ event: allDayEvent.event, calendarId: calendarId }\"\n            [dragAxis]=\"{\n              x: allDayEvent.event.draggable && allDayEventResizes.size === 0,\n              y:\n                !snapDraggedEvents &&\n                allDayEvent.event.draggable &&\n                allDayEventResizes.size === 0\n            }\"\n            [dragSnapGrid]=\"snapDraggedEvents ? { x: dayColumnWidth } : {}\"\n            [validateDrag]=\"validateDrag\"\n            (dragStart)=\"dragStarted(eventRowContainer, event)\"\n            (dragging)=\"allDayEventDragMove()\"\n            (dragEnd)=\"dragEnded(allDayEvent, $event, dayColumnWidth)\"\n          >\n            <div\n              class=\"cal-resize-handle cal-resize-handle-before-start\"\n              *ngIf=\"\n                allDayEvent.event?.resizable?.beforeStart &&\n                !allDayEvent.startsBeforeWeek\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ left: true }\"\n            ></div>\n            <mwl-calendar-week-view-event\n              [locale]=\"locale\"\n              [weekEvent]=\"allDayEvent\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipDelay]=\"tooltipDelay\"\n              [customTemplate]=\"eventTemplate\"\n              [eventTitleTemplate]=\"eventTitleTemplate\"\n              [eventActionsTemplate]=\"eventActionsTemplate\"\n              [daysInWeek]=\"daysInWeek\"\n              (eventClicked)=\"\n                eventClicked.emit({\n                  event: allDayEvent.event,\n                  sourceEvent: $event.sourceEvent\n                })\n              \"\n            >\n            </mwl-calendar-week-view-event>\n            <div\n              class=\"cal-resize-handle cal-resize-handle-after-end\"\n              *ngIf=\"\n                allDayEvent.event?.resizable?.afterEnd &&\n                !allDayEvent.endsAfterWeek\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ right: true }\"\n            ></div>\n          </div>\n        </div>\n      </div>\n      <div\n        class=\"cal-time-events\"\n        mwlDroppable\n        (dragEnter)=\"dragEnter('time')\"\n        (dragLeave)=\"dragLeave('time')\"\n      >\n        <div\n          class=\"cal-time-label-column\"\n          *ngIf=\"view.hourColumns.length > 0 && daysInWeek !== 1\"\n        >\n          <div\n            *ngFor=\"\n              let hour of view.hourColumns[0].hours;\n              trackBy: trackByHour;\n              let odd = odd\n            \"\n            class=\"cal-hour\"\n            [class.cal-hour-odd]=\"odd\"\n          >\n            <mwl-calendar-week-view-hour-segment\n              *ngFor=\"let segment of hour.segments; trackBy: trackByHourSegment\"\n              [style.height.px]=\"hourSegmentHeight\"\n              [segment]=\"segment\"\n              [segmentHeight]=\"hourSegmentHeight\"\n              [locale]=\"locale\"\n              [customTemplate]=\"hourSegmentTemplate\"\n              [isTimeLabel]=\"true\"\n              [daysInWeek]=\"daysInWeek\"\n            >\n            </mwl-calendar-week-view-hour-segment>\n          </div>\n        </div>\n        <div\n          class=\"cal-day-columns\"\n          [class.cal-resize-active]=\"timeEventResizes.size > 0\"\n          #dayColumns\n        >\n          <div\n            class=\"cal-day-column\"\n            *ngFor=\"let column of view.hourColumns; trackBy: trackByHourColumn\"\n          >\n            <mwl-calendar-week-view-current-time-marker\n              [columnDate]=\"column.date\"\n              [dayStartHour]=\"dayStartHour\"\n              [dayStartMinute]=\"dayStartMinute\"\n              [dayEndHour]=\"dayEndHour\"\n              [dayEndMinute]=\"dayEndMinute\"\n              [hourSegments]=\"hourSegments\"\n              [hourSegmentHeight]=\"hourSegmentHeight\"\n              [customTemplate]=\"currentTimeMarkerTemplate\"\n            ></mwl-calendar-week-view-current-time-marker>\n            <div class=\"cal-events-container\">\n              <div\n                *ngFor=\"\n                  let timeEvent of column.events;\n                  trackBy: trackByWeekTimeEvent\n                \"\n                #event\n                class=\"cal-event-container\"\n                [class.cal-draggable]=\"\n                  timeEvent.event.draggable && timeEventResizes.size === 0\n                \"\n                [class.cal-starts-within-day]=\"!timeEvent.startsBeforeDay\"\n                [class.cal-ends-within-day]=\"!timeEvent.endsAfterDay\"\n                [ngClass]=\"timeEvent.event.cssClass\"\n                [hidden]=\"timeEvent.height === 0 && timeEvent.width === 0\"\n                [style.top.px]=\"timeEvent.top\"\n                [style.height.px]=\"timeEvent.height\"\n                [style.left.%]=\"timeEvent.left\"\n                [style.width.%]=\"timeEvent.width\"\n                mwlResizable\n                [resizeSnapGrid]=\"{\n                  left: dayColumnWidth,\n                  right: dayColumnWidth,\n                  top: eventSnapSize || hourSegmentHeight,\n                  bottom: eventSnapSize || hourSegmentHeight\n                }\"\n                [validateResize]=\"validateResize\"\n                [allowNegativeResizes]=\"true\"\n                (resizeStart)=\"\n                  timeEventResizeStarted(dayColumns, timeEvent, $event)\n                \"\n                (resizing)=\"timeEventResizing(timeEvent, $event)\"\n                (resizeEnd)=\"timeEventResizeEnded(timeEvent)\"\n                mwlDraggable\n                dragActiveClass=\"cal-drag-active\"\n                [dropData]=\"{ event: timeEvent.event, calendarId: calendarId }\"\n                [dragAxis]=\"{\n                  x: timeEvent.event.draggable && timeEventResizes.size === 0,\n                  y: timeEvent.event.draggable && timeEventResizes.size === 0\n                }\"\n                [dragSnapGrid]=\"\n                  snapDraggedEvents\n                    ? {\n                        x: dayColumnWidth,\n                        y: eventSnapSize || hourSegmentHeight\n                      }\n                    : {}\n                \"\n                [ghostDragEnabled]=\"!snapDraggedEvents\"\n                [validateDrag]=\"validateDrag\"\n                (dragStart)=\"dragStarted(dayColumns, event, timeEvent)\"\n                (dragging)=\"dragMove(timeEvent, $event)\"\n                (dragEnd)=\"dragEnded(timeEvent, $event, dayColumnWidth, true)\"\n              >\n                <div\n                  class=\"cal-resize-handle cal-resize-handle-before-start\"\n                  *ngIf=\"\n                    timeEvent.event?.resizable?.beforeStart &&\n                    !timeEvent.startsBeforeDay\n                  \"\n                  mwlResizeHandle\n                  [resizeEdges]=\"{\n                    left: true,\n                    top: true\n                  }\"\n                ></div>\n                <mwl-calendar-week-view-event\n                  [locale]=\"locale\"\n                  [weekEvent]=\"timeEvent\"\n                  [tooltipPlacement]=\"tooltipPlacement\"\n                  [tooltipTemplate]=\"tooltipTemplate\"\n                  [tooltipAppendToBody]=\"tooltipAppendToBody\"\n                  [tooltipDisabled]=\"dragActive || timeEventResizes.size > 0\"\n                  [tooltipDelay]=\"tooltipDelay\"\n                  [customTemplate]=\"eventTemplate\"\n                  [eventTitleTemplate]=\"eventTitleTemplate\"\n                  [eventActionsTemplate]=\"eventActionsTemplate\"\n                  [column]=\"column\"\n                  [daysInWeek]=\"daysInWeek\"\n                  (eventClicked)=\"\n                    eventClicked.emit({\n                      event: timeEvent.event,\n                      sourceEvent: $event.sourceEvent\n                    })\n                  \"\n                >\n                </mwl-calendar-week-view-event>\n                <div\n                  class=\"cal-resize-handle cal-resize-handle-after-end\"\n                  *ngIf=\"\n                    timeEvent.event?.resizable?.afterEnd &&\n                    !timeEvent.endsAfterDay\n                  \"\n                  mwlResizeHandle\n                  [resizeEdges]=\"{\n                    right: true,\n                    bottom: true\n                  }\"\n                ></div>\n              </div>\n            </div>\n\n            <div\n              *ngFor=\"\n                let hour of column.hours;\n                trackBy: trackByHour;\n                let odd = odd\n              \"\n              class=\"cal-hour\"\n              [class.cal-hour-odd]=\"odd\"\n            >\n              <mwl-calendar-week-view-hour-segment\n                *ngFor=\"\n                  let segment of hour.segments;\n                  trackBy: trackByHourSegment\n                \"\n                [style.height.px]=\"hourSegmentHeight\"\n                [segment]=\"segment\"\n                [segmentHeight]=\"hourSegmentHeight\"\n                [locale]=\"locale\"\n                [customTemplate]=\"hourSegmentTemplate\"\n                [daysInWeek]=\"daysInWeek\"\n                (mwlClick)=\"\n                  hourSegmentClicked.emit({\n                    date: segment.date,\n                    sourceEvent: $event\n                  })\n                \"\n                [clickListenerDisabled]=\"\n                  hourSegmentClicked.observers.length === 0\n                \"\n                mwlDroppable\n                [dragOverClass]=\"\n                  !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null\n                \"\n                dragActiveClass=\"cal-drag-active\"\n                (drop)=\"eventDropped($event, segment.date, false)\"\n                (dragEnter)=\"dateDragEnter(segment.date)\"\n                [isTimeLabel]=\"daysInWeek === 1\"\n              >\n              </mwl-calendar-week-view-hour-segment>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        }),
        tslib_1.__param(2, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
            CalendarUtils, String, DateAdapter])
    ], CalendarWeekViewComponent);
    return CalendarWeekViewComponent;
}());
export { CalendarWeekViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFjN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUVMLGtDQUFrQyxFQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0QixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLG9CQUFvQixFQUNyQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQW1CL0Q7Ozs7Ozs7OztHQVNHO0FBbVVIO0lBc1NFOztPQUVHO0lBQ0gsbUNBQ1ksR0FBc0IsRUFDdEIsS0FBb0IsRUFDWCxNQUFjLEVBQ3ZCLFdBQXdCO1FBSHhCLFFBQUcsR0FBSCxHQUFHLENBQW1C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VztnRkFBTTtJQU1yRDtRQURDLE1BQU0sRUFBRTs7dUVBSUo7SUFNTDtRQURDLE1BQU0sRUFBRTs7bUVBSUo7SUFNTDtRQURDLE1BQU0sRUFBRTs7d0VBQzhEO0lBT3ZFO1FBREMsTUFBTSxFQUFFOzt1RUFDZ0U7SUFNekU7UUFEQyxNQUFNLEVBQUU7O3lFQUlKO0lBekxNLHlCQUF5QjtRQWxVckMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsOHBaQThUVDtTQUNGLENBQUM7UUE2U0csbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2lEQUZILGlCQUFpQjtZQUNmLGFBQWEsVUFFUCxXQUFXO09BN1N6Qix5QkFBeUIsQ0ErNUJyQztJQUFELGdDQUFDO0NBQUEsQUEvNUJELElBKzVCQztTQS81QlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBMT0NBTEVfSUQsXHJcbiAgSW5qZWN0LFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIFdlZWtEYXksXHJcbiAgQ2FsZW5kYXJFdmVudCxcclxuICBXZWVrVmlld0FsbERheUV2ZW50LFxyXG4gIFdlZWtWaWV3LFxyXG4gIFZpZXdQZXJpb2QsXHJcbiAgV2Vla1ZpZXdIb3VyQ29sdW1uLFxyXG4gIFdlZWtWaWV3VGltZUV2ZW50LFxyXG4gIFdlZWtWaWV3SG91clNlZ21lbnQsXHJcbiAgV2Vla1ZpZXdIb3VyLFxyXG4gIFdlZWtWaWV3QWxsRGF5RXZlbnRSb3dcclxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XHJcbmltcG9ydCB7IFJlc2l6ZUV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemFibGUtZWxlbWVudCc7XHJcbmltcG9ydCB7IENhbGVuZGFyRHJhZ0hlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1kcmFnLWhlbHBlci5wcm92aWRlcic7XHJcbmltcG9ydCB7IENhbGVuZGFyUmVzaXplSGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXJlc2l6ZS1oZWxwZXIucHJvdmlkZXInO1xyXG5pbXBvcnQge1xyXG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudCxcclxuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRUeXBlXHJcbn0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci11dGlscy5wcm92aWRlcic7XHJcbmltcG9ydCB7XHJcbiAgdmFsaWRhdGVFdmVudHMsXHJcbiAgcm91bmRUb05lYXJlc3QsXHJcbiAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlLFxyXG4gIHRyYWNrQnlIb3VyU2VnbWVudCxcclxuICB0cmFja0J5SG91cixcclxuICBnZXRNaW51dGVzTW92ZWQsXHJcbiAgZ2V0RGVmYXVsdEV2ZW50RW5kLFxyXG4gIGdldE1pbmltdW1FdmVudEhlaWdodEluTWludXRlcyxcclxuICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMsXHJcbiAgaXNEcmFnZ2VkV2l0aGluUGVyaW9kLFxyXG4gIHNob3VsZEZpcmVEcm9wcGVkRXZlbnQsXHJcbiAgZ2V0V2Vla1ZpZXdQZXJpb2QsXHJcbiAgdHJhY2tCeVdlZWtBbGxEYXlFdmVudCxcclxuICB0cmFja0J5V2Vla1RpbWVFdmVudFxyXG59IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7XHJcbiAgRHJhZ0VuZEV2ZW50LFxyXG4gIERyb3BFdmVudCxcclxuICBEcmFnTW92ZUV2ZW50LFxyXG4gIFZhbGlkYXRlRHJhZ1xyXG59IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XHJcbmltcG9ydCB7IFBsYWNlbWVudEFycmF5IH0gZnJvbSAncG9zaXRpb25pbmcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplIHtcclxuICBvcmlnaW5hbE9mZnNldDogbnVtYmVyO1xyXG4gIG9yaWdpbmFsU3BhbjogbnVtYmVyO1xyXG4gIGVkZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQgZXh0ZW5kcyBXZWVrVmlldyB7XHJcbiAgaGVhZGVyOiBXZWVrRGF5W107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gd2Vlay4gRXhhbXBsZSB1c2FnZTpcclxuICpcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiA8bXdsLWNhbGVuZGFyLXdlZWstdmlld1xyXG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcclxuICogIFtldmVudHNdPVwiZXZlbnRzXCI+XHJcbiAqIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldz5cclxuICogYGBgXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FsLXdlZWstdmlld1wiIHJvbGU9XCJncmlkXCI+XHJcbiAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlclxyXG4gICAgICAgIFtkYXlzXT1cImRheXNcIlxyXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxyXG4gICAgICAgIChkYXlIZWFkZXJDbGlja2VkKT1cImRheUhlYWRlckNsaWNrZWQuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgICAoZXZlbnREcm9wcGVkKT1cIlxyXG4gICAgICAgICAgZXZlbnREcm9wcGVkKHsgZHJvcERhdGE6ICRldmVudCB9LCAkZXZlbnQubmV3U3RhcnQsIHRydWUpXHJcbiAgICAgICAgXCJcclxuICAgICAgICAoZHJhZ0VudGVyKT1cImRhdGVEcmFnRW50ZXIoJGV2ZW50LmRhdGUpXCJcclxuICAgICAgPlxyXG4gICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctaGVhZGVyPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJjYWwtYWxsLWRheS1ldmVudHNcIlxyXG4gICAgICAgICNhbGxEYXlFdmVudHNDb250YWluZXJcclxuICAgICAgICAqbmdJZj1cInZpZXcuYWxsRGF5RXZlbnRSb3dzLmxlbmd0aCA+IDBcIlxyXG4gICAgICAgIG13bERyb3BwYWJsZVxyXG4gICAgICAgIChkcmFnRW50ZXIpPVwiZHJhZ0VudGVyKCdhbGxEYXknKVwiXHJcbiAgICAgICAgKGRyYWdMZWF2ZSk9XCJkcmFnTGVhdmUoJ2FsbERheScpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LWNvbHVtbnNcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtdGltZS1sYWJlbC1jb2x1bW5cIlxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlXCJcclxuICAgICAgICAgID48L2Rpdj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZGF5LWNvbHVtblwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5czsgdHJhY2tCeTogdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlXCJcclxuICAgICAgICAgICAgbXdsRHJvcHBhYmxlXHJcbiAgICAgICAgICAgIGRyYWdPdmVyQ2xhc3M9XCJjYWwtZHJhZy1vdmVyXCJcclxuICAgICAgICAgICAgKGRyb3ApPVwiZXZlbnREcm9wcGVkKCRldmVudCwgZGF5LmRhdGUsIHRydWUpXCJcclxuICAgICAgICAgICAgKGRyYWdFbnRlcik9XCJkYXRlRHJhZ0VudGVyKGRheS5kYXRlKVwiXHJcbiAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50Um93IG9mIHZpZXcuYWxsRGF5RXZlbnRSb3dzOyB0cmFja0J5OiB0cmFja0J5SWRcIlxyXG4gICAgICAgICAgI2V2ZW50Um93Q29udGFpbmVyXHJcbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudHMtcm93XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICpuZ0Zvcj1cIlxyXG4gICAgICAgICAgICAgIGxldCBhbGxEYXlFdmVudCBvZiBldmVudFJvdy5yb3c7XHJcbiAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeVdlZWtBbGxEYXlFdmVudFxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAjZXZlbnRcclxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcclxuICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiXHJcbiAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIGFsbERheUV2ZW50UmVzaXplcy5zaXplID09PSAwXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi13ZWVrXT1cIiFhbGxEYXlFdmVudC5zdGFydHNCZWZvcmVXZWVrXCJcclxuICAgICAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi13ZWVrXT1cIiFhbGxEYXlFdmVudC5lbmRzQWZ0ZXJXZWVrXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiYWxsRGF5RXZlbnQuZXZlbnQ/LmNzc0NsYXNzXCJcclxuICAgICAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwiKDEwMCAvIGRheXMubGVuZ3RoKSAqIGFsbERheUV2ZW50LnNwYW5cIlxyXG4gICAgICAgICAgICBbc3R5bGUubWFyZ2luTGVmdC4lXT1cIigxMDAgLyBkYXlzLmxlbmd0aCkgKiBhbGxEYXlFdmVudC5vZmZzZXRcIlxyXG4gICAgICAgICAgICBtd2xSZXNpemFibGVcclxuICAgICAgICAgICAgW3Jlc2l6ZVNuYXBHcmlkXT1cInsgbGVmdDogZGF5Q29sdW1uV2lkdGgsIHJpZ2h0OiBkYXlDb2x1bW5XaWR0aCB9XCJcclxuICAgICAgICAgICAgW3ZhbGlkYXRlUmVzaXplXT1cInZhbGlkYXRlUmVzaXplXCJcclxuICAgICAgICAgICAgKHJlc2l6ZVN0YXJ0KT1cIlxyXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXplU3RhcnRlZChldmVudFJvd0NvbnRhaW5lciwgYWxsRGF5RXZlbnQsICRldmVudClcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgKHJlc2l6aW5nKT1cIlxyXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXppbmcoYWxsRGF5RXZlbnQsICRldmVudCwgZGF5Q29sdW1uV2lkdGgpXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgIChyZXNpemVFbmQpPVwiYWxsRGF5RXZlbnRSZXNpemVFbmRlZChhbGxEYXlFdmVudClcIlxyXG4gICAgICAgICAgICBtd2xEcmFnZ2FibGVcclxuICAgICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcclxuICAgICAgICAgICAgW2Ryb3BEYXRhXT1cInsgZXZlbnQ6IGFsbERheUV2ZW50LmV2ZW50LCBjYWxlbmRhcklkOiBjYWxlbmRhcklkIH1cIlxyXG4gICAgICAgICAgICBbZHJhZ0F4aXNdPVwie1xyXG4gICAgICAgICAgICAgIHg6IGFsbERheUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiBhbGxEYXlFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCxcclxuICAgICAgICAgICAgICB5OlxyXG4gICAgICAgICAgICAgICAgIXNuYXBEcmFnZ2VkRXZlbnRzICYmXHJcbiAgICAgICAgICAgICAgICBhbGxEYXlFdmVudC5ldmVudC5kcmFnZ2FibGUgJiZcclxuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXplcy5zaXplID09PSAwXHJcbiAgICAgICAgICAgIH1cIlxyXG4gICAgICAgICAgICBbZHJhZ1NuYXBHcmlkXT1cInNuYXBEcmFnZ2VkRXZlbnRzID8geyB4OiBkYXlDb2x1bW5XaWR0aCB9IDoge31cIlxyXG4gICAgICAgICAgICBbdmFsaWRhdGVEcmFnXT1cInZhbGlkYXRlRHJhZ1wiXHJcbiAgICAgICAgICAgIChkcmFnU3RhcnQpPVwiZHJhZ1N0YXJ0ZWQoZXZlbnRSb3dDb250YWluZXIsIGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChkcmFnZ2luZyk9XCJhbGxEYXlFdmVudERyYWdNb3ZlKClcIlxyXG4gICAgICAgICAgICAoZHJhZ0VuZCk9XCJkcmFnRW5kZWQoYWxsRGF5RXZlbnQsICRldmVudCwgZGF5Q29sdW1uV2lkdGgpXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYmVmb3JlLXN0YXJ0XCJcclxuICAgICAgICAgICAgICAqbmdJZj1cIlxyXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQgJiZcclxuICAgICAgICAgICAgICAgICFhbGxEYXlFdmVudC5zdGFydHNCZWZvcmVXZWVrXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcclxuICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwieyBsZWZ0OiB0cnVlIH1cIlxyXG4gICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50XHJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICAgIFt3ZWVrRXZlbnRdPVwiYWxsRGF5RXZlbnRcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxyXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcclxuICAgICAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXHJcbiAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxyXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiXHJcbiAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBhbGxEYXlFdmVudC5ldmVudCxcclxuICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudC5zb3VyY2VFdmVudFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudD5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYWZ0ZXItZW5kXCJcclxuICAgICAgICAgICAgICAqbmdJZj1cIlxyXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYWZ0ZXJFbmQgJiZcclxuICAgICAgICAgICAgICAgICFhbGxEYXlFdmVudC5lbmRzQWZ0ZXJXZWVrXHJcbiAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcclxuICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwieyByaWdodDogdHJ1ZSB9XCJcclxuICAgICAgICAgICAgPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJjYWwtdGltZS1ldmVudHNcIlxyXG4gICAgICAgIG13bERyb3BwYWJsZVxyXG4gICAgICAgIChkcmFnRW50ZXIpPVwiZHJhZ0VudGVyKCd0aW1lJylcIlxyXG4gICAgICAgIChkcmFnTGVhdmUpPVwiZHJhZ0xlYXZlKCd0aW1lJylcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3M9XCJjYWwtdGltZS1sYWJlbC1jb2x1bW5cIlxyXG4gICAgICAgICAgKm5nSWY9XCJ2aWV3LmhvdXJDb2x1bW5zLmxlbmd0aCA+IDAgJiYgZGF5c0luV2VlayAhPT0gMVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJcclxuICAgICAgICAgICAgICBsZXQgaG91ciBvZiB2aWV3LmhvdXJDb2x1bW5zWzBdLmhvdXJzO1xyXG4gICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlIb3VyO1xyXG4gICAgICAgICAgICAgIGxldCBvZGQgPSBvZGRcclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtaG91clwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtaG91ci1vZGRdPVwib2RkXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci13ZWVrLXZpZXctaG91ci1zZWdtZW50XHJcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHNlZ21lbnQgb2YgaG91ci5zZWdtZW50czsgdHJhY2tCeTogdHJhY2tCeUhvdXJTZWdtZW50XCJcclxuICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcclxuICAgICAgICAgICAgICBbc2VnbWVudF09XCJzZWdtZW50XCJcclxuICAgICAgICAgICAgICBbc2VnbWVudEhlaWdodF09XCJob3VyU2VnbWVudEhlaWdodFwiXHJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxyXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbaXNUaW1lTGFiZWxdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgW2RheXNJbldlZWtdPVwiZGF5c0luV2Vla1wiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwiY2FsLWRheS1jb2x1bW5zXCJcclxuICAgICAgICAgIFtjbGFzcy5jYWwtcmVzaXplLWFjdGl2ZV09XCJ0aW1lRXZlbnRSZXNpemVzLnNpemUgPiAwXCJcclxuICAgICAgICAgICNkYXlDb2x1bW5zXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzcz1cImNhbC1kYXktY29sdW1uXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiB2aWV3LmhvdXJDb2x1bW5zOyB0cmFja0J5OiB0cmFja0J5SG91ckNvbHVtblwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXJcclxuICAgICAgICAgICAgICBbY29sdW1uRGF0ZV09XCJjb2x1bW4uZGF0ZVwiXHJcbiAgICAgICAgICAgICAgW2RheVN0YXJ0SG91cl09XCJkYXlTdGFydEhvdXJcIlxyXG4gICAgICAgICAgICAgIFtkYXlTdGFydE1pbnV0ZV09XCJkYXlTdGFydE1pbnV0ZVwiXHJcbiAgICAgICAgICAgICAgW2RheUVuZEhvdXJdPVwiZGF5RW5kSG91clwiXHJcbiAgICAgICAgICAgICAgW2RheUVuZE1pbnV0ZV09XCJkYXlFbmRNaW51dGVcIlxyXG4gICAgICAgICAgICAgIFtob3VyU2VnbWVudHNdPVwiaG91clNlZ21lbnRzXCJcclxuICAgICAgICAgICAgICBbaG91clNlZ21lbnRIZWlnaHRdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxyXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlXCJcclxuICAgICAgICAgICAgPjwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50cy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJcclxuICAgICAgICAgICAgICAgICAgbGV0IHRpbWVFdmVudCBvZiBjb2x1bW4uZXZlbnRzO1xyXG4gICAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5V2Vla1RpbWVFdmVudFxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgICNldmVudFxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cIlxyXG4gICAgICAgICAgICAgICAgICB0aW1lRXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi1kYXldPVwiIXRpbWVFdmVudC5zdGFydHNCZWZvcmVEYXlcIlxyXG4gICAgICAgICAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi1kYXldPVwiIXRpbWVFdmVudC5lbmRzQWZ0ZXJEYXlcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwidGltZUV2ZW50LmV2ZW50LmNzc0NsYXNzXCJcclxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwidGltZUV2ZW50LmhlaWdodCA9PT0gMCAmJiB0aW1lRXZlbnQud2lkdGggPT09IDBcIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRvcC5weF09XCJ0aW1lRXZlbnQudG9wXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwidGltZUV2ZW50LmhlaWdodFwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUubGVmdC4lXT1cInRpbWVFdmVudC5sZWZ0XCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC4lXT1cInRpbWVFdmVudC53aWR0aFwiXHJcbiAgICAgICAgICAgICAgICBtd2xSZXNpemFibGVcclxuICAgICAgICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7XHJcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IGRheUNvbHVtbldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICByaWdodDogZGF5Q29sdW1uV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgIHRvcDogZXZlbnRTbmFwU2l6ZSB8fCBob3VyU2VnbWVudEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgYm90dG9tOiBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9XCJcclxuICAgICAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXHJcbiAgICAgICAgICAgICAgICBbYWxsb3dOZWdhdGl2ZVJlc2l6ZXNdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAocmVzaXplU3RhcnQpPVwiXHJcbiAgICAgICAgICAgICAgICAgIHRpbWVFdmVudFJlc2l6ZVN0YXJ0ZWQoZGF5Q29sdW1ucywgdGltZUV2ZW50LCAkZXZlbnQpXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgKHJlc2l6aW5nKT1cInRpbWVFdmVudFJlc2l6aW5nKHRpbWVFdmVudCwgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAocmVzaXplRW5kKT1cInRpbWVFdmVudFJlc2l6ZUVuZGVkKHRpbWVFdmVudClcIlxyXG4gICAgICAgICAgICAgICAgbXdsRHJhZ2dhYmxlXHJcbiAgICAgICAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxyXG4gICAgICAgICAgICAgICAgW2Ryb3BEYXRhXT1cInsgZXZlbnQ6IHRpbWVFdmVudC5ldmVudCwgY2FsZW5kYXJJZDogY2FsZW5kYXJJZCB9XCJcclxuICAgICAgICAgICAgICAgIFtkcmFnQXhpc109XCJ7XHJcbiAgICAgICAgICAgICAgICAgIHg6IHRpbWVFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgdGltZUV2ZW50UmVzaXplcy5zaXplID09PSAwLFxyXG4gICAgICAgICAgICAgICAgICB5OiB0aW1lRXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxyXG4gICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgICAgICBbZHJhZ1NuYXBHcmlkXT1cIlxyXG4gICAgICAgICAgICAgICAgICBzbmFwRHJhZ2dlZEV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBkYXlDb2x1bW5XaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnRTbmFwU2l6ZSB8fCBob3VyU2VnbWVudEhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDoge31cclxuICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICBbZ2hvc3REcmFnRW5hYmxlZF09XCIhc25hcERyYWdnZWRFdmVudHNcIlxyXG4gICAgICAgICAgICAgICAgW3ZhbGlkYXRlRHJhZ109XCJ2YWxpZGF0ZURyYWdcIlxyXG4gICAgICAgICAgICAgICAgKGRyYWdTdGFydCk9XCJkcmFnU3RhcnRlZChkYXlDb2x1bW5zLCBldmVudCwgdGltZUV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAoZHJhZ2dpbmcpPVwiZHJhZ01vdmUodGltZUV2ZW50LCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgIChkcmFnRW5kKT1cImRyYWdFbmRlZCh0aW1lRXZlbnQsICRldmVudCwgZGF5Q29sdW1uV2lkdGgsIHRydWUpXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYmVmb3JlLXN0YXJ0XCJcclxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICAgICAgICAgICB0aW1lRXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAhdGltZUV2ZW50LnN0YXJ0c0JlZm9yZURheVxyXG4gICAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcclxuICAgICAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cIntcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICB9XCJcclxuICAgICAgICAgICAgICAgID48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50XHJcbiAgICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcclxuICAgICAgICAgICAgICAgICAgW3dlZWtFdmVudF09XCJ0aW1lRXZlbnRcIlxyXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcclxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcclxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJkcmFnQWN0aXZlIHx8IHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA+IDBcIlxyXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXHJcbiAgICAgICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXHJcbiAgICAgICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxyXG4gICAgICAgICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cIlxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Q2xpY2tlZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiB0aW1lRXZlbnQuZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VFdmVudDogJGV2ZW50LnNvdXJjZUV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudD5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtcmVzaXplLWhhbmRsZSBjYWwtcmVzaXplLWhhbmRsZS1hZnRlci1lbmRcIlxyXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIlxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVFdmVudC5ldmVudD8ucmVzaXphYmxlPy5hZnRlckVuZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICF0aW1lRXZlbnQuZW5kc0FmdGVyRGF5XHJcbiAgICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICAgIG13bFJlc2l6ZUhhbmRsZVxyXG4gICAgICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwie1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICB9XCJcclxuICAgICAgICAgICAgICAgID48L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgKm5nRm9yPVwiXHJcbiAgICAgICAgICAgICAgICBsZXQgaG91ciBvZiBjb2x1bW4uaG91cnM7XHJcbiAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5SG91cjtcclxuICAgICAgICAgICAgICAgIGxldCBvZGQgPSBvZGRcclxuICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLWhvdXJcIlxyXG4gICAgICAgICAgICAgIFtjbGFzcy5jYWwtaG91ci1vZGRdPVwib2RkXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudFxyXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwiXHJcbiAgICAgICAgICAgICAgICAgIGxldCBzZWdtZW50IG9mIGhvdXIuc2VnbWVudHM7XHJcbiAgICAgICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlIb3VyU2VnbWVudFxyXG4gICAgICAgICAgICAgICAgXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxyXG4gICAgICAgICAgICAgICAgW3NlZ21lbnRdPVwic2VnbWVudFwiXHJcbiAgICAgICAgICAgICAgICBbc2VnbWVudEhlaWdodF09XCJob3VyU2VnbWVudEhlaWdodFwiXHJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXHJcbiAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcclxuICAgICAgICAgICAgICAgIChtd2xDbGljayk9XCJcclxuICAgICAgICAgICAgICAgICAgaG91clNlZ21lbnRDbGlja2VkLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHNlZ21lbnQuZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VFdmVudDogJGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgW2NsaWNrTGlzdGVuZXJEaXNhYmxlZF09XCJcclxuICAgICAgICAgICAgICAgICAgaG91clNlZ21lbnRDbGlja2VkLm9ic2VydmVycy5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICAgICAgICBtd2xEcm9wcGFibGVcclxuICAgICAgICAgICAgICAgIFtkcmFnT3ZlckNsYXNzXT1cIlxyXG4gICAgICAgICAgICAgICAgICAhZHJhZ0FjdGl2ZSB8fCAhc25hcERyYWdnZWRFdmVudHMgPyAnY2FsLWRyYWctb3ZlcicgOiBudWxsXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgIChkcm9wKT1cImV2ZW50RHJvcHBlZCgkZXZlbnQsIHNlZ21lbnQuZGF0ZSwgZmFsc2UpXCJcclxuICAgICAgICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF0ZURyYWdFbnRlcihzZWdtZW50LmRhdGUpXCJcclxuICAgICAgICAgICAgICAgIFtpc1RpbWVMYWJlbF09XCJkYXlzSW5XZWVrID09PSAxXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcclxuICAgKiBUaGUgc2NoZW1hIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWF0dGxld2lzOTIvY2FsZW5kYXItdXRpbHMvYmxvYi9jNTE2ODk5ODVmNTlhMjcxOTQwZTMwYmM0ZTJjNGUxZmVlM2ZjYjVjL3NyYy9jYWxlbmRhclV0aWxzLnRzI0w0OS1MNjNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgd2lsbCBiZSBoaWRkZW4gb24gdGhlIHZpZXdcclxuICAgKi9cclxuICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XHJcbiAgICovXHJcbiAgQElucHV0KCkgcmVmcmVzaDogU3ViamVjdDxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbG9jYWxlIHVzZWQgdG8gZm9ybWF0IGRhdGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gYXBwZW5kIHRvb2x0aXBzIHRvIHRoZSBib2R5IG9yIG5leHQgdG8gdGhlIHRyaWdnZXIgZWxlbWVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkLiBJZiBub3QgcHJvdmlkZWQgdGhlIHRvb2x0aXBcclxuICAgKiB3aWxsIGJlIGRpc3BsYXllZCBpbW1lZGlhdGVseS5cclxuICAgKi9cclxuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3RhcnQgbnVtYmVyIG9mIHRoZSB3ZWVrLlxyXG4gICAqIFRoaXMgaXMgaWdub3JlZCB3aGVuIHRoZSBgZGF5c0luV2Vla2AgaW5wdXQgaXMgYWxzbyBzZXQgYXMgdGhlIGB2aWV3RGF0ZWAgd2lsbCBiZSB1c2VkIGFzIHRoZSBzdGFydCBvZiB0aGUgd2VlayBpbnN0ZWFkLlxyXG4gICAqIE5vdGUsIHlvdSBzaG91bGQgYWxzbyBwYXNzIHRoaXMgdG8gdGhlIGNhbGVuZGFyIHRpdGxlIHBpcGUgc28gaXQgc2hvd3MgdGhlIHNhbWUgZGF5czoge3sgdmlld0RhdGUgfCBjYWxlbmRhckRhdGU6KHZpZXcgKyAnVmlld1RpdGxlJyk6bG9jYWxlOndlZWtTdGFydHNPbiB9fVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdlZWtTdGFydHNPbjogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaGVhZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3Igd2VlayB2aWV3IGV2ZW50c1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgdGl0bGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IGFjdGlvbnNcclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHByZWNpc2lvbiB0byBkaXNwbGF5IGV2ZW50cy5cclxuICAgKiBgZGF5c2Agd2lsbCByb3VuZCBldmVudCBzdGFydCBhbmQgZW5kIGRhdGVzIHRvIHRoZSBuZWFyZXN0IGRheSBhbmQgYG1pbnV0ZXNgIHdpbGwgbm90IGRvIHRoaXMgcm91bmRpbmdcclxuICAgKi9cclxuICBASW5wdXQoKSBwcmVjaXNpb246ICdkYXlzJyB8ICdtaW51dGVzJyA9ICdkYXlzJztcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IGluZGljYXRlIHdoaWNoIGRheXMgYXJlIHdlZWtlbmRzXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2Vla2VuZERheXM6IG51bWJlcltdO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRvIHNuYXAgZXZlbnRzIHRvIGEgZ3JpZCB3aGVuIGRyYWdnaW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgc25hcERyYWdnZWRFdmVudHM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIGluIGFuIGhvdXIuIE11c3QgYmUgPD0gNlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBpbiBwaXhlbHMgb2YgZWFjaCBob3VyIHNlZ21lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgc3RhcnQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgc3RhcnQgbWludXRlcy4gTXVzdCBiZSAwLTU5XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyID0gMjM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgZW5kIG1pbnV0ZXMuIE11c3QgYmUgMC01OVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyID0gNTk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBob3VyIHNlZ21lbnRcclxuICAgKi9cclxuICBASW5wdXQoKSBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZ3JpZCBzaXplIHRvIHNuYXAgcmVzaXppbmcgYW5kIGRyYWdnaW5nIG9mIGhvdXJseSBldmVudHMgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBldmVudFNuYXBTaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgdGhlIGFsbCBkYXkgZXZlbnRzIGxhYmVsIHRleHRcclxuICAgKi9cclxuICBASW5wdXQoKSBhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBDYW4gYmUgdXNlZCB0byBjcmVhdGUgYSBzaG9ydGVyIG9yIGxvbmdlciB3ZWVrIHZpZXcuXHJcbiAgICogVGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayB3aWxsIGFsd2F5cyBiZSB0aGUgYHZpZXdEYXRlYCBhbmQgYHdlZWtTdGFydHNPbmAgaWYgc2V0IHdpbGwgYmUgaWdub3JlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgY3VycmVudCB0aW1lIG1hcmtlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGN1cnJlbnRUaW1lTWFya2VyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIGEgaGVhZGVyIHdlZWsgZGF5IGlzIGNsaWNrZWQuIEFkZGluZyBhIGBjc3NDbGFzc2AgcHJvcGVydHkgb24gYCRldmVudC5kYXlgIHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhlYWRlciBlbGVtZW50XHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgZGF5SGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgZGF5OiBXZWVrRGF5O1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQ7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRpdGxlIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xyXG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIHJlc2l6ZWQgb3IgZHJhZ2dlZCBhbmQgZHJvcHBlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGV2ZW50VGltZXNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgd2Vlay5cclxuICAgKiBJZiB5b3UgYWRkIHRoZSBgY3NzQ2xhc3NgIHByb3BlcnR5IHRvIGEgZGF5IGluIHRoZSBoZWFkZXIgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgY2VsbCBlbGVtZW50IGluIHRoZSB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIGJlZm9yZVZpZXdSZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gYW4gaG91ciBzZWdtZW50IGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBob3VyU2VnbWVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGRhdGU6IERhdGU7XHJcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZGF5czogV2Vla0RheVtdO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdmlldzogV2Vla1ZpZXc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBhbGxEYXlFdmVudFJlc2l6ZXM6IE1hcDxcclxuICAgIFdlZWtWaWV3QWxsRGF5RXZlbnQsXHJcbiAgICBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplXHJcbiAgPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRpbWVFdmVudFJlc2l6ZXM6IE1hcDxDYWxlbmRhckV2ZW50LCBSZXNpemVFdmVudD4gPSBuZXcgTWFwKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBldmVudERyYWdFbnRlckJ5VHlwZSA9IHtcclxuICAgIGFsbERheTogMCxcclxuICAgIHRpbWU6IDBcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZHJhZ0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZHJhZ0FscmVhZHlNb3ZlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdmFsaWRhdGVEcmFnOiBWYWxpZGF0ZURyYWc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB2YWxpZGF0ZVJlc2l6ZTogKGFyZ3M6IGFueSkgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGRheUNvbHVtbldpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBjYWxlbmRhcklkID0gU3ltYm9sKCdhbmd1bGFyIGNhbGVuZGFyIHdlZWsgdmlldyBpZCcpO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlID0gdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlO1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeUhvdXJTZWdtZW50ID0gdHJhY2tCeUhvdXJTZWdtZW50O1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeUhvdXIgPSB0cmFja0J5SG91cjtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQgPSB0cmFja0J5V2Vla0FsbERheUV2ZW50O1xyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdHJhY2tCeVdlZWtUaW1lRXZlbnQgPSB0cmFja0J5V2Vla1RpbWVFdmVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGFzdERyYWdFbnRlckRhdGU6IERhdGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB0cmFja0J5SG91ckNvbHVtbiA9IChpbmRleDogbnVtYmVyLCBjb2x1bW46IFdlZWtWaWV3SG91ckNvbHVtbikgPT5cclxuICAgIGNvbHVtbi5ob3Vyc1swXSA/IGNvbHVtbi5ob3Vyc1swXS5zZWdtZW50c1swXS5kYXRlLnRvSVNPU3RyaW5nKCkgOiBjb2x1bW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICB0cmFja0J5SWQgPSAoaW5kZXg6IG51bWJlciwgcm93OiBXZWVrVmlld0FsbERheUV2ZW50Um93KSA9PiByb3cuaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJvdGVjdGVkIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxyXG4gICAgQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nLFxyXG4gICAgcHJvdGVjdGVkIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlclxyXG4gICkge1xyXG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlZnJlc2hIZWFkZXIgPVxyXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XHJcbiAgICAgIGNoYW5nZXMuZXhjbHVkZURheXMgfHxcclxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cyB8fFxyXG4gICAgICBjaGFuZ2VzLmRheXNJbldlZWsgfHxcclxuICAgICAgY2hhbmdlcy53ZWVrU3RhcnRzT247XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaEJvZHkgPVxyXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHxcclxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5RW5kTWludXRlIHx8XHJcbiAgICAgIGNoYW5nZXMuaG91clNlZ21lbnRzIHx8XHJcbiAgICAgIGNoYW5nZXMud2Vla1N0YXJ0c09uIHx8XHJcbiAgICAgIGNoYW5nZXMud2Vla2VuZERheXMgfHxcclxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxyXG4gICAgICBjaGFuZ2VzLmhvdXJTZWdtZW50SGVpZ2h0IHx8XHJcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XHJcbiAgICAgIGNoYW5nZXMuZGF5c0luV2VlaztcclxuXHJcbiAgICBpZiAocmVmcmVzaEhlYWRlcikge1xyXG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcclxuICAgICAgdmFsaWRhdGVFdmVudHModGhpcy5ldmVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZWZyZXNoQm9keSkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlZnJlc2hIZWFkZXIgfHwgcmVmcmVzaEJvZHkpIHtcclxuICAgICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZXNpemVTdGFydGVkKGV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsIG1pbldpZHRoPzogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmRheUNvbHVtbldpZHRoID0gdGhpcy5nZXREYXlDb2x1bW5XaWR0aChldmVudHNDb250YWluZXIpO1xyXG4gICAgY29uc3QgcmVzaXplSGVscGVyOiBDYWxlbmRhclJlc2l6ZUhlbHBlciA9IG5ldyBDYWxlbmRhclJlc2l6ZUhlbHBlcihcclxuICAgICAgZXZlbnRzQ29udGFpbmVyLFxyXG4gICAgICBtaW5XaWR0aFxyXG4gICAgKTtcclxuICAgIHRoaXMudmFsaWRhdGVSZXNpemUgPSAoeyByZWN0YW5nbGUgfSkgPT5cclxuICAgICAgcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH0pO1xyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdGltZUV2ZW50UmVzaXplU3RhcnRlZChcclxuICAgIGV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsXHJcbiAgICB0aW1lRXZlbnQ6IFdlZWtWaWV3VGltZUV2ZW50LFxyXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpbWVFdmVudFJlc2l6ZXMuc2V0KHRpbWVFdmVudC5ldmVudCwgcmVzaXplRXZlbnQpO1xyXG4gICAgdGhpcy5yZXNpemVTdGFydGVkKGV2ZW50c0NvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdGltZUV2ZW50UmVzaXppbmcodGltZUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KSB7XHJcbiAgICB0aGlzLnRpbWVFdmVudFJlc2l6ZXMuc2V0KHRpbWVFdmVudC5ldmVudCwgcmVzaXplRXZlbnQpO1xyXG4gICAgY29uc3QgYWRqdXN0ZWRFdmVudHMgPSBuZXcgTWFwPENhbGVuZGFyRXZlbnQsIENhbGVuZGFyRXZlbnQ+KCk7XHJcblxyXG4gICAgY29uc3QgdGVtcEV2ZW50cyA9IFsuLi50aGlzLmV2ZW50c107XHJcblxyXG4gICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLmZvckVhY2goKGxhc3RSZXNpemVFdmVudCwgZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbmV3RXZlbnREYXRlcyA9IHRoaXMuZ2V0VGltZUV2ZW50UmVzaXplZERhdGVzKFxyXG4gICAgICAgIGV2ZW50LFxyXG4gICAgICAgIGxhc3RSZXNpemVFdmVudFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBhZGp1c3RlZEV2ZW50ID0geyAuLi5ldmVudCwgLi4ubmV3RXZlbnREYXRlcyB9O1xyXG4gICAgICBhZGp1c3RlZEV2ZW50cy5zZXQoYWRqdXN0ZWRFdmVudCwgZXZlbnQpO1xyXG4gICAgICBjb25zdCBldmVudEluZGV4ID0gdGVtcEV2ZW50cy5pbmRleE9mKGV2ZW50KTtcclxuICAgICAgdGVtcEV2ZW50c1tldmVudEluZGV4XSA9IGFkanVzdGVkRXZlbnQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlc3RvcmVPcmlnaW5hbEV2ZW50cyh0ZW1wRXZlbnRzLCBhZGp1c3RlZEV2ZW50cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgdGltZUV2ZW50UmVzaXplRW5kZWQodGltZUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCkge1xyXG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0aGlzLmV2ZW50cyk7XHJcbiAgICBjb25zdCBsYXN0UmVzaXplRXZlbnQgPSB0aGlzLnRpbWVFdmVudFJlc2l6ZXMuZ2V0KHRpbWVFdmVudC5ldmVudCk7XHJcbiAgICBpZiAobGFzdFJlc2l6ZUV2ZW50KSB7XHJcbiAgICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5kZWxldGUodGltZUV2ZW50LmV2ZW50KTtcclxuICAgICAgY29uc3QgbmV3RXZlbnREYXRlcyA9IHRoaXMuZ2V0VGltZUV2ZW50UmVzaXplZERhdGVzKFxyXG4gICAgICAgIHRpbWVFdmVudC5ldmVudCxcclxuICAgICAgICBsYXN0UmVzaXplRXZlbnRcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICBuZXdTdGFydDogbmV3RXZlbnREYXRlcy5zdGFydCxcclxuICAgICAgICBuZXdFbmQ6IG5ld0V2ZW50RGF0ZXMuZW5kLFxyXG4gICAgICAgIGV2ZW50OiB0aW1lRXZlbnQuZXZlbnQsXHJcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5SZXNpemVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgYWxsRGF5RXZlbnRSZXNpemVTdGFydGVkKFxyXG4gICAgYWxsRGF5RXZlbnRzQ29udGFpbmVyOiBIVE1MRWxlbWVudCxcclxuICAgIGFsbERheUV2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50LFxyXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5zZXQoYWxsRGF5RXZlbnQsIHtcclxuICAgICAgb3JpZ2luYWxPZmZzZXQ6IGFsbERheUV2ZW50Lm9mZnNldCxcclxuICAgICAgb3JpZ2luYWxTcGFuOiBhbGxEYXlFdmVudC5zcGFuLFxyXG4gICAgICBlZGdlOiB0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcgPyAnbGVmdCcgOiAncmlnaHQnXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVzaXplU3RhcnRlZChcclxuICAgICAgYWxsRGF5RXZlbnRzQ29udGFpbmVyLFxyXG4gICAgICB0aGlzLmdldERheUNvbHVtbldpZHRoKGFsbERheUV2ZW50c0NvbnRhaW5lcilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgYWxsRGF5RXZlbnRSZXNpemluZyhcclxuICAgIGFsbERheUV2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50LFxyXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50LFxyXG4gICAgZGF5V2lkdGg6IG51bWJlclxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogV2Vla1ZpZXdBbGxEYXlFdmVudFJlc2l6ZSA9IHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLmdldChcclxuICAgICAgYWxsRGF5RXZlbnRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5sZWZ0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBkaWZmOiBudW1iZXIgPSBNYXRoLnJvdW5kKCtyZXNpemVFdmVudC5lZGdlcy5sZWZ0IC8gZGF5V2lkdGgpO1xyXG4gICAgICBhbGxEYXlFdmVudC5vZmZzZXQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0ICsgZGlmZjtcclxuICAgICAgYWxsRGF5RXZlbnQuc3BhbiA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuIC0gZGlmZjtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnJpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBkaWZmOiBudW1iZXIgPSBNYXRoLnJvdW5kKCtyZXNpemVFdmVudC5lZGdlcy5yaWdodCAvIGRheVdpZHRoKTtcclxuICAgICAgYWxsRGF5RXZlbnQuc3BhbiA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuICsgZGlmZjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBhbGxEYXlFdmVudFJlc2l6ZUVuZGVkKGFsbERheUV2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBjdXJyZW50UmVzaXplOiBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplID0gdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuZ2V0KFxyXG4gICAgICBhbGxEYXlFdmVudFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFJlc2l6ZSkge1xyXG4gICAgICBjb25zdCBhbGxEYXlFdmVudFJlc2l6aW5nQmVmb3JlU3RhcnQgPSBjdXJyZW50UmVzaXplLmVkZ2UgPT09ICdsZWZ0JztcclxuICAgICAgbGV0IGRheXNEaWZmOiBudW1iZXI7XHJcbiAgICAgIGlmIChhbGxEYXlFdmVudFJlc2l6aW5nQmVmb3JlU3RhcnQpIHtcclxuICAgICAgICBkYXlzRGlmZiA9IGFsbERheUV2ZW50Lm9mZnNldCAtIGN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGF5c0RpZmYgPSBhbGxEYXlFdmVudC5zcGFuIC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFsbERheUV2ZW50Lm9mZnNldCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQ7XHJcbiAgICAgIGFsbERheUV2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbjtcclxuXHJcbiAgICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IGFsbERheUV2ZW50LmV2ZW50LnN0YXJ0O1xyXG4gICAgICBsZXQgbmV3RW5kOiBEYXRlID0gYWxsRGF5RXZlbnQuZXZlbnQuZW5kIHx8IGFsbERheUV2ZW50LmV2ZW50LnN0YXJ0O1xyXG4gICAgICBpZiAoYWxsRGF5RXZlbnRSZXNpemluZ0JlZm9yZVN0YXJ0KSB7XHJcbiAgICAgICAgbmV3U3RhcnQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxyXG4gICAgICAgICAgbmV3U3RhcnQsXHJcbiAgICAgICAgICBkYXlzRGlmZixcclxuICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0VuZCA9IGFkZERheXNXaXRoRXhjbHVzaW9ucyhcclxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgICBuZXdFbmQsXHJcbiAgICAgICAgICBkYXlzRGlmZixcclxuICAgICAgICAgIHRoaXMuZXhjbHVkZURheXNcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIG5ld1N0YXJ0LFxyXG4gICAgICAgIG5ld0VuZCxcclxuICAgICAgICBldmVudDogYWxsRGF5RXZlbnQuZXZlbnQsXHJcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5SZXNpemVcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLmRlbGV0ZShhbGxEYXlFdmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZ2V0RGF5Q29sdW1uV2lkdGgoZXZlbnRSb3dDb250YWluZXI6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKGV2ZW50Um93Q29udGFpbmVyLm9mZnNldFdpZHRoIC8gdGhpcy5kYXlzLmxlbmd0aCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaGlkZGVuXHJcbiAgICovXHJcbiAgZGF0ZURyYWdFbnRlcihkYXRlOiBEYXRlKSB7XHJcbiAgICB0aGlzLmxhc3REcmFnRW50ZXJEYXRlID0gZGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBldmVudERyb3BwZWQoXHJcbiAgICBkcm9wRXZlbnQ6IERyb3BFdmVudDx7IGV2ZW50PzogQ2FsZW5kYXJFdmVudDsgY2FsZW5kYXJJZD86IHN5bWJvbCB9PixcclxuICAgIGRhdGU6IERhdGUsXHJcbiAgICBhbGxEYXk6IGJvb2xlYW5cclxuICApOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgc2hvdWxkRmlyZURyb3BwZWRFdmVudChkcm9wRXZlbnQsIGRhdGUsIGFsbERheSwgdGhpcy5jYWxlbmRhcklkKSAmJlxyXG4gICAgICB0aGlzLmxhc3REcmFnRW50ZXJEYXRlLmdldFRpbWUoKSA9PT0gZGF0ZS5nZXRUaW1lKClcclxuICAgICkge1xyXG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuRHJvcCxcclxuICAgICAgICBldmVudDogZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50LFxyXG4gICAgICAgIG5ld1N0YXJ0OiBkYXRlLFxyXG4gICAgICAgIGFsbERheVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBkcmFnRW50ZXIodHlwZTogJ2FsbERheScgfCAndGltZScpIHtcclxuICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGVbdHlwZV0rKztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBkcmFnTGVhdmUodHlwZTogJ2FsbERheScgfCAndGltZScpIHtcclxuICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGVbdHlwZV0tLTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBkcmFnU3RhcnRlZChcclxuICAgIGV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsXHJcbiAgICBldmVudDogSFRNTEVsZW1lbnQsXHJcbiAgICBkYXlFdmVudD86IFdlZWtWaWV3VGltZUV2ZW50XHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLmRheUNvbHVtbldpZHRoID0gdGhpcy5nZXREYXlDb2x1bW5XaWR0aChldmVudHNDb250YWluZXIpO1xyXG4gICAgY29uc3QgZHJhZ0hlbHBlcjogQ2FsZW5kYXJEcmFnSGVscGVyID0gbmV3IENhbGVuZGFyRHJhZ0hlbHBlcihcclxuICAgICAgZXZlbnRzQ29udGFpbmVyLFxyXG4gICAgICBldmVudFxyXG4gICAgKTtcclxuICAgIHRoaXMudmFsaWRhdGVEcmFnID0gKHsgeCwgeSwgdHJhbnNmb3JtIH0pID0+XHJcbiAgICAgIHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLnNpemUgPT09IDAgJiZcclxuICAgICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDAgJiZcclxuICAgICAgZHJhZ0hlbHBlci52YWxpZGF0ZURyYWcoe1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICBzbmFwRHJhZ2dlZEV2ZW50czogdGhpcy5zbmFwRHJhZ2dlZEV2ZW50cyxcclxuICAgICAgICBkcmFnQWxyZWFkeU1vdmVkOiB0aGlzLmRyYWdBbHJlYWR5TW92ZWQsXHJcbiAgICAgICAgdHJhbnNmb3JtXHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5kcmFnQWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudERyYWdFbnRlckJ5VHlwZSA9IHtcclxuICAgICAgYWxsRGF5OiAwLFxyXG4gICAgICB0aW1lOiAwXHJcbiAgICB9O1xyXG4gICAgaWYgKCF0aGlzLnNuYXBEcmFnZ2VkRXZlbnRzICYmIGRheUV2ZW50KSB7XHJcbiAgICAgIHRoaXMudmlldy5ob3VyQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua2VkRXZlbnQgPSBjb2x1bW4uZXZlbnRzLmZpbmQoXHJcbiAgICAgICAgICBjb2x1bW5FdmVudCA9PlxyXG4gICAgICAgICAgICBjb2x1bW5FdmVudC5ldmVudCA9PT0gZGF5RXZlbnQuZXZlbnQgJiYgY29sdW1uRXZlbnQgIT09IGRheUV2ZW50XHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBoaWRlIGFueSBsaW5rZWQgZXZlbnRzIHdoaWxlIGRyYWdnaW5nXHJcbiAgICAgICAgaWYgKGxpbmtlZEV2ZW50KSB7XHJcbiAgICAgICAgICBsaW5rZWRFdmVudC53aWR0aCA9IDA7XHJcbiAgICAgICAgICBsaW5rZWRFdmVudC5oZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBoaWRkZW5cclxuICAgKi9cclxuICBkcmFnTW92ZShkYXlFdmVudDogV2Vla1ZpZXdUaW1lRXZlbnQsIGRyYWdFdmVudDogRHJhZ01vdmVFdmVudCkge1xyXG4gICAgaWYgKHRoaXMuc25hcERyYWdnZWRFdmVudHMpIHtcclxuICAgICAgY29uc3QgbmV3RXZlbnRUaW1lcyA9IHRoaXMuZ2V0RHJhZ01vdmVkRXZlbnRUaW1lcyhcclxuICAgICAgICBkYXlFdmVudCxcclxuICAgICAgICBkcmFnRXZlbnQsXHJcbiAgICAgICAgdGhpcy5kYXlDb2x1bW5XaWR0aCxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBkYXlFdmVudC5ldmVudDtcclxuICAgICAgY29uc3QgYWRqdXN0ZWRFdmVudCA9IHsgLi4ub3JpZ2luYWxFdmVudCwgLi4ubmV3RXZlbnRUaW1lcyB9O1xyXG4gICAgICBjb25zdCB0ZW1wRXZlbnRzID0gdGhpcy5ldmVudHMubWFwKGV2ZW50ID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQgPT09IG9yaWdpbmFsRXZlbnQpIHtcclxuICAgICAgICAgIHJldHVybiBhZGp1c3RlZEV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnJlc3RvcmVPcmlnaW5hbEV2ZW50cyhcclxuICAgICAgICB0ZW1wRXZlbnRzLFxyXG4gICAgICAgIG5ldyBNYXAoW1thZGp1c3RlZEV2ZW50LCBvcmlnaW5hbEV2ZW50XV0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyYWdBbHJlYWR5TW92ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGFsbERheUV2ZW50RHJhZ01vdmUoKSB7XHJcbiAgICB0aGlzLmRyYWdBbHJlYWR5TW92ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGhpZGRlblxyXG4gICAqL1xyXG4gIGRyYWdFbmRlZChcclxuICAgIHdlZWtFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCB8IFdlZWtWaWV3VGltZUV2ZW50LFxyXG4gICAgZHJhZ0VuZEV2ZW50OiBEcmFnRW5kRXZlbnQsXHJcbiAgICBkYXlXaWR0aDogbnVtYmVyLFxyXG4gICAgdXNlWSA9IGZhbHNlXHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXcgPSB0aGlzLmdldFdlZWtWaWV3KHRoaXMuZXZlbnRzKTtcclxuICAgIHRoaXMuZHJhZ0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSB0aGlzLmdldERyYWdNb3ZlZEV2ZW50VGltZXMoXHJcbiAgICAgIHdlZWtFdmVudCxcclxuICAgICAgZHJhZ0VuZEV2ZW50LFxyXG4gICAgICBkYXlXaWR0aCxcclxuICAgICAgdXNlWVxyXG4gICAgKTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5ldmVudERyYWdFbnRlckJ5VHlwZVt1c2VZID8gJ3RpbWUnIDogJ2FsbERheSddID4gMCAmJlxyXG4gICAgICBpc0RyYWdnZWRXaXRoaW5QZXJpb2Qoc3RhcnQsIGVuZCwgdGhpcy52aWV3LnBlcmlvZClcclxuICAgICkge1xyXG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIG5ld1N0YXJ0OiBzdGFydCxcclxuICAgICAgICBuZXdFbmQ6IGVuZCxcclxuICAgICAgICBldmVudDogd2Vla0V2ZW50LmV2ZW50LFxyXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuRHJhZyxcclxuICAgICAgICBhbGxEYXk6ICF1c2VZXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlZnJlc2hIZWFkZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRheXMgPSB0aGlzLnV0aWxzLmdldFdlZWtWaWV3SGVhZGVyKHtcclxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXHJcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXHJcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxyXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcclxuICAgICAgLi4uZ2V0V2Vla1ZpZXdQZXJpb2QoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICAgIHRoaXMud2Vla1N0YXJ0c09uLFxyXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICAgICAgdGhpcy5kYXlzSW5XZWVrXHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xyXG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0aGlzLmV2ZW50cyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVmcmVzaEFsbCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xyXG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xyXG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGF5cyAmJiB0aGlzLnZpZXcpIHtcclxuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xyXG4gICAgICAgIGhlYWRlcjogdGhpcy5kYXlzLFxyXG4gICAgICAgIC4uLnRoaXMudmlld1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRXZWVrVmlldyhldmVudHM6IENhbGVuZGFyRXZlbnRbXSkge1xyXG4gICAgcmV0dXJuIHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXcoe1xyXG4gICAgICBldmVudHMsXHJcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxyXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcclxuICAgICAgcHJlY2lzaW9uOiB0aGlzLnByZWNpc2lvbixcclxuICAgICAgYWJzb2x1dGVQb3NpdGlvbmVkRXZlbnRzOiB0cnVlLFxyXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICBkYXlTdGFydDoge1xyXG4gICAgICAgIGhvdXI6IHRoaXMuZGF5U3RhcnRIb3VyLFxyXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZVxyXG4gICAgICB9LFxyXG4gICAgICBkYXlFbmQ6IHtcclxuICAgICAgICBob3VyOiB0aGlzLmRheUVuZEhvdXIsXHJcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZVxyXG4gICAgICB9LFxyXG4gICAgICBzZWdtZW50SGVpZ2h0OiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxyXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcclxuICAgICAgLi4uZ2V0V2Vla1ZpZXdQZXJpb2QoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICB0aGlzLnZpZXdEYXRlLFxyXG4gICAgICAgIHRoaXMud2Vla1N0YXJ0c09uLFxyXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXMsXHJcbiAgICAgICAgdGhpcy5kYXlzSW5XZWVrXHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERyYWdNb3ZlZEV2ZW50VGltZXMoXHJcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudCxcclxuICAgIGRyYWdFbmRFdmVudDogRHJhZ0VuZEV2ZW50IHwgRHJhZ01vdmVFdmVudCxcclxuICAgIGRheVdpZHRoOiBudW1iZXIsXHJcbiAgICB1c2VZOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBjb25zdCBkYXlzRHJhZ2dlZCA9IHJvdW5kVG9OZWFyZXN0KGRyYWdFbmRFdmVudC54LCBkYXlXaWR0aCkgLyBkYXlXaWR0aDtcclxuICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IHVzZVlcclxuICAgICAgPyBnZXRNaW51dGVzTW92ZWQoXHJcbiAgICAgICAgICBkcmFnRW5kRXZlbnQueSxcclxuICAgICAgICAgIHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICAgICAgdGhpcy5ob3VyU2VnbWVudEhlaWdodCxcclxuICAgICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxyXG4gICAgICAgIClcclxuICAgICAgOiAwO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKFxyXG4gICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICB3ZWVrRXZlbnQuZXZlbnQuc3RhcnQsXHJcbiAgICAgICAgZGF5c0RyYWdnZWQsXHJcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xyXG4gICAgICApLFxyXG4gICAgICBtaW51dGVzTW92ZWRcclxuICAgICk7XHJcbiAgICBsZXQgZW5kOiBEYXRlO1xyXG4gICAgaWYgKHdlZWtFdmVudC5ldmVudC5lbmQpIHtcclxuICAgICAgZW5kID0gdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKFxyXG4gICAgICAgIGFkZERheXNXaXRoRXhjbHVzaW9ucyhcclxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXHJcbiAgICAgICAgICB3ZWVrRXZlbnQuZXZlbnQuZW5kLFxyXG4gICAgICAgICAgZGF5c0RyYWdnZWQsXHJcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICAgKSxcclxuICAgICAgICBtaW51dGVzTW92ZWRcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBzdGFydCwgZW5kIH07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVzdG9yZU9yaWdpbmFsRXZlbnRzKFxyXG4gICAgdGVtcEV2ZW50czogQ2FsZW5kYXJFdmVudFtdLFxyXG4gICAgYWRqdXN0ZWRFdmVudHM6IE1hcDxDYWxlbmRhckV2ZW50LCBDYWxlbmRhckV2ZW50PlxyXG4gICkge1xyXG4gICAgY29uc3QgcHJldmlvdXNWaWV3ID0gdGhpcy52aWV3O1xyXG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0ZW1wRXZlbnRzKTtcclxuICAgIGNvbnN0IGFkanVzdGVkRXZlbnRzQXJyYXkgPSB0ZW1wRXZlbnRzLmZpbHRlcihldmVudCA9PlxyXG4gICAgICBhZGp1c3RlZEV2ZW50cy5oYXMoZXZlbnQpXHJcbiAgICApO1xyXG4gICAgdGhpcy52aWV3LmhvdXJDb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgY29sdW1uSW5kZXgpID0+IHtcclxuICAgICAgcHJldmlvdXNWaWV3LmhvdXJDb2x1bW5zW2NvbHVtbkluZGV4XS5ob3Vycy5mb3JFYWNoKChob3VyLCBob3VySW5kZXgpID0+IHtcclxuICAgICAgICBob3VyLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIHNlZ21lbnRJbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29sdW1uLmhvdXJzW2hvdXJJbmRleF0uc2VnbWVudHNbc2VnbWVudEluZGV4XS5jc3NDbGFzcyA9XHJcbiAgICAgICAgICAgIHNlZ21lbnQuY3NzQ2xhc3M7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBhZGp1c3RlZEV2ZW50c0FycmF5LmZvckVhY2goYWRqdXN0ZWRFdmVudCA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGFkanVzdGVkRXZlbnRzLmdldChhZGp1c3RlZEV2ZW50KTtcclxuICAgICAgICBjb25zdCBleGlzdGluZ0NvbHVtbkV2ZW50ID0gY29sdW1uLmV2ZW50cy5maW5kKFxyXG4gICAgICAgICAgY29sdW1uRXZlbnQgPT4gY29sdW1uRXZlbnQuZXZlbnQgPT09IGFkanVzdGVkRXZlbnRcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChleGlzdGluZ0NvbHVtbkV2ZW50KSB7XHJcbiAgICAgICAgICAvLyByZXN0b3JlIHRoZSBvcmlnaW5hbCBldmVudCBzbyB0cmFja0J5IGtpY2tzIGluIGFuZCB0aGUgZG9tIGlzbid0IGNoYW5nZWRcclxuICAgICAgICAgIGV4aXN0aW5nQ29sdW1uRXZlbnQuZXZlbnQgPSBvcmlnaW5hbEV2ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBhZGQgYSBkdW1teSBldmVudCB0byB0aGUgZHJvcCBzbyBpZiB0aGUgZXZlbnQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgb3JpZ2luYWwgY29sdW1uIHRoZSBkcmFnIGRvZXNuJ3QgZW5kIGVhcmx5XHJcbiAgICAgICAgICBjb2x1bW4uZXZlbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBldmVudDogb3JpZ2luYWxFdmVudCxcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBzdGFydHNCZWZvcmVEYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbmRzQWZ0ZXJEYXk6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBhZGp1c3RlZEV2ZW50cy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcclxuICAgIGNhbGVuZGFyRXZlbnQ6IENhbGVuZGFyRXZlbnQsXHJcbiAgICByZXNpemVFdmVudDogUmVzaXplRXZlbnRcclxuICApIHtcclxuICAgIGNvbnN0IG1pbmltdW1FdmVudEhlaWdodCA9IGdldE1pbmltdW1FdmVudEhlaWdodEluTWludXRlcyhcclxuICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXHJcbiAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHRcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXdFdmVudERhdGVzID0ge1xyXG4gICAgICBzdGFydDogY2FsZW5kYXJFdmVudC5zdGFydCxcclxuICAgICAgZW5kOiBnZXREZWZhdWx0RXZlbnRFbmQoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICBjYWxlbmRhckV2ZW50LFxyXG4gICAgICAgIG1pbmltdW1FdmVudEhlaWdodFxyXG4gICAgICApXHJcbiAgICB9O1xyXG4gICAgY29uc3QgeyBlbmQsIC4uLmV2ZW50V2l0aG91dEVuZCB9ID0gY2FsZW5kYXJFdmVudDtcclxuICAgIGNvbnN0IHNtYWxsZXN0UmVzaXplcyA9IHtcclxuICAgICAgc3RhcnQ6IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcclxuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCxcclxuICAgICAgICBtaW5pbXVtRXZlbnRIZWlnaHQgKiAtMVxyXG4gICAgICApLFxyXG4gICAgICBlbmQ6IGdldERlZmF1bHRFdmVudEVuZChcclxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxyXG4gICAgICAgIGV2ZW50V2l0aG91dEVuZCxcclxuICAgICAgICBtaW5pbXVtRXZlbnRIZWlnaHRcclxuICAgICAgKVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGRheXNEaWZmID0gTWF0aC5yb3VuZChcclxuICAgICAgICArcmVzaXplRXZlbnQuZWRnZXMubGVmdCAvIHRoaXMuZGF5Q29sdW1uV2lkdGhcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbmV3U3RhcnQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0LFxyXG4gICAgICAgIGRheXNEaWZmLFxyXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXNcclxuICAgICAgKTtcclxuICAgICAgaWYgKG5ld1N0YXJ0IDwgc21hbGxlc3RSZXNpemVzLnN0YXJ0KSB7XHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5zdGFydCA9IG5ld1N0YXJ0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQgPSBzbWFsbGVzdFJlc2l6ZXMuc3RhcnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnJpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBkYXlzRGlmZiA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgK3Jlc2l6ZUV2ZW50LmVkZ2VzLnJpZ2h0IC8gdGhpcy5kYXlDb2x1bW5XaWR0aFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBuZXdFbmQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXHJcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcclxuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCxcclxuICAgICAgICBkYXlzRGlmZixcclxuICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChuZXdFbmQgPiBzbWFsbGVzdFJlc2l6ZXMuZW5kKSB7XHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBuZXdFbmQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBzbWFsbGVzdFJlc2l6ZXMuZW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy50b3AgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcclxuICAgICAgICByZXNpemVFdmVudC5lZGdlcy50b3AgYXMgbnVtYmVyLFxyXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXHJcbiAgICAgICAgdGhpcy5ldmVudFNuYXBTaXplXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKFxyXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQsXHJcbiAgICAgICAgbWludXRlc01vdmVkXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChuZXdTdGFydCA8IHNtYWxsZXN0UmVzaXplcy5zdGFydCkge1xyXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQgPSBuZXdTdGFydDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gc21hbGxlc3RSZXNpemVzLnN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5ib3R0b20gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcclxuICAgICAgICByZXNpemVFdmVudC5lZGdlcy5ib3R0b20gYXMgbnVtYmVyLFxyXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRzLFxyXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXHJcbiAgICAgICAgdGhpcy5ldmVudFNuYXBTaXplXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcclxuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCxcclxuICAgICAgICBtaW51dGVzTW92ZWRcclxuICAgICAgKTtcclxuICAgICAgaWYgKG5ld0VuZCA+IHNtYWxsZXN0UmVzaXplcy5lbmQpIHtcclxuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCA9IG5ld0VuZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCA9IHNtYWxsZXN0UmVzaXplcy5lbmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3RXZlbnREYXRlcztcclxuICB9XHJcbn1cclxuIl19