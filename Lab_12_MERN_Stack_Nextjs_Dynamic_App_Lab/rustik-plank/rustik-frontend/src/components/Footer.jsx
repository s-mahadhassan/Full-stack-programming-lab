export default function Footer() {
  return (
    <>
      <div className="partners-section">
        <div className="partners-inner">
          <span className="partner-logo f4b">f4b</span>
          <span className="partner-logo govt">Australian<br />Government</span>
          <span className="partner-logo">QANTAS</span>
          <span className="partner-logo">INTERRISK</span>
          <span className="partner-logo">GE Money</span>
          <span className="partner-logo">Rockwell Collins</span>
          <span className="partner-logo">LexisNexis</span>
          <span className="partner-logo">ohlmedia</span>
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-inner">
          {/* Column 1: Informations */}
          <div className="footer-col">
            <h4>Informations</h4>
            <ul>
              <li><a href="#">Terms and conditions</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Return policy</a></li>
              <li><a href="#">Suppliers</a></li>
            </ul>
          </div>

          {/* Column 2: My Account */}
          <div className="footer-col">
            <h4>My Account</h4>
            <ul>
              <li><a href="#">Your Account</a></li>
              <li><a href="#">Information</a></li>
              <li><a href="#">Addresses</a></li>
              <li><a href="#">Orders history</a></li>
              <li><a href="#">Delivery Information</a></li>
              <li><a href="#">Search Terms</a></li>
            </ul>
          </div>

          {/* Column 3: Help and More */}
          <div className="footer-col">
            <h4>Help and More</h4>
            <ul>
              <li><a href="#">New products</a></li>
              <li><a href="#">Top sellers</a></li>
              <li><a href="#">Manufacturers</a></li>
              <li><a href="#">Suppliers</a></li>
              <li><a href="#">Specials</a></li>
            </ul>
          </div>

          {/* Column 4: Links */}
          <div className="footer-col">
            <h4>Links</h4>
            <ul>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Service</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Mobile</a></li>
              <li><a href="#">Manufacturers</a></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          &copy; 2014 Rustik Plank Furniture &nbsp;|&nbsp; All Rights Reserved &nbsp;&mdash;&nbsp;
          Made by <span>Mahad Hassan</span> &ndash; 232053
        </div>
      </footer>
    </>
  );
}
