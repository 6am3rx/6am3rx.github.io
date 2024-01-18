'use strict';

/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var $ = window.jQuery;
var tween = window.TweenMax; // Testimonial Author Photo fixed.

$('.ghostkit-testimonial .ghostkit-testimonial-photo').parent().find('.ghostkit-testimonial-content').addClass('ghostkit-testimonial-content-with-photo'); // Masonry blog grid.

$('.nk-blog-grid-masonry > .row').each(function () {
  var masonryItem = new window.Masonry(this);
  $(this).imagesLoaded().progress(function () {
    masonryItem.layout();
  });
}); // WooCommerce add labels on cart list items

function addaCartTableLabels() {
  $('.woocommerce table.shop_table tr.woocommerce-cart-form__cart-item td').each(function () {
    var dataTitle = $(this).attr('data-title');

    if (0 === $(this).find('h5').length) {
      if ('undefined' !== typeof dataTitle) {
        $(this).prepend("<h5 class=\"h6\">".concat(dataTitle, ":</h5><div class=\"nk-gap-1\"></div>"));
      }

      if ($(this).hasClass('product-name')) {
        $(this).find('a').wrap('<h2 class="nk-post-title h4">');
      }
    }
  });
} // WooCommerce cart.


$(document.body).on('wc_fragments_loaded wc_fragments_refreshed', function () {
  var $badge = $('.squadforce-woocommerce-cart-count');
  var $smallCartCount = $('.widget_shopping_cart_content:eq(0) [data-squadforce-cart-count]');
  var $smallCart = $('.nk-cart-dropdown');
  var count = parseInt($smallCartCount.attr('data-squadforce-cart-count'), 10);
  addaCartTableLabels(); // add badge count.

  if ('number' === typeof count) {
    $badge.text(count);
    $badge[count ? 'removeClass' : 'addClass']('d-none');
  } // change position of items in Mini cart.


  $smallCart.find('.mini_cart_item').each(function () {
    var $this = $(this);
    var $remove = $this.find('.remove_from_cart_button');
    var $thumb = $this.find('img');
    var $quantity = $this.find('.quantity');
    var $title = $thumb.parent().addClass('nk-shop-cart-item-title');
    var $thumbWrap = $('<div class="nk-shop-cart-item-thumb">').appendTo($this);
    var $contWrap = $('<div class="nk-shop-cart-item-cont">').appendTo($this);
    $this.addClass('nk-widget-post');
    $remove.addClass('nk-cart-remove-item');
    $remove.html('<span class="ion-android-close"></span>');
    $thumbWrap.append($thumb);
    $thumb.wrap("<a href=\"".concat($title.attr('href'), "\" class=\"nk-post-image\">"));
    $contWrap.append($title);
    $title.wrap('<h3 class="nk-post-title">');
    $title.parent().prepend($remove);
    $contWrap.append($quantity);
    $quantity.wrap('<div class="nk-product-price">');
  });
}); // WooCommerce single product gallery. Must be replaced with the designer of the Woo gallery

var $woocommerceProductGalleryWrapper = $('.woocommerce-product-gallery__wrapper');
$woocommerceProductGalleryWrapper.find('div.woocommerce-product-gallery__image').addClass('nk-gallery-item-box');
$woocommerceProductGalleryWrapper.find('a').addClass('nk-gallery-item');
$woocommerceProductGalleryWrapper.find('a').prepend('<div class="nk-gallery-item-overlay"><span class="ion-eye"></span></div>');
$(document.body).on('wc-product-gallery-after-init', function () {
  var $$thumbnailsWrapper = $('.woocommerce-product-gallery ol.flex-control-nav.flex-control-thumbs li');
  $$thumbnailsWrapper.addClass('col-6 col-md-4');
  $$thumbnailsWrapper.find('img').wrap('<div class="nk-gallery-item-box"><div class="nk-gallery-item">');
  $$thumbnailsWrapper.find('img').after('<div class="nk-gallery-item-overlay"><span class="ion-eye"></span></div>');
});
$(document.body).on('click', 'ol.flex-control-nav.flex-control-thumbs .nk-gallery-item-overlay', function (e) {
  e.preventDefault();
  $(this).parents('div.nk-gallery-item:eq(0)').find('img').click();
}); // WooCommerce review form. Add placeholders

