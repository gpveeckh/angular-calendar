/**
 * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
 *
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
 *
 * @Injectable()
 * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
 *
 *   month(event: CalendarEvent): string {
 *     return `Custom prefix: ${event.title}`;
 *   }
 *
 * }
 *
 * // in your component
 * providers: [{
 *  provide: CalendarEventTitleFormatter,
 *  useClass: CustomEventTitleFormatter
 * }]
 * ```
 */
export class CalendarEventTitleFormatter {
    /**
     * The month view event title.
     */
    month(event, title) {
        return event.title;
    }
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    monthTooltip(event, title) {
        return event.title;
    }
    /**
     * The week view event title.
     */
    week(event, title) {
        return event.title;
    }
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    weekTooltip(event, title) {
        return event.title;
    }
    /**
     * The day view event title.
     */
    day(event, title) {
        return event.title;
    }
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    dayTooltip(event, title) {
        return event.title;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlLWZvcm1hdHRlci5wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sT0FBTywyQkFBMkI7SUFDdEM7O09BRUc7SUFDSCxLQUFLLENBQUMsS0FBb0IsRUFBRSxLQUFhO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZLENBQUMsS0FBb0IsRUFBRSxLQUFhO1FBQzlDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsS0FBb0IsRUFBRSxLQUFhO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBb0IsRUFBRSxLQUFhO1FBQzdDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxHQUFHLENBQUMsS0FBb0IsRUFBRSxLQUFhO1FBQ3JDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVLENBQUMsS0FBb0IsRUFBRSxLQUFhO1FBQzVDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNyQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgYWxsIGV2ZW50IHRpdGxlcyB3aXRoaW4gdGhlIGNhbGVuZGFyLiBZb3UgbWF5IG92ZXJyaWRlIGFueSBvZiBpdHMgbWV0aG9kcyB2aWEgYW5ndWxhcnMgREkgdG8gc3VpdCB5b3VyIHJlcXVpcmVtZW50cy4gRm9yIGV4YW1wbGU6XHJcbiAqXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4gKiBpbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsIENhbGVuZGFyRXZlbnQgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcclxuICpcclxuICogQEluamVjdGFibGUoKVxyXG4gKiBjbGFzcyBDdXN0b21FdmVudFRpdGxlRm9ybWF0dGVyIGV4dGVuZHMgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIHtcclxuICpcclxuICogICBtb250aChldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XHJcbiAqICAgICByZXR1cm4gYEN1c3RvbSBwcmVmaXg6ICR7ZXZlbnQudGl0bGV9YDtcclxuICogICB9XHJcbiAqXHJcbiAqIH1cclxuICpcclxuICogLy8gaW4geW91ciBjb21wb25lbnRcclxuICogcHJvdmlkZXJzOiBbe1xyXG4gKiAgcHJvdmlkZTogQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxyXG4gKiAgdXNlQ2xhc3M6IEN1c3RvbUV2ZW50VGl0bGVGb3JtYXR0ZXJcclxuICogfV1cclxuICogYGBgXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIHtcclxuICAvKipcclxuICAgKiBUaGUgbW9udGggdmlldyBldmVudCB0aXRsZS5cclxuICAgKi9cclxuICBtb250aChldmVudDogQ2FsZW5kYXJFdmVudCwgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbW9udGggdmlldyBldmVudCB0b29sdGlwLiBSZXR1cm4gYSBmYWxzZXkgdmFsdWUgZnJvbSB0aGlzIHRvIGRpc2FibGUgdGhlIHRvb2x0aXAuXHJcbiAgICovXHJcbiAgbW9udGhUb29sdGlwKGV2ZW50OiBDYWxlbmRhckV2ZW50LCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBldmVudC50aXRsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3ZWVrIHZpZXcgZXZlbnQgdGl0bGUuXHJcbiAgICovXHJcbiAgd2VlayhldmVudDogQ2FsZW5kYXJFdmVudCwgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgd2VlayB2aWV3IGV2ZW50IHRvb2x0aXAuIFJldHVybiBhIGZhbHNleSB2YWx1ZSBmcm9tIHRoaXMgdG8gZGlzYWJsZSB0aGUgdG9vbHRpcC5cclxuICAgKi9cclxuICB3ZWVrVG9vbHRpcChldmVudDogQ2FsZW5kYXJFdmVudCwgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGF5IHZpZXcgZXZlbnQgdGl0bGUuXHJcbiAgICovXHJcbiAgZGF5KGV2ZW50OiBDYWxlbmRhckV2ZW50LCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBldmVudC50aXRsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkYXkgdmlldyBldmVudCB0b29sdGlwLiBSZXR1cm4gYSBmYWxzZXkgdmFsdWUgZnJvbSB0aGlzIHRvIGRpc2FibGUgdGhlIHRvb2x0aXAuXHJcbiAgICovXHJcbiAgZGF5VG9vbHRpcChldmVudDogQ2FsZW5kYXJFdmVudCwgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==