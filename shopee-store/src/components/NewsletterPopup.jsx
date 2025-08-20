// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
function NewsletterPopup() {
  return (
    <div
      className="newsletter-popup mfp-hide"
      id="newsletter-popup"
      style={{ backgroundImage: "url(images/newsletter-popup.jpg)" }}
    >
      <div className="newsletter-content">
        <h4 className="text-uppercase text-dark">
          Up to <span className="text-primary">20% Off</span>
        </h4>
        <h2 className="font-weight-semi-bold">
          Sign up to <span>RIODE</span>
        </h2>
        <p className="text-grey">
          Subscribe to the Riode eCommerce newsletter to receive timely updates
          from your favorite products.
        </p>
        <form
          action="#"
          method="get"
          className="input-wrapper input-wrapper-inline input-wrapper-round"
        >
          <input
            type="email"
            className="form-control email"
            name="email"
            id="email2"
            placeholder="Email address here..."
            required=""
          />
          <button className="btn btn-dark" type="submit">
            SUBMIT
          </button>
        </form>
        <div className="form-checkbox justify-content-center">
          <input
            type="checkbox"
            className="custom-checkbox"
            id="hide-newsletter-popup"
            name="hide-newsletter-popup"
            required=""
          />
          <label htmlFor="hide-newsletter-popup">
            Don't show this popup again
          </label>
        </div>
      </div>
    </div>
  );
}

export default NewsletterPopup;
