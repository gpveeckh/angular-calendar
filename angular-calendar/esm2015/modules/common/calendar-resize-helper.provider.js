import { isInside } from './util';
export class CalendarResizeHelper {
    constructor(resizeContainerElement, minWidth) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
    }
    validateResize({ rectangle }) {
        if (this.minWidth &&
            Math.ceil(rectangle.width) < Math.ceil(this.minWidth)) {
            return false;
        }
        return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1yZXNpemUtaGVscGVyLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUNVLHNCQUFtQyxFQUNuQyxRQUFpQjtRQURqQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQWE7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBUztJQUN4QixDQUFDO0lBRUosY0FBYyxDQUFDLEVBQUUsU0FBUyxFQUE2QjtRQUNyRCxJQUNFLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQ3JEO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sUUFBUSxDQUNiLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUNuRCxTQUFTLENBQ1YsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzSW5zaWRlIH0gZnJvbSAnLi91dGlsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclJlc2l6ZUhlbHBlciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlc2l6ZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LFxyXG4gICAgcHJpdmF0ZSBtaW5XaWR0aD86IG51bWJlclxyXG4gICkge31cclxuXHJcbiAgdmFsaWRhdGVSZXNpemUoeyByZWN0YW5nbGUgfTogeyByZWN0YW5nbGU6IENsaWVudFJlY3QgfSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLm1pbldpZHRoICYmXHJcbiAgICAgIE1hdGguY2VpbChyZWN0YW5nbGUud2lkdGgpIDwgTWF0aC5jZWlsKHRoaXMubWluV2lkdGgpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpc0luc2lkZShcclxuICAgICAgdGhpcy5yZXNpemVDb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICByZWN0YW5nbGVcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==