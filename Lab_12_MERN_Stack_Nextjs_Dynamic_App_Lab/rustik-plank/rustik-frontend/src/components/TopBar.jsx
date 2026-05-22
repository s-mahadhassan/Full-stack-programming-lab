export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="inner">
        {/* Social icons (left) */}
        <div className="social-links">
          <a href="#" title="Google+"><i className="fab fa-google-plus-g"></i></a>
          <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
        </div>

        {/* Phone (centre) */}
        <div className="phone">07584 031409</div>

        {/* Account + cart (right) */}
        <div className="account-links" style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#">My Account (login/Register)</a>
          <span className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0 Items</span>
          </span>
        </div>
      </div>
    </div>
  );
}
