import * as tslib_1 from "tslib";
import { Directive, Component, HostListener, OnDestroy, Input, ComponentRef, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, ComponentFactory, Inject, Renderer2, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { positionElements } from 'positioning';
import { of, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var CalendarTooltipWindowComponent = /** @class */ (function () {
    function CalendarTooltipWindowComponent() {
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarTooltipWindowComponent.prototype, "contents", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CalendarTooltipWindowComponent.prototype, "placement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CalendarTooltipWindowComponent.prototype, "event", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarTooltipWindowComponent.prototype, "customTemplate", void 0);
    CalendarTooltipWindowComponent = tslib_1.__decorate([
        Component({
            selector: 'mwl-calendar-tooltip-window',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-contents=\"contents\"\n      let-placement=\"placement\"\n      let-event=\"event\"\n    >\n      <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n        <div class=\"cal-tooltip-arrow\"></div>\n        <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        contents: contents,\n        placement: placement,\n        event: event\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarTooltipWindowComponent);
    return CalendarTooltipWindowComponent;
}());
export { CalendarTooltipWindowComponent };
var CalendarTooltipDirective = /** @class */ (function () {
    function CalendarTooltipDirective(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
    ) {
        this.elementRef = elementRef;
        this.injector = injector;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        this.placement = 'auto'; // tslint:disable-line no-input-rename
        this.delay = null; // tslint:disable-line no-input-rename
        this.cancelTooltipDelay$ = new Subject();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
    }
    CalendarTooltipDirective.prototype.ngOnChanges = function (changes) {
        if (this.tooltipRef &&
            (changes.contents || changes.customTemplate || changes.event)) {
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            this.tooltipRef.changeDetectorRef.markForCheck();
        }
    };
    CalendarTooltipDirective.prototype.ngOnDestroy = function () {
        this.hide();
    };
    CalendarTooltipDirective.prototype.onMouseOver = function () {
        var _this = this;
        var delay$ = this.delay === null ? of('now') : timer(this.delay);
        delay$.pipe(takeUntil(this.cancelTooltipDelay$)).subscribe(function () {
            _this.show();
        });
    };
    CalendarTooltipDirective.prototype.onMouseOut = function () {
        this.hide();
    };
    CalendarTooltipDirective.prototype.show = function () {
        var _this = this;
        if (!this.tooltipRef && this.contents) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            if (this.appendToBody) {
                this.document.body.appendChild(this.tooltipRef.location.nativeElement);
            }
            requestAnimationFrame(function () {
                _this.positionTooltip();
            });
        }
    };
    CalendarTooltipDirective.prototype.hide = function () {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
        this.cancelTooltipDelay$.next();
    };
    CalendarTooltipDirective.prototype.positionTooltip = function (previousPositions) {
        if (previousPositions === void 0) { previousPositions = []; }
        if (this.tooltipRef) {
            this.tooltipRef.changeDetectorRef.detectChanges();
            this.tooltipRef.instance.placement = positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
            // keep re-positioning the tooltip until the arrow position doesn't make a difference
            if (previousPositions.indexOf(this.tooltipRef.instance.placement) === -1) {
                this.positionTooltip(tslib_1.__spread(previousPositions, [
                    this.tooltipRef.instance.placement
                ]));
            }
        }
    };
    CalendarTooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    tslib_1.__decorate([
        Input('mwlCalendarTooltip'),
        tslib_1.__metadata("design:type", String)
    ], CalendarTooltipDirective.prototype, "contents", void 0);
    tslib_1.__decorate([
        Input('tooltipPlacement'),
        tslib_1.__metadata("design:type", Object)
    ], CalendarTooltipDirective.prototype, "placement", void 0);
    tslib_1.__decorate([
        Input('tooltipTemplate'),
        tslib_1.__metadata("design:type", TemplateRef)
    ], CalendarTooltipDirective.prototype, "customTemplate", void 0);
    tslib_1.__decorate([
        Input('tooltipEvent'),
        tslib_1.__metadata("design:type", Object)
    ], CalendarTooltipDirective.prototype, "event", void 0);
    tslib_1.__decorate([
        Input('tooltipAppendToBody'),
        tslib_1.__metadata("design:type", Boolean)
    ], CalendarTooltipDirective.prototype, "appendToBody", void 0);
    tslib_1.__decorate([
        Input('tooltipDelay'),
        tslib_1.__metadata("design:type", Number)
    ], CalendarTooltipDirective.prototype, "delay", void 0);
    tslib_1.__decorate([
        HostListener('mouseenter'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CalendarTooltipDirective.prototype, "onMouseOver", null);
    tslib_1.__decorate([
        HostListener('mouseleave'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CalendarTooltipDirective.prototype, "onMouseOut", null);
    CalendarTooltipDirective = tslib_1.__decorate([
        Directive({
            selector: '[mwlCalendarTooltip]'
        }),
        tslib_1.__param(5, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            Injector,
            Renderer2,
            ComponentFactoryResolver,
            ViewContainerRef, Object])
    ], CalendarTooltipDirective);
    return CalendarTooltipDirective;
}());
export { CalendarTooltipDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksRUFDWixRQUFRLEVBQ1Isd0JBQXdCLEVBQ3hCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBa0IsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFL0QsT0FBTyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQTJCM0M7SUFBQTtJQVFBLENBQUM7SUFQVTtRQUFSLEtBQUssRUFBRTs7b0VBQWtCO0lBRWpCO1FBQVIsS0FBSyxFQUFFOztxRUFBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7O2lFQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTswQ0FBaUIsV0FBVzswRUFBTTtJQVAvQiw4QkFBOEI7UUF6QjFDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsUUFBUSxFQUFFLDhtQkFxQlQ7U0FDRixDQUFDO09BQ1csOEJBQThCLENBUTFDO0lBQUQscUNBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSw4QkFBOEI7QUFhM0M7SUFpQkUsa0NBQ1UsVUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsUUFBbUIs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VztRQUE1QixLQUFLLENBQUMsb0JBQW9CLENBQUM7OzhEQUFrQjtJQUVuQjtRQUExQixLQUFLLENBQUMsa0JBQWtCLENBQUM7OytEQUFvQztJQUVwQztRQUF6QixLQUFLLENBQUMsaUJBQWlCLENBQUM7MENBQWlCLFdBQVc7b0VBQU07SUFFcEM7UUFBdEIsS0FBSyxDQUFDLGNBQWMsQ0FBQzs7MkRBQXNCO0lBRWQ7UUFBN0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDOztrRUFBdUI7SUFFN0I7UUFBdEIsS0FBSyxDQUFDLGNBQWMsQ0FBQzs7MkRBQTZCO0lBb0NuRDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7K0RBTzFCO0lBR0Q7UUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzs7OzhEQUcxQjtJQTFEVSx3QkFBd0I7UUFIcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtTQUNqQyxDQUFDO1FBd0JHLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtpREFMRyxVQUFVO1lBQ1osUUFBUTtZQUNSLFNBQVM7WUFDRCx3QkFBd0I7WUFDeEIsZ0JBQWdCO09BdEJqQyx3QkFBd0IsQ0E4R3BDO0lBQUQsK0JBQUM7Q0FBQSxBQTlHRCxJQThHQztTQTlHWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBDb21wb25lbnQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5qZWN0b3IsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBDb21wb25lbnRGYWN0b3J5LFxyXG4gIEluamVjdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSwgcG9zaXRpb25FbGVtZW50cyB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXRvb2x0aXAtd2luZG93JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcclxuICAgICAgbGV0LWNvbnRlbnRzPVwiY29udGVudHNcIlxyXG4gICAgICBsZXQtcGxhY2VtZW50PVwicGxhY2VtZW50XCJcclxuICAgICAgbGV0LWV2ZW50PVwiZXZlbnRcIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXBcIiBbbmdDbGFzc109XCInY2FsLXRvb2x0aXAtJyArIHBsYWNlbWVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcC1hcnJvd1wiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcC1pbm5lclwiIFtpbm5lckh0bWxdPVwiY29udGVudHNcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXHJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XHJcbiAgICAgICAgY29udGVudHM6IGNvbnRlbnRzLFxyXG4gICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxyXG4gICAgICAgIGV2ZW50OiBldmVudFxyXG4gICAgICB9XCJcclxuICAgID5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjb250ZW50czogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XHJcblxyXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclRvb2x0aXBdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgnbXdsQ2FsZW5kYXJUb29sdGlwJykgY29udGVudHM6IHN0cmluZzsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcclxuXHJcbiAgQElucHV0KCd0b29sdGlwUGxhY2VtZW50JykgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJzsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcclxuXHJcbiAgQElucHV0KCd0b29sdGlwVGVtcGxhdGUnKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcclxuXHJcbiAgQElucHV0KCd0b29sdGlwRXZlbnQnKSBldmVudDogQ2FsZW5kYXJFdmVudDsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcclxuXHJcbiAgQElucHV0KCd0b29sdGlwQXBwZW5kVG9Cb2R5JykgYXBwZW5kVG9Cb2R5OiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxyXG5cclxuICBASW5wdXQoJ3Rvb2x0aXBEZWxheScpIGRlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcclxuXHJcbiAgcHJpdmF0ZSB0b29sdGlwRmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQ+O1xyXG4gIHByaXZhdGUgdG9vbHRpcFJlZjogQ29tcG9uZW50UmVmPENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudD47XHJcbiAgcHJpdmF0ZSBjYW5jZWxUb29sdGlwRGVsYXkkID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudCAvL3RzbGludDpkaXNhYmxlLWxpbmVcclxuICApIHtcclxuICAgIHRoaXMudG9vbHRpcEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy50b29sdGlwUmVmICYmXHJcbiAgICAgIChjaGFuZ2VzLmNvbnRlbnRzIHx8IGNoYW5nZXMuY3VzdG9tVGVtcGxhdGUgfHwgY2hhbmdlcy5ldmVudClcclxuICAgICkge1xyXG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY29udGVudHMgPSB0aGlzLmNvbnRlbnRzO1xyXG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY3VzdG9tVGVtcGxhdGUgPSB0aGlzLmN1c3RvbVRlbXBsYXRlO1xyXG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuZXZlbnQgPSB0aGlzLmV2ZW50O1xyXG4gICAgICB0aGlzLnRvb2x0aXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXHJcbiAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XHJcbiAgICBjb25zdCBkZWxheSQ6IE9ic2VydmFibGU8YW55PiA9XHJcbiAgICAgIHRoaXMuZGVsYXkgPT09IG51bGwgPyBvZignbm93JykgOiB0aW1lcih0aGlzLmRlbGF5KTtcclxuICAgIGRlbGF5JC5waXBlKHRha2VVbnRpbCh0aGlzLmNhbmNlbFRvb2x0aXBEZWxheSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgb25Nb3VzZU91dCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnRvb2x0aXBSZWYgJiYgdGhpcy5jb250ZW50cykge1xyXG4gICAgICB0aGlzLnRvb2x0aXBSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxyXG4gICAgICAgIHRoaXMudG9vbHRpcEZhY3RvcnksXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmluamVjdG9yLFxyXG4gICAgICAgIFtdXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5jb250ZW50cyA9IHRoaXMuY29udGVudHM7XHJcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5jdXN0b21UZW1wbGF0ZSA9IHRoaXMuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5ldmVudCA9IHRoaXMuZXZlbnQ7XHJcbiAgICAgIGlmICh0aGlzLmFwcGVuZFRvQm9keSkge1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uVG9vbHRpcCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlkZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvb2x0aXBSZWYpIHtcclxuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLnJlbW92ZShcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLnRvb2x0aXBSZWYuaG9zdFZpZXcpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMudG9vbHRpcFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbmNlbFRvb2x0aXBEZWxheSQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwb3NpdGlvblRvb2x0aXAocHJldmlvdXNQb3NpdGlvbnM6IHN0cmluZ1tdID0gW10pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRvb2x0aXBSZWYpIHtcclxuICAgICAgdGhpcy50b29sdGlwUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLnBsYWNlbWVudCA9IHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgdGhpcy50b29sdGlwUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sXHJcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgdGhpcy5hcHBlbmRUb0JvZHlcclxuICAgICAgKTtcclxuICAgICAgLy8ga2VlcCByZS1wb3NpdGlvbmluZyB0aGUgdG9vbHRpcCB1bnRpbCB0aGUgYXJyb3cgcG9zaXRpb24gZG9lc24ndCBtYWtlIGEgZGlmZmVyZW5jZVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgcHJldmlvdXNQb3NpdGlvbnMuaW5kZXhPZih0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UucGxhY2VtZW50KSA9PT0gLTFcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvblRvb2x0aXAoW1xyXG4gICAgICAgICAgLi4ucHJldmlvdXNQb3NpdGlvbnMsXHJcbiAgICAgICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UucGxhY2VtZW50XHJcbiAgICAgICAgXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19