import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "./index.css";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

class ReactSlick extends Component {
  renderSlider = () => {
    const { movies } = this.props;

    return (
      <Slider {...settings}>
        {movies.map((movie) => {
          const { id, title, posterPath } = movie;
          return (
            <li className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="movie-image" src={posterPath} alt={title} />
              </Link>
            </li>
          );
        })}
      </Slider>
    );
  };

  render() {
    return (
      <div className="main-container">
        <ul className="slick-container">{this.renderSlider()}</ul>
      </div>
    );
  }
}

export default ReactSlick;
