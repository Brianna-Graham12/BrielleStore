
/*
  BRIELLE SKINCARE WEBSITE

  File: Hero.jsx
  Author: Brianna Graham

  Homepage hero section.
*/

import { Link } from "react-router";
import "./Hero.css";

function Hero() {
  return (
    <section className="brielle-hero">
      <div className="brielle-hero-container">

        <div className="brielle-hero-content">

          <p className="brielle-hero-eyebrow">
            THOUGHTFULLY CRAFTED BODY CARE
          </p>

          <h1 className="brielle-hero-title">
            The beauty of
            <span> feeling good </span>
            in your skin.
          </h1>

          <p className="brielle-hero-description">
            Discover body crèmes, lotions, and hand
            creams made to turn everyday skincare
            into a moment of comfort and indulgence.
          </p>

          <div className="brielle-hero-actions">

            <Link
              to="/shop"
              className="brielle-hero-button"
            >
              SHOP THE COLLECTION
            </Link>

            <Link
              to="/our-story"
              className="brielle-hero-story-link"
            >
              OUR STORY
            </Link>

          </div>

        </div>

        <div className="brielle-hero-art" aria-hidden="true">
          <div className="brielle-hero-art-frame">

            <span className="brielle-hero-art-monogram">
              B
            </span>

            <span className="brielle-hero-art-caption">
              THE ART OF EVERYDAY CARE
            </span>

          </div>
        </div>

      </div>

      <div className="brielle-hero-bottom">
        <span>BRIELLE SKIN VENTURES</span>
        <span>CREATED WITH INTENTION</span>
      </div>
    </section>
  );
}

export default Hero;
