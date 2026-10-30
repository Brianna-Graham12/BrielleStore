
/*
    BRIELLE SKINCARE WEBSITE

    File: products.js
    Author: Brianna Graham

    Description:
    Stores the product information for Brielle.

    Products are stored as JavaScript objects,
    making them reusable throughout the website.
*/

// Available Brielle fragrances
export const scents = [
    "Golden Vanilla",
    "Lavender Fields",
    "Midnight Ember",
    "Soft Bloom"
];


// Product collection
export const products = [
    {
        id: "body-creme",
        name: "Body Crème",

        description:
            "Indulge your skin in rich, luxurious moisture. Our Body Crème combines shea butter, mango seed butter, and nourishing oils to leave skin feeling soft, smooth, and beautifully moisturized.",

        sizes: [
            {
                label: "8 oz",
                price: 25
            },
            {
                label: "16 oz",
                price: 40
            }
        ],

        scents: scents
    },

    {
        id: "body-lotion",
        name: "Body Lotion",

        description:
            "A lightweight, silky lotion designed to deliver everyday hydration while leaving skin feeling smooth and comfortable.",

        sizes: [
            {
                label: "8 oz",
                price: 22
            }
        ],

        scents: scents
    },

    {
        id: "hand-cream",
        name: "Hand Cream",

        description:
            "A silky, comforting hand cream that helps soften and moisturize your hands throughout the day.",

        sizes: [
            {
                label: "3 oz",
                price: 15
            }
        ],

        scents: scents
    },

    {
        id: "sampler",
        name: "Discovery Set",

        description:
            "Explore Brielle's four signature fragrances with our curated collection of hand cream tins.",

        sizes: [
            {
                label: "4 tins",
                price: 38
            }
        ],

        scents: scents
    }
];
