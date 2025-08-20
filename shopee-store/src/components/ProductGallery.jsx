// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const ProductGallery = ({ images }) => {
    // State điều hướng slide/zoom
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const [thumbStart, setThumbStart] = useState(0);
    const maxThumbs = 8;

    // Chuẩn hóa mảng slides
    const slides = images.map((img) =>
        typeof img === 'string'
            ? { src: img, alt: '' }
            : {
                  src: img.src || img.thumb || '',
                  alt: img.alt || '',
                  thumb: img.thumb || img.src || '',
              }
    );

    // Các thumbnail đang hiển thị
    const visibleThumbs = slides.slice(thumbStart, thumbStart + maxThumbs);

    // Khi đổi selected thì tự động căn lại thumbnail slider
    useEffect(() => {
        if (selected < thumbStart) {
            setThumbStart(selected);
        } else if (selected >= thumbStart + maxThumbs) {
            setThumbStart(selected - maxThumbs + 1);
        }
    }, [selected]);

    // Điều hướng thumbnail
    const handleThumbLeft = () => {
        if (thumbStart > 0) setThumbStart(thumbStart - 1);
    };
    const handleThumbRight = () => {
        if (thumbStart < slides.length - maxThumbs) setThumbStart(thumbStart + 1);
    };

    // Điều hướng ảnh lớn
    const prevImage = () => setSelected((prev) => Math.max(prev - 1, 0));
    const nextImage = () => setSelected((prev) => Math.min(prev + 1, slides.length - 1));

    if (!slides.length) return null;

    return (
        <div className="product-gallery">
            <div className="product-single-carousel owl-carousel owl-theme owl-nav-inner">
                <div className="owl-stage-outer">
                    <div className="owl-stage" style={{ width: '100%' }}>
                        <div className="owl-item active" style={{ width: '100%' }}>
                            <figure className="product-image" style={{ position: 'relative' }}>
                                <img
                                    src={slides[selected].src}
                                    alt={slides[selected].alt || `Ảnh sản phẩm ${selected + 1}`}
                                    width={400}
                                    height={400}
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: 8,
                                        cursor: 'zoom-in',
                                        transition: 'opacity 0.2s',
                                    }}
                                    onClick={() => setOpen(true)}
                                />
                            </figure>
                        </div>
                    </div>
                </div>
                {/* Điều hướng next/prev */}
                <div className="owl-nav">
                    <button type="button" title="previous" className={`owl-prev${selected === 0 ? ' disabled' : ''}`} onClick={prevImage} disabled={selected === 0}>
                        <i className="d-icon-angle-left" />
                    </button>
                    <button type="button" title="next" className={`owl-next${selected === slides.length - 1 ? ' disabled' : ''}`} onClick={nextImage} disabled={selected === slides.length - 1}>
                        <i className="d-icon-angle-right" />
                    </button>
                </div>
            </div>
            {/* Thumbnail */}
            <div className="product-thumbs-wrap">
                <button className="thumb-up" onClick={handleThumbLeft} disabled={thumbStart === 0} style={{ marginRight: 6 }}>
                    <i className="fas fa-chevron-left" />
                </button>
                <div className="product-thumbs owl-carousel" style={{ display: 'flex' }}>
                    {visibleThumbs.map((img, idx) => {
                        const globalIdx = thumbStart + idx;
                        return (
                            <div className={`owl-item${selected === globalIdx ? ' active' : ''}`} key={globalIdx} style={{ width: 90, cursor: 'pointer', marginRight: 8 }} onClick={() => setSelected(globalIdx)}>
                                <div className={`product-thumb${selected === globalIdx ? ' active' : ''}`}>
                                    <img
                                        src={img.thumb || img.src}
                                        alt={img.alt}
                                        width={80}
                                        height={80}
                                        style={{
                                            border: selected === globalIdx ? '2px solid #ff6600' : '1px solid #ddd',
                                            borderRadius: 6,
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="thumb-down" onClick={handleThumbRight} disabled={thumbStart >= images.length - maxThumbs} style={{ marginLeft: 6 }}>
                    <i className="fas fa-chevron-right" />
                </button>

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                    index={selected}
                    plugins={[Zoom, Thumbnails]}
                    // Sync index khi chọn ảnh khác ngoài thumbnail
                    on={{
                        view: ({ index }) => setSelected(index),
                    }}
                />
            </div>
        </div>
    );
};

export default ProductGallery;
