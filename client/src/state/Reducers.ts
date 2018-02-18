import { Client } from '../../../server/db/models/Client';
import { AppState } from './AppState';
import * as Redux from 'redux';
import { Product } from '../../../server/db/models/Product';
import { Checkout } from '../cart/Checkout';
import { filterPricingDealsByClientId } from '../cart/deals/pricingDealFilter';

export class Reducers {
    addItem(state: AppState, { item }: { item: Product }): AppState {
        let newState = { ...state };
        newState.shoppingCart = { ...newState.shoppingCart };
        if (newState.shoppingCart[item.sku]) {
            newState.shoppingCart[item.sku] += 1;
        } else {
            newState.shoppingCart[item.sku] = 1;
        }

        return this.calculateTotal(newState);
    }

    calculateTotal(state: AppState): AppState {
        let newState = { ...state };

        let pricingDeals = filterPricingDealsByClientId(
            newState.getPricingDeals.body,
            newState.selectedClient.id
        );
        let checkout = new Checkout(state.getProducts.body, pricingDeals);

        Object.keys(newState.shoppingCart).forEach(sku =>
            checkout.add(sku, newState.shoppingCart[sku])
        );
        newState.total = checkout.getTotal();

        return newState;
    }

    removeItem(state: AppState, { item }: { item: Product }): AppState {
        let newState = { ...state };
        newState.shoppingCart = { ...newState.shoppingCart };
        if (
            newState.shoppingCart[item.sku] &&
            newState.shoppingCart[item.sku] > 0
        ) {
            newState.shoppingCart[item.sku] -= 1;
        } else {
            newState.shoppingCart[item.sku] = 0;
        }

        return this.calculateTotal(newState);
    }

    selectClient(state: AppState, { client }: { client: Client }): AppState {
        let newState = { ...state };
        newState.selectedClient = client;
        return newState;
    }

    resetCart(state: AppState): AppState {
        let newState = { ...state };
        newState.shoppingCart = {};
        return newState;
    }

    httpSuccess(state: AppState, action: Redux.AnyAction): AppState {
        let newState = { ...state };
        newState[action.key] = {
            body: action.body
        };
        return newState;
    }

    httpError(state: AppState, action: Redux.AnyAction): AppState {
        let newState = { ...state };
        newState[action.key] = {
            error: true
        };
        return newState;
    }

    httpLoading(state: AppState, action: Redux.AnyAction): AppState {
        let newState = { ...state };
        newState[action.key] = {
            loading: true
        };
        return newState;
    }
}
