import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { Children } from 'react'

export default function Slider(props) {
    const { children } = props
    return (
        <Splide
            options={{
                arrows: true,
                pagination: false,
                perPage: 1,
                perMove: 1,
            }}
            aria-label="My Favorite Images"
            className='custom-slider iop'
        >
            {Children.map(children, child =>
                <SplideSlide>
                    {child}
                </SplideSlide>
            )}
        </Splide>
    );
}