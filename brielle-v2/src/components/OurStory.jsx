
/*
    BRIELLE SKINCARE WEBSITE

    File: OurStory.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's personal founder story,
    philosophy, and brand purpose.

    Uses an editorial two-column layout.
*/

import { Link } from "react-router";

import "./OurStory.css";


function OurStory() {

    return (

        <main className="brielle-story-page">

            {/* Opening story section */}
            <section className="brielle-story-hero">

                <div className="brielle-story-inner">

                    <div className="brielle-story-copy">

                        <p className="brielle-story-eyebrow">
                            THE STORY BEHIND BRIELLE
                        </p>

                        <h1>
                            Rooted in love.
                            <em> Made with intention.</em>
                        </h1>

                        <p className="brielle-story-lead">
                            Brielle Skin Ventures began
                            with something deeply personal:
                            my mother.
                        </p>

                        <p>
                            As a student at New York University,
                            I never imagined that wanting to
                            create something special for my
                            mother would become the foundation
                            of my own skincare brand.
                        </p>

                        <p>
                            I wanted to create something
                            thoughtful for her sensitive,
                            mature skin. Something that
                            would make her everyday routine
                            feel more comfortable,
                            nourishing, and beautiful.
                        </p>

                        <p>
                            What began as a simple idea
                            slowly grew into a passion for
                            understanding ingredients,
                            exploring textures, and creating
                            body care with purpose.
                        </p>

                        <div className="brielle-story-signature">

                            <span>Brianna Graham</span>

                            <p>
                                FOUNDER, BRIELLE SKIN VENTURES
                            </p>

                        </div>

                    </div>


                    {/*
                        Editorial visual panel

                        Uses typography and color instead
                        of an unavailable stock image.

                        This can be replaced later with
                        an authentic founder or product photo.
                    */}

                    <div className="brielle-story-visual">

                        <div className="brielle-story-visual-inner">

                            <p className="brielle-story-visual-small">
                                AN EVERYDAY RITUAL
                            </p>

                            <span className="brielle-story-visual-mark">
                                B
                            </span>

                            <p className="brielle-story-visual-quote">
                                A little more care.
                                <br />
                                A little more comfort.
                                <br />
                                A little more love.
                            </p>

                            <p className="brielle-story-visual-footer">
                                BRIELLE · NEW YORK
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* Brand philosophy */}
            <section className="brielle-philosophy">

                <div className="brielle-philosophy-inner">

                    <div className="brielle-philosophy-heading">

                        <p className="brielle-story-eyebrow">
                            OUR PHILOSOPHY
                        </p>

                        <h2>
                            Skincare that
                            <em> feels personal.</em>
                        </h2>

                    </div>


                    <div className="brielle-philosophy-text">

                        <p>
                            I wanted to make more than another
                            moisturizer. I wanted to create
                            something that felt comforting
                            to use and beautiful enough
                            to become a part of someone's
                            daily ritual.
                        </p>

                        <p>
                            Balancing my studies at NYU with
                            building Brielle has meant many
                            hours of learning, experimenting,
                            and refining. Every step has
                            reminded me why I started.
                        </p>

                        <p>
                            Although Brielle began with my
                            mother, my hope is that everyone
                            who experiences our products
                            finds a moment to slow down
                            and appreciate caring for
                            their skin.
                        </p>

                    </div>

                </div>

            </section>


            {/* Brand values */}
            <section className="brielle-values">

                <div className="brielle-values-inner">

                    <p className="brielle-story-eyebrow">
                        WHAT GUIDES US
                    </p>

                    <h2>
                        The little things
                        <em> matter.</em>
                    </h2>

                    <div className="brielle-values-grid">

                        <article className="brielle-value">

                            <span>01</span>

                            <h3>Thoughtful Care</h3>

                            <p>
                                Created with attention to
                                ingredients, texture,
                                and the experience of
                                caring for your skin.
                            </p>

                        </article>

                        <article className="brielle-value">

                            <span>02</span>

                            <h3>Everyday Luxury</h3>

                            <p>
                                Rich textures and beautiful
                                fragrances that make ordinary
                                moments feel special.
                            </p>

                        </article>

                        <article className="brielle-value">

                            <span>03</span>

                            <h3>A Personal Beginning</h3>

                            <p>
                                Inspired by family and
                                built around the belief
                                that skincare can be
                                an expression of love.
                            </p>

                        </article>

                    </div>

                </div>

            </section>


            {/* Explore the collection */}
            <section className="brielle-story-ending">

                <p className="brielle-story-eyebrow">
                    FROM OUR STORY TO YOUR RITUAL
                </p>

                <h2>
                    Made with love.
                    <em> Meant to be felt.</em>
                </h2>

                <p>
                    Discover the body care collection
                    that grew from one simple idea.
                </p>

                <Link
                    to="/shop"
                    className="brielle-story-button"
                >
                    EXPLORE THE COLLECTION
                </Link>

            </section>

        </main>

    );
}

export default OurStory;