$('.woocommerce input#author').attr('placeholder', $('.comment-form-author label').text()).addClass('form-control');
$('.woocommerce input#email').attr('placeholder', $('.comment-form-email label').text()).addClass('form-control');
$('.woocommerce textarea#comment').attr('placeholder', $('.comment-form-comment label').text()).addClass('form-control'); // WooCommerce review form. Add h4 class for reply title

$('.woocommerce .comment-respond .comment-reply-title, .woocommerce #reviews #comments h2.woocommerce-Reviews-title').addClass('h4'); // TinyMCE for bbpress.

$(document).on('tinymce-editor-init', function (event, editor) {
  if (('bbp_reply_content' === editor.id || 'bbp_topic_content' === editor.id) && editor.dom) {
    var body = editor.dom.select('body');

    if ('undefined' !== typeof body[0]) {
      body[0].style.backgroundColor = '#293139';
      body[0].style.color = '#7f8b92';
      body[0].style.margin = '0px';
      body[0].style.padding = '0px';
      var css = 'a { color: #dd163b;}';
      var head = editor.dom.doc.head || editor.dom.doc.getElementsByTagName('head')[0];
      var style = editor.dom.doc.createElement('style');
      style.type = 'text/css';

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(editor.dom.doc.createTextNode(css));
      }

      head.appendChild(style);
    }
  }
}); // Animations for Sign Forms.

function animateForms($form, $showItems) {
  var inverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  tween.set($form, {
    height: 'auto'
  });
  tween.set($form, {
    height: $form.outerHeight(true)
  });
  var $hideItems = $form.find('.nk-sign-form-lost.active').add($form.find('.nk-sign-form-login.active')).add($form.find('.nk-sign-form-register.active'));
  tween.set($hideItems, {
    position: 'absolute',
    display: 'block',
    x: 0
  });
  tween.set($showItems, {
    position: 'absolute',
    display: 'none',
    y: inverse ? '-20px' : '20px'
  });
  tween.to($hideItems, 0.2, {
    opacity: 0,
    y: inverse ? '20px' : '-20px',
    display: 'none',
    force3D: true
  });
  tween.to($showItems, 0.2, {
    opacity: 1,
    display: 'block',
    y: '0px',
    force3D: true,
    onComplete: function onComplete() {
      tween.set($showItems, {
        position: 'relative'
      });
      var formHeight = $form.outerHeight(true);
      tween.set($form, {
        height: 'auto'
      });
      var formNewHeight = $form.outerHeight(true);
      tween.set($form, {
        height: formHeight
      });
      tween.to($form, 0.2, {
        height: formNewHeight
      });
    }
  });
  $hideItems.removeClass('active');
  $showItems.addClass('active');
}

function showLoginForm($form) {
  var $formLogin = $form.find('.nk-sign-form-login');
  animateForms($form, $formLogin, true);
}

function showLostForm($form) {
  var $formLost = $form.find('.nk-sign-form-lost');
  animateForms($form, $formLost);
}

function showRegisterForm($form) {
  var $formRegister = $form.find('.nk-sign-form-register');
  animateForms($form, $formRegister);
}

$(document).on('click', '.nk-sign-form-container .nk-sign-form-login-toggle:not(.active)', function (e) {
  e.preventDefault();
  showLoginForm($(this).closest('.nk-sign-form-container'));
});
$(document).on('click', '.nk-sign-form-container .nk-sign-form-lost-toggle:not(.active)', function (e) {
  e.preventDefault();
  showLostForm($(this).closest('.nk-sign-form-container'));
});
$(document).on('click', '.nk-sign-form-container .nk-sign-form-register-toggle:not(.active)', function (e) {
  e.preventDefault();
  showRegisterForm($(this).closest('.nk-sign-form-container'));
});
/******/ })()
;