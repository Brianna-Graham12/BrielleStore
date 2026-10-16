
/*
    BRIELLE SKINCARE WEBSITE

    This file contains the main React component
    responsible for displaying the website.

    React uses JSX to combine JavaScript with
    HTML-like elements.
*/

// Import the CSS file used to style our website.
import './App.css'


/*
    App Component

    This function represents the main website.

    @returns JSX elements that React will render
    in the browser.
*/

function App() {

  // Return the structure of our website.
  return (

    // Main container holding all website sections.
    <div className="store">

      {/* NAVIGATION BAR

          The header appears at the top of the page.
          className connects an element to CSS styling.
      */}

      <header className="navbar">

        {/* Display the brand name. */}
        <h2>BRIELLE</h2>

        {/* Navigation links to website sections. */}
        <nav>

          {/* href="#home" finds the element
              with id="home". */}
          <a href="#home">Home</a>

          {/* Navigates to the product collection. */}
          <a href="#shop">Shop</a>

          {/* Navigates to our brand story. */}
          <a href="#about">About</a>

        </nav>

      </header>


      {/* HERO SECTION

          The hero is the main introduction
          visitors see when opening the website.

          id="home" allows navigation to this section.
      */}

      <section id="home" className="hero">

        {/* Paragraph displaying our location. */}
        <p>MADE IN BROOKLYN</p>

        {/* Main heading of the website. */}
        <h1>Welcome to Brielle Skin</h1>

        {/* Brand tagline. */}
        <h3>Luxury Body Care, Made with Love.</h3>

        {/* Link styled as a button using CSS.

            Clicking it moves the visitor to
            the shop section.
        */}
        <a className="shop-button" href="#shop">
          Shop Our Collection
        </a>

      </section>


      {/* PRODUCT COLLECTION

          This section displays the skincare
          products available from Brielle.

          Later, we can use JavaScript arrays
          to generate product cards automatically.
      */}

      <section id="shop" className="products">

        {/* Section heading. */}
        <h2>Our Collection</h2>

        {/* Short introduction to our products. */}
        <p>Discover your new favorite body care.</p>

        {/* Container holding individual products.

            CSS Grid will eventually arrange
            these products into columns.
        */}
        <div className="product-grid">

          {/* PRODUCT 1

              An article represents an individual
              product within our collection.
          */}
          <article>

            {/* Name of the product. */}
            <h3>Thick Body Crème</h3>

            {/* Product size and price. */}
            <p>8 oz — $25</p>

          </article>


          {/* PRODUCT 2 */}
          <article>

            {/* Name of the product. */}
            <h3>Body Lotion</h3>

            {/* Short product description. */}
            <p>Soft, smooth, hydrated skin.</p>

          </article>


          {/* PRODUCT 3 */}
          <article>

            {/* Name of the product. */}
            <h3>Discovery Set</h3>

            {/* Short product description. */}
            <p>Explore the scents of Brielle.</p>

          </article>

        </div>

      </section>


      {/* ABOUT SECTION

          This section introduces customers
          to the story behind Brielle.

          The About link in the navbar points
          to id="about".
      */}

      <section id="about" className="about">

        {/* Section heading. */}
        <h2>Our Story</h2>

        {/* Paragraph describing our brand. */}
        <p>
          Born in Brooklyn, Brielle began with a
          simple goal: creating beautiful body
          care for the people we love.
        </p>

      </section>


      {/* FOOTER

          The footer appears at the bottom
          of the website.

          It can later contain contact details,
          social media links, and store policies.
      */}

      <footer>

        {/* Copyright notice. */}
        <p>© 2026 BRIELLE</p>

        {/* Location of our business. */}
        <p>Made in Brooklyn, New York</p>

      </footer>

    </div>
  )
}


/*
    Export the App component.

    This allows another JavaScript file,
    such as main.jsx, to import App
    and render it in the browser.
*/
export default App

