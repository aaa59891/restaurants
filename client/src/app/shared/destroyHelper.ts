import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

export abstract class DestroyHelper implements OnDestroy {
    protected abstract subscriptions: Subscription[];
    ngOnDestroy(): void {
        if(this.subscriptions){
            for(let sub of this.subscriptions){
                sub.unsubscribe();
            }
        }
    }
}