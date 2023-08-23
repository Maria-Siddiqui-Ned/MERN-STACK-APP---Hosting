import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ImageSlider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={2000}>
        <img height={600}
          className="d-block w-100"
          src="https://www.royalcyber.com/wp-content/uploads/2022/12/share-your-cart.jpg"
          alt="First slide"
        />
    
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img height={600}
          className="d-block w-100"
          src="https://img.freepik.com/premium-vector/online-shopping-store-website-mobile-phone-design-smart-business-marketing-concept-horizontal-view-vector-illustration_62391-460.jpg?w=2000"
          alt="Second slide"
        />

        </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img height={600}
          className="d-block w-100"
          src="https://www.web-ideas.com.au/uploads/110/225/Online-Shopping-Systems.jpg"
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;