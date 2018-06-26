import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

export abstract class AutoUnsubscribe implements OnDestroy {
    protected abstract set subscriptions(subscriptions: Subscription[]);
    ngOnDestroy(): void {
        for(let sub of this.subscriptions){
            sub.unsubscribe();
        }
    }
}