import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { getMonthView, getWeekViewHeader, getWeekView } from 'calendar-utils';
import { DateAdapter } from '../../date-adapters/date-adapter';
var CalendarUtils = /** @class */ (function () {
    function CalendarUtils(dateAdapter) {
        this.dateAdapter = dateAdapter;
    }
    CalendarUtils.prototype.getMonthView = function (args) {
        return getMonthView(this.dateAdapter, args);
    };
    CalendarUtils.prototype.getWeekViewHeader = function (args) {
        return getWeekViewHeader(this.dateAdapter, args);
    };
    CalendarUtils.prototype.getWeekView = function (args) {
        return getWeekView(this.dateAdapter, args);
    };
    CalendarUtils.ctorParameters = function () { return [
        { type: DateAdapter }
    ]; };
    CalendarUtils = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [DateAdapter])
    ], CalendarUtils);
    return CalendarUtils;
}());
export { CalendarUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdXRpbHMucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQU9MLFlBQVksRUFDWixpQkFBaUIsRUFDakIsV0FBVyxFQUNaLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRy9EO0lBQ0UsdUJBQXNCLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUVsRCxvQ0FBWSxHQUFaLFVBQWEsSUFBc0I7UUFDakMsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQseUNBQWlCLEdBQWpCLFVBQWtCLElBQTJCO1FBQzNDLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLElBQXFCO1FBQy9CLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Z0JBWmtDLFdBQVc7O0lBRG5DLGFBQWE7UUFEekIsVUFBVSxFQUFFO2lEQUV3QixXQUFXO09BRG5DLGFBQWEsQ0FjekI7SUFBRCxvQkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgR2V0TW9udGhWaWV3QXJncyxcclxuICBNb250aFZpZXcsXHJcbiAgR2V0V2Vla1ZpZXdIZWFkZXJBcmdzLFxyXG4gIFdlZWtEYXksXHJcbiAgR2V0V2Vla1ZpZXdBcmdzLFxyXG4gIFdlZWtWaWV3LFxyXG4gIGdldE1vbnRoVmlldyxcclxuICBnZXRXZWVrVmlld0hlYWRlcixcclxuICBnZXRXZWVrVmlld1xyXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclV0aWxzIHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyKSB7fVxyXG5cclxuICBnZXRNb250aFZpZXcoYXJnczogR2V0TW9udGhWaWV3QXJncyk6IE1vbnRoVmlldyB7XHJcbiAgICByZXR1cm4gZ2V0TW9udGhWaWV3KHRoaXMuZGF0ZUFkYXB0ZXIsIGFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2Vla1ZpZXdIZWFkZXIoYXJnczogR2V0V2Vla1ZpZXdIZWFkZXJBcmdzKTogV2Vla0RheVtdIHtcclxuICAgIHJldHVybiBnZXRXZWVrVmlld0hlYWRlcih0aGlzLmRhdGVBZGFwdGVyLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIGdldFdlZWtWaWV3KGFyZ3M6IEdldFdlZWtWaWV3QXJncyk6IFdlZWtWaWV3IHtcclxuICAgIHJldHVybiBnZXRXZWVrVmlldyh0aGlzLmRhdGVBZGFwdGVyLCBhcmdzKTtcclxuICB9XHJcbn1cclxuIl19