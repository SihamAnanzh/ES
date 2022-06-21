import { Box, Container } from "@mui/material";
import CarouselCard1 from "components/carousel-cards/CarouselCard1";
import Carousel from "components/carousel/Carousel";
import Navbar from "components/navbar/Navbar";
import { Fragment } from "react";

const Section1 = ({ carouselData }) => {
  return (
    <Fragment>
      <Navbar />

      <Box bgcolor="white" mb={7.5}>
        <Container
          sx={{
            py: 4,
          }}
        >
          <Carousel
            totalSlides={2}
            visibleSlides={1}
            infinite={true}
            autoPlay={false}
            showDots={true}
            showArrow={false}
            spacing="0px"
          >
            {carouselData.map((data, ind) => (
              <CarouselCard1 carousel={data} key={ind} />
            ))}
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Section1;
