import * as tslib_1 from "tslib";
import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
let KeydownEnterDirective = class KeydownEnterDirective {
    constructor() {
        this.keydown = new EventEmitter(); // tslint:disable-line
    }
    onKeyPress(event) {
        if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.keydown.emit(event);
        }
    }
};
tslib_1.__decorate([
    Output('mwlKeydownEnter'),
    tslib_1.__metadata("design:type", Object)
], KeydownEnterDirective.prototype, "keydown", void 0);
tslib_1.__decorate([
    HostListener('keydown', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [KeyboardEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], KeydownEnterDirective.prototype, "onKeyPress", null);
KeydownEnterDirective = tslib_1.__decorate([
    Directive({
        selector: '[mwlKeydownEnter]'
    })
], KeydownEnterDirective);
export { KeydownEnterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24va2V5ZG93bi1lbnRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLOUUsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFIbEM7UUFJNkIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDLENBQUMsc0JBQXNCO0lBVWhHLENBQUM7SUFQQyxVQUFVLENBQUMsS0FBb0I7UUFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtZQUN2RSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFWNEI7SUFBMUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDOztzREFBNkM7QUFHdkU7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUNsQixhQUFhOzt1REFNOUI7QUFWVSxxQkFBcUI7SUFIakMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0dBQ1cscUJBQXFCLENBV2pDO1NBWFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttd2xLZXlkb3duRW50ZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgS2V5ZG93bkVudGVyRGlyZWN0aXZlIHtcclxuICBAT3V0cHV0KCdtd2xLZXlkb3duRW50ZXInKSBrZXlkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PigpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uS2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC53aGljaCA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLmtleWRvd24uZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==