import * as React from 'react';
import { Button, Segment, Icon } from 'semantic-ui-react';
import { Product } from '../../../../server/db/models/Product';
import { PriceInfo } from '../../models/PriceInfo';
import './ProductLine.css';

interface ProductLineProps {
    product: Product;
    priceInfo: PriceInfo;
}

export const ProductLine = (props: ProductLineProps) => {
    return (
        <Segment.Group className="ProductLine" horizontal textAlign="left">
            <Segment>
                <div className="ProductLine-line">
                    <div>{props.product.name}</div>
                    <div className="ProductLine-price">
                        <div>
                            {props.priceInfo.discount && (
                                <span className="ProductLine-discount">
                                    (- ${props.priceInfo.discount})&nbsp;
                                </span>
                            )}${props.priceInfo.price}
                        </div>
                    </div>
                    <div className="ProductLine-buttons">
                        <Button.Group>
                            <Button size="tiny" icon>
                                <Icon name="minus" />
                            </Button>
                            <Button size="tiny" icon>
                                <Icon name="plus" />
                            </Button>
                        </Button.Group>
                    </div>
                </div>
            </Segment>
        </Segment.Group>
    );
};
