import * as React from 'react';
import { Client } from '../../../../server/db/models/Client';
import { ActionCreators } from '../../state/ActionCreators';
import { PricingDeals } from '../../../../server/models/PricingDeals';
import { HttpResponse } from '../../models/HttpResponse';
import { Product } from '../../../../server/db/models/Product';
import { HttpLoader } from '../Loader/Loader';
import { Button, Segment, Header, Icon, Label } from 'semantic-ui-react';
import { PriceInfo } from '../../models/PriceInfo';
import { ProductLine } from '../ProductLine/ProductLine';
import './ShoppingCart.css';
import { findProductDealsBySku } from '../../cart/deals/pricingDealFilter';
import { DiscountDealProcessor } from '../../cart/deals/DiscountDealProcessor';
import { Checkout } from '../../cart/Checkout';

interface ShoppingCartProps {
    client: Client;
    productsResponse: HttpResponse<Array<Product>>;
    pricingDealsResponse: HttpResponse<PricingDeals>;
    dispatch: ActionCreators;
    total: number;
    shoppingCart: { [sku: string]: number };
}

export class ShoppingCart extends React.Component<ShoppingCartProps> {
    componentWillMount(): void {
        this.props.dispatch.getProducts();
        this.props.dispatch.getPricingDeals(this.props.client.id);
    }

    getPriceInfo(product: Product): PriceInfo {
        if (
            !this.props.pricingDealsResponse ||
            !this.props.pricingDealsResponse.body
        ) {
            return { price: product.price, discount: 0 };
        }

        let checkout = new Checkout(
            this.props.productsResponse.body,
            this.props.pricingDealsResponse.body
        );
        checkout.add(product.sku, this.props.shoppingCart[product.sku]);
        return checkout.getPriceInfo(product.sku);
    }

    sortProducts(): void {
        if (this.props.productsResponse && this.props.productsResponse.body) {
            this.props.productsResponse.body.sort((a: Product, b: Product) => {
                if (a.price < b.price) return -1;
                if (b.price < a.price) return 1;
                return 0;
            });
        }
    }

    signOut = () => {
        this.props.dispatch.getClients();
        this.props.dispatch.resetCart();
        this.props.dispatch.selectClient();
    };

    render() {
        this.sortProducts();
        return (
            <div className="ShoppingCart">
                <HttpLoader
                    response={
                        this.props.productsResponse ||
                        this.props.pricingDealsResponse
                    }
                    text="Fetching pricing information..."
                >
                    <Segment.Group className="ShoppingCart-cart">
                        <Label
                            ribbon
                            color="blue"
                            size="big"
                            className="ShoppingCart-user"
                        >
                            Logged in as {this.props.client.name}
                        </Label>
                        <Button
                            className="ShoppingCart-sign-out"
                            onClick={this.signOut}
                        >
                            Sign Out
                        </Button>
                        <Header as="h1" icon textAlign="center">
                            <Icon name="cart" circular />
                            <Header.Content>Shopping Cart</Header.Content>
                        </Header>
                        <Segment.Group>
                            {this.props.productsResponse &&
                                this.props.productsResponse.body &&
                                this.props.productsResponse.body.map(
                                    product => (
                                        <ProductLine
                                            key={product.sku}
                                            product={product}
                                            priceInfo={this.getPriceInfo(
                                                product
                                            )}
                                            dispatch={this.props.dispatch}
                                            quantity={
                                                this.props.shoppingCart[
                                                    product.sku
                                                ]
                                            }
                                        />
                                    )
                                )}
                        </Segment.Group>
                        <Segment.Group className="ShoppingCart-total">
                            <Header as="div" textAlign="right" size="large">
                                Total&nbsp;&nbsp;&nbsp;${this.props.total.toFixed(
                                    2
                                )}
                            </Header>
                        </Segment.Group>
                    </Segment.Group>
                </HttpLoader>
            </div>
        );
    }
}
