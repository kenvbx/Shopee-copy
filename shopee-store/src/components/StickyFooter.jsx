// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
function StickyFooter() {
  return (
    <div className="sticky-footer sticky-content fix-bottom">
      <a href="demo3.html" className="sticky-link active">
        <i className="d-icon-home" />
        <span>Home</span>
      </a>
      <a href="demo3-shop.html" className="sticky-link">
        <i className="d-icon-volume" />
        <span>Categories</span>
      </a>
      <a href="wishlist.html" className="sticky-link">
        <i className="d-icon-heart" />
        <span>Wishlist</span>
      </a>
      <a href="account.html" className="sticky-link">
        <i className="d-icon-user" />
        <span>Account</span>
      </a>
      <div className="header-search hs-toggle dir-up">
        <a href="#" className="search-toggle sticky-link">
          <i className="d-icon-search" />
          <span>Search</span>
        </a>
        <form action="#" className="input-wrapper">
          <input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            placeholder="Search your keyword..."
            required=""
          />
          <button className="btn btn-search" type="submit">
            <i className="d-icon-search" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default StickyFooter;
