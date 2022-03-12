import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
    slug,
    name,
    imageSrc,
    price,
    salePrice,
    releaseDate,
    numOfColors,
}) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <VariantFlag variant={variant} />
                    <Image alt="" src={imageSrc} />
                </ImageWrapper>
                <Spacer size={12} />
                <Row>
                    <Name>{name}</Name>
                    <Price>{formatPrice(price)}</Price>
                </Row>
                <Row>
                    <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
                </Row>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
    text-decoration: none;
    color: inherit;
`;

const Wrapper = styled.article`
    display: flex;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    position: relative;
`;

const VariantFlag = ({ variant }) => {
    const shouldShowFlag = variant === 'on-sale' || variant === 'new-release';
    if (!shouldShowFlag) {
        return null;
    }

    const variantDataMap = {
        'on-sale': {
            text: 'Sale',
            backgroundColor: `${COLORS.primary}`,
        },
        'new-release': {
            text: 'Just released!',
            backgroundColor: `${COLORS.secondary}`,
        },
    };

    const variantData = variantDataMap[variant];

    return (
        <Flag style={{ '--background-color': variantData.backgroundColor }}>
            {variantData.text}
        </Flag>
    );
};

const Flag = styled.div`
    position: absolute;
    top: 12px;
    right: -4px;
    padding: 7px 11px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 2px;
    color: ${COLORS.white};
    background: var(--background-color);
`;

const Image = styled.img`
    width: 100%;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
`;

const Name = styled.h3`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
    color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.primary};
`;

export default ShoeCard;
