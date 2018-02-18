import * as React from 'react';
import { Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Product } from '../../../../server/db/models/Product';
import { PriceInfo } from '../../models/PriceInfo';
import './ProductLine.css';
import { ActionCreators } from '../../state/ActionCreators';

interface ProductLineProps {
    product: Product;
    priceInfo: PriceInfo;
    quantity: number;
    dispatch: ActionCreators;
}

export const ProductLine = (props: ProductLineProps) => {
    let { cheaperQuantity, quantityDiscount } = props.priceInfo;

    return (
        <Segment.Group className="ProductLine" horizontal>
            <Segment>
                <div className="ProductLine-line">
                    <div>{props.product.name}</div>
                    <div className="ProductLine-deals">
                        {cheaperQuantity && (
                            <Label as="div" color="green" tag size="small">
                                Buy {cheaperQuantity.purchasedQuantity} for{' '}
                                {cheaperQuantity.chargedQuantity}
                            </Label>
                        )}
                        {quantityDiscount && (
                            <Label as="div" color="teal" tag size="small">
                                Buy {quantityDiscount.minimumQuantity} or more
                            </Label>
                        )}
                    </div>
                    <div className="ProductLine-price">
                        <div>
                            {props.priceInfo.discount > 0 && (
                                <span className="ProductLine-discount">
                                    (- ${props.priceInfo.discount.toFixed(2)})&nbsp;&nbsp;&nbsp;
                                </span>
                            )}${props.priceInfo.price.toFixed(2)}
                        </div>
                    </div>
                    <div className="ProductLine-quantity">
                        {props.quantity > 0 && (
                            <Label size="large" circular color="black">
                                <span>{props.quantity}</span>
                            </Label>
                        )}
                    </div>
                    <div className="ProductLine-buttons">
                        <Button.Group>
                            <Button
                                size="tiny"
                                icon
                                onClick={() =>
                                    props.dispatch.removeItem(props.product)
                                }
                            >
                                <Icon name="minus" />
                            </Button>
                            <Button
                                size="tiny"
                                icon
                                onClick={() =>
                                    props.dispatch.addItem(props.product)
                                }
                            >
                                <Icon name="plus" />
                            </Button>
                        </Button.Group>
                    </div>
                </div>
            </Segment>
        </Segment.Group>
    );
};
