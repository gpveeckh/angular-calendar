import * as tslib_1 from "tslib";
import { Directive, Renderer2, ElementRef, OnInit, OnDestroy, Output, EventEmitter, Inject, Input, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let ClickDirective = class ClickDirective {
    constructor(renderer, elm, document) {
        this.renderer = renderer;
        this.elm = elm;
        this.document = document;
        this.clickListenerDisabled = false;
        this.click = new EventEmitter(); // tslint:disable-line
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        if (!this.clickListenerDisabled) {
            this.listen()
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.stopPropagation();
                this.click.emit(event);
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    listen() {
        return new Observable(observer => {
            return this.renderer.listen(this.elm.nativeElement, 'click', event => {
                observer.next(event);
            });
        });
    }
};
ClickDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ClickDirective.prototype, "clickListenerDisabled", void 0);
tslib_1.__decorate([
    Output('mwlClick'),
    tslib_1.__metadata("design:type", Object)
], ClickDirective.prototype, "click", void 0);
ClickDirective = tslib_1.__decorate([
    Directive({
        selector: '[mwlClick]'
    }),
    tslib_1.__param(2, Inject(DOCUMENT)),
    tslib_1.__metadata("design:paramtypes", [Renderer2,
        ElementRef, Object])
], ClickDirective);
export { ClickDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzNDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFPekIsWUFDVSxRQUFtQixFQUNuQixHQUE0QixFQUNWLFFBQVE7UUFGMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUF5QjtRQUNWLGFBQVEsR0FBUixRQUFRLENBQUE7UUFUM0IsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBRW5CLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDLENBQUMsc0JBQXNCO1FBRTFFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBTTlCLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFO2lCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QixTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sTUFBTTtRQUNaLE9BQU8sSUFBSSxVQUFVLENBQWEsUUFBUSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ25FLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBOztZQTNCcUIsU0FBUztZQUNkLFVBQVU7NENBQ3RCLE1BQU0sU0FBQyxRQUFROztBQVRUO0lBQVIsS0FBSyxFQUFFOzs2REFBK0I7QUFFbkI7SUFBbkIsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7NkNBQXdDO0FBSGhELGNBQWM7SUFIMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7S0FDdkIsQ0FBQztJQVdHLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTs2Q0FGQyxTQUFTO1FBQ2QsVUFBVTtHQVRkLGNBQWMsQ0FtQzFCO1NBbkNZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBSZW5kZXJlcjIsXHJcbiAgRWxlbWVudFJlZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbXdsQ2xpY2tdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpY2tEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgY2xpY2tMaXN0ZW5lckRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoJ213bENsaWNrJykgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuXHJcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBlbG06IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudFxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuY2xpY2tMaXN0ZW5lckRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMubGlzdGVuKClcclxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXHJcbiAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIHRoaXMuY2xpY2suZW1pdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsaXN0ZW4oKSB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TW91c2VFdmVudD4ob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbG0ubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQoZXZlbnQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=