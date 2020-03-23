import { isInside, isWithinThreshold } from './util';
var CalendarDragHelper = /** @class */ (function () {
    function CalendarDragHelper(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    CalendarDragHelper.prototype.validateDrag = function (_a) {
        var x = _a.x, y = _a.y, snapDraggedEvents = _a.snapDraggedEvents, dragAlreadyMoved = _a.dragAlreadyMoved, transform = _a.transform;
        if (snapDraggedEvents) {
            var newRect = Object.assign({}, this.startPosition, {
                left: this.startPosition.left + transform.x,
                right: this.startPosition.right + transform.x,
                top: this.startPosition.top + transform.y,
                bottom: this.startPosition.bottom + transform.y
            });
            return ((isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved) &&
                isInside(this.dragContainerElement.getBoundingClientRect(), newRect));
        }
        else {
            return isWithinThreshold({ x: x, y: y }) || dragAlreadyMoved;
        }
    };
    return CalendarDragHelper;
}());
export { CalendarDragHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUdyRDtJQUdFLDRCQUNVLG9CQUFpQyxFQUN6QyxnQkFBNkI7UUFEckIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFhO1FBR3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQseUNBQVksR0FBWixVQUFhLEVBWVo7WUFYQyxRQUFDLEVBQ0QsUUFBQyxFQUNELHdDQUFpQixFQUNqQixzQ0FBZ0IsRUFDaEIsd0JBQVM7UUFRVCxJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLElBQU0sT0FBTyxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztnQkFDM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQ0wsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUNyRSxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8saUJBQWlCLENBQUMsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLElBQUksZ0JBQWdCLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNJbnNpZGUsIGlzV2l0aGluVGhyZXNob2xkIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHsgVmFsaWRhdGVEcmFnUGFyYW1zIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRyYWdIZWxwZXIge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnRQb3NpdGlvbjogQ2xpZW50UmVjdDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRyYWdDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCxcclxuICAgIGRyYWdnYWJsZUVsZW1lbnQ6IEhUTUxFbGVtZW50XHJcbiAgKSB7XHJcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBkcmFnZ2FibGVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGVEcmFnKHtcclxuICAgIHgsXHJcbiAgICB5LFxyXG4gICAgc25hcERyYWdnZWRFdmVudHMsXHJcbiAgICBkcmFnQWxyZWFkeU1vdmVkLFxyXG4gICAgdHJhbnNmb3JtXHJcbiAgfToge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgc25hcERyYWdnZWRFdmVudHM6IGJvb2xlYW47XHJcbiAgICBkcmFnQWxyZWFkeU1vdmVkOiBib29sZWFuO1xyXG4gICAgdHJhbnNmb3JtOiBWYWxpZGF0ZURyYWdQYXJhbXNbJ3RyYW5zZm9ybSddO1xyXG4gIH0pOiBib29sZWFuIHtcclxuICAgIGlmIChzbmFwRHJhZ2dlZEV2ZW50cykge1xyXG4gICAgICBjb25zdCBuZXdSZWN0OiBDbGllbnRSZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGFydFBvc2l0aW9uLCB7XHJcbiAgICAgICAgbGVmdDogdGhpcy5zdGFydFBvc2l0aW9uLmxlZnQgKyB0cmFuc2Zvcm0ueCxcclxuICAgICAgICByaWdodDogdGhpcy5zdGFydFBvc2l0aW9uLnJpZ2h0ICsgdHJhbnNmb3JtLngsXHJcbiAgICAgICAgdG9wOiB0aGlzLnN0YXJ0UG9zaXRpb24udG9wICsgdHJhbnNmb3JtLnksXHJcbiAgICAgICAgYm90dG9tOiB0aGlzLnN0YXJ0UG9zaXRpb24uYm90dG9tICsgdHJhbnNmb3JtLnlcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIChpc1dpdGhpblRocmVzaG9sZCh7IHgsIHkgfSkgfHwgZHJhZ0FscmVhZHlNb3ZlZCkgJiZcclxuICAgICAgICBpc0luc2lkZSh0aGlzLmRyYWdDb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBuZXdSZWN0KVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGlzV2l0aGluVGhyZXNob2xkKHsgeCwgeSB9KSB8fCBkcmFnQWxyZWFkeU1vdmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=