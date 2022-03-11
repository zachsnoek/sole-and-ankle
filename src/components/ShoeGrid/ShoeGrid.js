import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
    return (
        <Wrapper>
            {SHOES.map((shoe) => (
                <ShoeWrapper key={shoe.slug}>
                    <ShoeCard {...shoe} />
                </ShoeWrapper>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
`;

const ShoeWrapper = styled.div`
    min-width: 275px; /* hypothetical size and constraint; don't let it be smaller than 275 */
    /*
    use min-width instead of width; it:
    sets the hypothetical size to 275px and acts as a constraint so that it can't be smaller than 275px
    which causes the line wrap.
    flex: 1 makes the elements consume the remaining space evenly and lets them all shrink at the same rate.
    */
    flex: 1;
`;

export default ShoeGrid;
