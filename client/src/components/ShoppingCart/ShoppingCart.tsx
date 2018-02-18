import * as React from 'react';
import { Client } from '../../../../server/db/models/Client';
import { ActionCreators } from '../../state/ActionCreators';
import { PricingDeals } from '../../../../server/models/PricingDeals';
import { HttpResponse } from '../../models/HttpResponse';
import { Product } from '../../../../server/db/models/Product';
import { HttpLoader } from '../Loader/Loader';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
import { PriceInfo } from '../../models/PriceInfo';
import { ProductLine } from '../ProductLine/ProductLine';
import './ShoppingCart.css';

interface ShoppingCartProps {
    client: Client;
    productsResponse: HttpResponse<Array<Product>>;
    pricingDealsResponse: HttpResponse<PricingDeals>;
    dispatch: ActionCreators;
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
            return product;
        }

        let deal = this.props.pricingDealsResponse.body.discountDeals.find(
            d => d.sku === product.sku
        );
        if (!deal) return product;

        return {
            price: deal.discountedPrice,
            discounted: true,
            discount: product.price - deal.discountedPrice
        };
    }

    render() {
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
                        <Button
                            className="ShoppingCart-sign-out"
                            onClick={() => this.props.dispatch.selectClient()}
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
                                            product={product}
                                            priceInfo={this.getPriceInfo(
                                                product
                                            )}
                                        />
                                    )
                                )}
                        </Segment.Group>
                    </Segment.Group>
                </HttpLoader>
            </div>
        );
    }
}
