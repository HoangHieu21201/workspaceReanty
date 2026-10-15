/**
 * ==========================================================================
 * Reanty - Main Script
 * Senior Front-End Standard: Pure Vanilla JavaScript (No Frameworks / No Libraries)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* --- 1. Mobile Navigation Toggle --- */
  const toggleBtn = document.getElementById('headerToggle');
  const headerNav = document.getElementById('headerNav');

  if (toggleBtn && headerNav) {
    // Xử lý bật/tắt menu khi click nút 3 gạch
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = headerNav.classList.toggle('is-open');
      toggleBtn.classList.toggle('is-active');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Tự động đóng menu khi click ra ngoài khu vực menu
    document.addEventListener('click', function (e) {
      if (!headerNav.contains(e.target) && !toggleBtn.contains(e.target)) {
        headerNav.classList.remove('is-open');
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Đóng menu khi người dùng click vào bất kỳ link điều hướng nào
    const navLinks = headerNav.querySelectorAll('.header-nav__link, .header-nav__mobile-actions a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        headerNav.classList.remove('is-open');
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- 2. Hero Banner Interactive Thumbnails & Indicator --- */
  const heroThumbs = document.querySelectorAll('.hero__thumb');
  const heroNums = document.querySelectorAll('.hero__indicator-num');
  const heroIndicatorLine = document.querySelector('.hero__indicator-line-active');
  const heroImg = document.querySelector('.hero__img');
  const heroBanners = [
    './assets/images/banners/hero-banner.jpg',
    './assets/images/banners/house-thumb-2.jpg',
    './assets/images/banners/house-thumb-3.jpg'
  ];

  function setActiveHero(index) {
    if (index < 0 || index >= heroThumbs.length) return;

    heroThumbs.forEach(function (thumb, i) {
      if (i === index) {
        thumb.classList.add('hero__thumb--active');
      } else {
        thumb.classList.remove('hero__thumb--active');
      }
    });

    heroNums.forEach(function (num, i) {
      if (i === index) {
        num.classList.add('hero__indicator-num--active');
      } else {
        num.classList.remove('hero__indicator-num--active');
      }
    });

    if (heroIndicatorLine) {
      const offset = index * 22;
      heroIndicatorLine.style.transform = 'translateX(' + offset + 'px)';
    }

    if (heroImg && heroBanners[index]) {
      heroImg.style.transition = 'opacity 0.25s ease';
      heroImg.style.opacity = '0.35';
      setTimeout(function () {
        heroImg.src = heroBanners[index];
        heroImg.style.opacity = '1';
      }, 150);
    }
  }

  heroThumbs.forEach(function (thumb, index) {
    thumb.addEventListener('click', function () {
      setActiveHero(index);
    });
  });

  heroNums.forEach(function (num, index) {
    num.addEventListener('click', function () {
      setActiveHero(index);
    });
  });

  /* --- 3. Properties Section Interactive Gallery & Stepped Thumbnails --- */
  const propertiesData = [
    {
      tall: {
        src: './assets/images/products/prop-tall.jpg',
        alt: 'House 1 - Luxury Glass Villa with Pool'
      },
      top: {
        src: './assets/images/products/prop-kitchen.jpg',
        alt: 'House 1 - Modern Minimalist Kitchen Dining Area'
      },
      bottom: {
        src: './assets/images/products/prop-bedroom.jpg',
        alt: 'House 1 - Master Bedroom with Balcony View'
      }
    },
    {
      tall: {
        src: './assets/images/products/prop-house2-tall.jpg',
        alt: 'House 2 - Contemporary Villa at Twilight with Pool'
      },
      top: {
        src: './assets/images/products/prop-house2-top.jpg',
        alt: 'House 2 - Warm Panoramic Living Room at Dusk'
      },
      bottom: {
        src: './assets/images/products/prop-house2-bottom.jpg',
        alt: 'House 2 - Luxury Master Suite with City View'
      }
    },
    {
      tall: {
        src: './assets/images/products/prop-house3-tall.jpg',
        alt: 'House 3 - Contemporary White Villa with Swimming Pool'
      },
      top: {
        src: './assets/images/products/prop-house3-top.jpg',
        alt: 'House 3 - Minimalist Scandinavian Living Lounge'
      },
      bottom: {
        src: './assets/images/products/prop-house3-bottom.jpg',
        alt: 'House 3 - Modern Architectural Garden Terrace'
      }
    }
  ];

  const propThumbsContainer = document.querySelector('.properties__thumbs');
  const propThumbs = document.querySelectorAll('.properties__thumb');
  const propNums = document.querySelectorAll('.properties__indicator-num');
  const propIndicatorLine = document.querySelector('.properties__indicator-line-active');
  const propGalleryTall = document.getElementById('propGalleryTall');
  const propGalleryTop = document.getElementById('propGalleryTop');
  const propGalleryBottom = document.getElementById('propGalleryBottom');
  const galleryImages = [propGalleryTall, propGalleryTop, propGalleryBottom];

  function setActiveProperty(index) {
    if (index < 0 || index >= propertiesData.length) return;

    // 1. Cập nhật data-active cho container để kích hoạt hiệu ứng vươn to bậc thang của thumbnail
    if (propThumbsContainer) {
      propThumbsContainer.setAttribute('data-active', index.toString());
    }

    // 2. Cập nhật active class cho thumbnail
    propThumbs.forEach(function (thumb, i) {
      if (i === index) {
        thumb.classList.add('properties__thumb--active');
      } else {
        thumb.classList.remove('properties__thumb--active');
      }
    });

    // 3. Cập nhật số trang 1 2 3
    propNums.forEach(function (num, i) {
      if (i === index) {
        num.classList.add('properties__indicator-num--active');
      } else {
        num.classList.remove('properties__indicator-num--active');
      }
    });

    // 4. Trượt thanh chỉ báo màu cam tương ứng
    if (propIndicatorLine) {
      const offset = index * 19;
      propIndicatorLine.style.transform = 'translateX(' + offset + 'px)';
    }

    // 5. Đồng bộ chuyển mượt 3 ảnh lớn bên phải tương ứng với ngôi nhà
    const data = propertiesData[index];
    if (data) {
      galleryImages.forEach(function (img) {
        if (img) img.classList.add('is-switching');
      });

      setTimeout(function () {
        if (propGalleryTall && data.tall) {
          propGalleryTall.src = data.tall.src;
          propGalleryTall.alt = data.tall.alt;
        }
        if (propGalleryTop && data.top) {
          propGalleryTop.src = data.top.src;
          propGalleryTop.alt = data.top.alt;
        }
        if (propGalleryBottom && data.bottom) {
          propGalleryBottom.src = data.bottom.src;
          propGalleryBottom.alt = data.bottom.alt;
        }

        galleryImages.forEach(function (img) {
          if (img) img.classList.remove('is-switching');
        });
      }, 150);
    }
  }

  // Gắn sự kiện click thumbnail
  propThumbs.forEach(function (thumb, index) {
    thumb.addEventListener('click', function () {
      setActiveProperty(index);
    });
  });

  // Gắn sự kiện click số phân trang 1 2 3
  propNums.forEach(function (num, index) {
    num.addEventListener('click', function () {
      setActiveProperty(index);
    });
  });

  /* --- 4. Featured Property Filter Tabs Switching --- */
  const featuredTabs = document.querySelectorAll('.featured__tab');
  featuredTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      featuredTabs.forEach(function (t) {
        t.classList.remove('featured__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('featured__tab--active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  /* --- 5. Featured Property Swiper / Horizontal Drag-to-Scroll --- */
  const featuredGrid = document.querySelector('.featured__grid');
  if (featuredGrid) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    featuredGrid.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      isDown = true;
      hasDragged = false;
      featuredGrid.classList.add('is-dragging');
      startX = e.pageX - featuredGrid.offsetLeft;
      scrollLeft = featuredGrid.scrollLeft;
    });

    window.addEventListener('mouseup', function () {
      if (!isDown) return;
      isDown = false;
      featuredGrid.classList.remove('is-dragging');
    });

    featuredGrid.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      const x = e.pageX - featuredGrid.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 5) {
        hasDragged = true;
      }
      featuredGrid.scrollLeft = scrollLeft - walk;
    });

    // Ngăn chặn sự kiện click vào link/card nếu người dùng đang thực hiện thao tác kéo vuốt
    featuredGrid.addEventListener('click', function (e) {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        hasDragged = false;
      }
    }, true);
  }

  /* --- 6. Testimonials Slider --- */
  (function () {
    var slides = document.querySelectorAll('.testimonials__slide');
    var prevBtn = document.getElementById('testimonials-prev');
    var nextBtn = document.getElementById('testimonials-next');

    if (!slides.length || !prevBtn || !nextBtn) return;

    var current = 0;
    var total = slides.length;

    function showSlide(index) {
      slides.forEach(function (slide) {
        slide.classList.remove('is-active');
      });
      slides[index].classList.add('is-active');
    }

    showSlide(current);

    prevBtn.addEventListener('click', function () {
      current = (current - 1 + total) % total;
      showSlide(current);
    });

    nextBtn.addEventListener('click', function () {
      current = (current + 1) % total;
      showSlide(current);
    });

    var autoTimer = setInterval(function () {
      current = (current + 1) % total;
      showSlide(current);
    }, 6000);

    [prevBtn, nextBtn].forEach(function (btn) {
      btn.addEventListener('click', function () {
        clearInterval(autoTimer);
      });
    });
  }());

  /* --- 7. Newsletter Form Handler --- */
  (function () {
    var form = document.getElementById('newsletter-form');
    var btn = document.getElementById('newsletter-btn');
    var input = document.getElementById('newsletter-email');

    if (!form || !btn || !input) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!email) return;

      var originalText = btn.textContent;
      btn.textContent = 'Subscribed! ✓';
      btn.style.backgroundColor = '#10b981';
      input.value = '';

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
      }, 3000);
    });
  }());

  /* --- 8. Contact Form Handler --- */
  (function () {
    var form = document.getElementById('contact-form');
    var btn = document.getElementById('contact-btn');

    if (!form || !btn) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var originalText = btn.textContent;
      btn.textContent = 'Sent! ✓';
      btn.style.backgroundColor = '#10b981';
      form.reset();

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
      }, 3000);
    });
  }());

  /* --- 9. Horizontal Drag-to-Scroll Helper for Responsive Cards (Blog & Projects) --- */
  (function () {
    function enableHorizontalDrag(slider) {
      if (!slider) return;

      var isDown = false;
      var startX;
      var scrollLeft;
      var isDragging = false;

      slider.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        isDown = true;
        isDragging = false;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', function () {
        if (!isDown) return;
        isDown = false;
        slider.classList.remove('is-dragging');
      });

      slider.addEventListener('mouseup', function () {
        if (!isDown) return;
        isDown = false;
        setTimeout(function () {
          slider.classList.remove('is-dragging');
          isDragging = false;
        }, 50);
      });

      slider.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - slider.offsetLeft;
        var walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 4) {
          isDragging = true;
          slider.classList.add('is-dragging');
        }
        slider.scrollLeft = scrollLeft - walk;
      });

      // Ngăn chặn mở link nhầm khi người dùng chỉ đang thao tác kéo chuột
      slider.addEventListener('click', function (e) {
        if (isDragging) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    }

    var blogGrid = document.querySelector('.blog__grid');
    var projectsGrid = document.querySelector('.projects__grid');
    var featuredGrid = document.querySelector('.featured__grid');

    enableHorizontalDrag(blogGrid);
    enableHorizontalDrag(projectsGrid);
    enableHorizontalDrag(featuredGrid);
  }());

  /* --- 10. Footer Newsletter Form Handler --- */
  (function () {
    var form = document.getElementById('footer-newsletter-form');
    var input = document.getElementById('footer-email');
    var label = document.querySelector('.footer__newsletter-label');

    if (!form || !input) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!email) return;

      input.value = '';
      if (label) {
        var originalText = label.textContent;
        label.textContent = 'Thank you for subscribing! ✓';
        label.style.color = '#10B981';

        setTimeout(function () {
          label.textContent = originalText;
          label.style.color = '';
        }, 3500);
      }
    });
  }());

  /* --- 11. Footer Accordion Handler (Mobile Compact Footer) --- */
  (function () {
    var accordionBtns = document.querySelectorAll('.footer__accordion-btn');
    if (!accordionBtns.length) return;

    accordionBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // Chỉ hoạt động trên màn hình Mobile (< 768px)
        if (window.innerWidth >= 768) return;

        e.preventDefault();
        var item = btn.closest('.footer__accordion-item');
        if (!item) return;

        var isOpen = item.classList.contains('is-open');

        // Toggle trạng thái mở/đóng của nhóm
        if (isOpen) {
          item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Đồng bộ thuộc tính khi resize qua lại giữa desktop và mobile
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        accordionBtns.forEach(function (btn) {
          btn.setAttribute('aria-expanded', 'true');
        });
      } else {
        accordionBtns.forEach(function (btn) {
          var item = btn.closest('.footer__accordion-item');
          var isOpen = item && item.classList.contains('is-open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
    });
  }());
});




