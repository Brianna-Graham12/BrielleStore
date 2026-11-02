
/*
    BRIELLE SKINCARE WEBSITE

    File: Scents.jsx
    Author: Brianna Graham

    Description:
    Displays Brielle's signature fragrances.

    Each scent contains a name, description,
    and visual styling based on its identity.
*/

import "./Scents.css";


// Stores information about each Brielle fragrance
const scents = [
    {
        id: 1,
        name: "Golden Vanilla",
        notes: "Warm Vanilla",
        description:
            "A comforting, golden fragrance with a soft, sweet warmth.",
        className: "golden-vanilla"
    },
    {
        id: 2,
        name: "Lavender Fields",
        notes: "Lavender & Honey",
        description:
            "Calming lavender wrapped in the delicate sweetness of honey.",
        className: "lavender-fields"
    },
    {
        id: 3,
        name: "Midnight Ember",
        notes: "Smoky & Cashmere",
        description:
            "A captivating blend of smoky warmth and soft cashmere.",
        className: "midnight-ember"
    },
    {
        id: 4,
        name: "Soft Bloom",
        notes: "Soft Florals",
        description:
            "A delicate floral fragrance with a graceful, airy finish.",
        className: "soft-bloom"
    }
];


/*
    Scents Component

    Uses the map function to create a card
    for each fragrance in the scents array.

    @returns JSX elements for the scent collection
*/

function Scents() {

    return (
        <section id="scents" className="scents-section">

            <p className="scents-eyebrow">
                THE FRAGRANCE COLLECTION
            </p>

            <h2>Explore Our Scents</h2>

            <p className="scents-intro">
                A fragrance for every mood, moment, and ritual.
            </p>

            <div className="scents-grid">

                {scents.map((scent) => (

                    <article
                        key={scent.id}
                        className={`scent-card ${scent.className}`}
                    >

                        <div className="scent-card-content">

                            <p className="scent-notes">
                                {scent.notes}
                            </p>

                            <h3>{scent.name}</h3>

                            <p className="scent-description">
                                {scent.description}
                            </p>

                        </div>

                    </article>

                ))}

            </div>

        </section>
    );
}


// Allows App.jsx to import this component
export default Scents;
