
/*
    BRIELLE SKINCARE WEBSITE

    File: LoadingScreen.jsx
    Author: Brianna Graham

    Description:
    Displays the introductory loading animation.

    A light-blue counter and water progress bar
    increase together from 0 to 100.

    Once complete, an irregular opening expands
    from the center until the entire homepage
    is revealed.

    The animation moves continuously outward
    without bouncing or resetting.
*/

import { useState, useEffect, useId } from "react";
import "./LoadingScreen.css";


/*
    LoadingScreen Component

    Controls the counter, water progress bar,
    and organic homepage reveal.

    @returns JSX elements for the loading screen
*/

function LoadingScreen() {

    // Stores the loading percentage
    const [progress, setProgress] = useState(0);

    // Determines when the reveal begins
    const [isRevealing, setIsRevealing] = useState(false);

    // Stores the size of the opening
    const [revealScale, setRevealScale] = useState(0);

    // Determines when the animation is complete
    const [isFinished, setIsFinished] = useState(false);

    // Creates a unique SVG mask ID
    const maskId = useId().replace(/:/g, "");


    /*
        Loading Counter

        Updates the number and progress bar using
        the same percentage.

        The counter takes approximately 2.5 seconds.
    */

    useEffect(() => {

        const startTime = performance.now();

        let animationFrame;
        let revealTimeout;

        const updateProgress = (currentTime) => {

            const elapsed = currentTime - startTime;

            const percentage = Math.min(
                Math.floor((elapsed / 2500) * 100),
                100
            );

            setProgress(percentage);

            if (percentage < 100) {

                animationFrame = requestAnimationFrame(
                    updateProgress
                );

            } else {

                // Briefly display 100 before the reveal
                revealTimeout = setTimeout(() => {
                    setIsRevealing(true);
                }, 250);

            }
        };

        animationFrame = requestAnimationFrame(
            updateProgress
        );

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(revealTimeout);
        };

    }, []);


    /*
        Water Breakaway Animation

        Starts after the counter reaches 100.

        The opening grows until it passes the
        edges and corners of the viewport.

        requestAnimationFrame keeps the movement
        connected to the browser's refresh rate.
    */

    useEffect(() => {

        if (!isRevealing) {
            return;
        }

        const duration = 3000;
        const startTime = performance.now();

        let animationFrame;

        const animateReveal = (currentTime) => {

            // Calculate the elapsed animation time
            const elapsed = currentTime - startTime;

            // Convert elapsed time into a value from 0 to 1
            const progressValue = Math.min(
                elapsed / duration,
                1
            );

            /*
                Ease-out movement

                The opening moves quickly at first
                and gradually slows near the edges.

                The calculated value only increases,
                so the opening never shrinks.
            */

            const eased = 1 - Math.pow(
                1 - progressValue,
                3
            );

            /*
                The SVG uses a 1000 by 1000 viewBox.

                Our original irregular opening is centered
                around 500 and extends roughly 400 units
                outward.

                A final scale of 3 covers the corners
                even with the irregular edges.
            */

            const scale = eased * 3.5;

            setRevealScale(scale);

            if (progressValue < 1) {

                animationFrame = requestAnimationFrame(
                    animateReveal
                );

            } else {

                // Remove the overlay after the full reveal
                setIsFinished(true);

            }
        };

        animationFrame = requestAnimationFrame(
            animateReveal
        );

        return () => cancelAnimationFrame(
            animationFrame
        );

    }, [isRevealing]);


    // Removes the loading screen after the reveal
    if (isFinished) {
        return null;
    }


    /*
        SVG Mask

        The white rectangle represents the
        original loading screen.

        The black path creates a transparent hole.

        The path grows from the center until
        every edge of the screen is uncovered.

        The SVG uses preserveAspectRatio none
        so the mask covers the entire viewport.
    */

    return (

        <div
            className={`loading-screen ${
                isRevealing ? "loading-reveal" : ""
            }`}
        >

            <svg
                className="loading-mask"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                aria-hidden="true"
            >

                <defs>

                    <mask
                        id={maskId}
                        maskUnits="userSpaceOnUse"
                        maskContentUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="1000"
                        height="1000"
                        style={{ maskType: "luminance" }}
                    >

                        {/* Makes the paper visible */}
                        <rect
                            width="1000"
                            height="1000"
                            fill="white"
                        />

                        {/*
                            Tissue-Paper Opening

                            The irregular path is enlarged
                            using an SVG transform.

                            React controls the scale directly
                            to avoid Safari's CSS transform
                            snapping or resetting.
                        */}

                        <path
                            className="paper-opening"
                            d="
                                M 500 90
                                C 555 110, 600 65, 650 125
                                C 700 155, 745 135, 780 200
                                C 835 250, 805 305, 865 350
                                C 920 405, 875 460, 900 515
                                C 915 590, 845 630, 850 690
                                C 820 750, 750 755, 720 820
                                C 670 865, 615 845, 570 905
                                C 510 930, 460 875, 400 900
                                C 330 880, 315 815, 250 800
                                C 195 760, 210 700, 150 660
                                C 115 595, 165 550, 110 500
                                C 95 435, 155 405, 140 340
                                C 175 275, 240 280, 255 215
                                C 310 170, 365 180, 405 115
                                C 445 90, 475 125, 500 90
                                Z
                            "
                            fill="black"
                            transform={`
                                translate(500 500)
                                scale(${revealScale})
                                translate(-500 -500)
                            `}
                        />

                    </mask>

                </defs>

                {/* White screen with the expanding opening */}
                <rect
                    className="breakaway-paper"
                    width="1000"
                    height="1000"
                    fill="white"
                    mask={`url(#${maskId})`}
                />

            </svg>


            {/* Light-blue water impact */}
            <div
                className="water-impact"
                aria-hidden="true"
            ></div>


            {/*
                Loading Content

                Displays the counter and progress bar.

                Both use the same progress variable
                to remain synchronized.
            */}

            <div className="loading-content">

                <h1 className="loading-number">
                    {progress}
                </h1>

                {/* Water progress bar */}
                <div
                    className="loading-track"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Brielle introduction progress"
                >

                    <div
                        className="loading-fill"
                        style={{ width: `${progress}%` }}
                    >

                        <span className="water-wave"></span>

                        <span className="water-shine"></span>

                    </div>

                </div>

                <p className="loading-label">
                    LOADING...
                </p>

            </div>

        </div>
    );
}


// Allows App.jsx to import the loading screen
export default LoadingScreen;
