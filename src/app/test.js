/*
 ____    ____          _
|_   \  /   _|        (_)
  |   \/   |   ,--.   __   _ .--.
  | |\  /| |  `'_\ : [  | [ `.-. |
 _| |_\/_| |_ // | |, | |  | | | |
|_____||_____|\'-;__/[___][___||__]
Main.js
http://patorjk.com/software/taag/#p=display&f=Varsity&t=Main
*/
let state = {};
let noise;
const smartphones =
  "screen and (max-width: 480px) and (orientation: portrait), screen and (max-height: 480px) and (orientation: landscape)";

function initImageGlitch() {
  jQuery.fn.noisy = function (opts) {
    opts = jQuery.extend({}, jQuery.fn.noisy.defs, opts);
    const instance = this;

    const _pt = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
    ];

    const element = jQuery(this);
    const rnd1 = [Math.random() + 1, Math.random() + 1, Math.random() + 1];
    const rnd2 = [0, 0, 0];
    let cnt = 0;
    const arr = [];
    let loop = null;
    let t = null;
    const { rows } = opts;
    let { ratio } = opts;
    const { img } = opts;
    let mshov = false;
    const { id } = opts;

    this.run = function () {
      let i;
      for (i = 0; i < 3; i++) {
        if (rnd1[i] >= 1) {
          --rnd1[i];
          rnd2[i] = Math.random() / 4 + 0.03;
        }
        rnd1[i] += rnd2[i];
        cnt += (38 - cnt) * 0.25;
        _pt[i].x = Math.ceil(
          Math.sin(rnd1[i] * Math.PI * 2) * rnd2[i] * cnt * 2
        );
        _pt[i].y = 0;
      }
      const num =
        (Math.abs(_pt[0].x) + Math.abs(_pt[1].x) + Math.abs(_pt[2].x) + 8) / 4;

      i = rows;
      while ((i -= 1)) {
        const _off =
          Math.sin((i / rows) * Math.PI * (Math.random() / 8 + 1)) *
          0.8 *
          num *
          num;
        arr[i].css({
          transform: `translateZ(0) translate3d(0, 0, 0) translateX(${_off}px)`,
          webkitTransform: `translateZ(0) translate3d(0, 0, 0) translateX(${_off}px)`,
        });
      }
    };

    this.go = function () {
      mshov = true;
      clearInterval(loop);
      loop = setInterval(this.run, 30);
    };

    this.pause = function () {
      mshov = false;
      clearInterval(loop);
      loop = null;

      for (let i = 0; i < rows; i++) {
        arr[i].css({
          transform: "translateZ(0) translate3d(0, 0, 0)",
          webkitTransform: "translateZ(0) translate3d(0, 0, 0)",
        });
      }
    };

    this.updateContainerBounds = function () {
      const containerWidth = $(id).outerWidth();
      const containerHeight = $(id).outerHeight();

      if (ratio < containerHeight / containerWidth) {
        const newHeight = containerWidth * ratio;
        element.css({
          height: `${newHeight}px`,
          padding: `${(containerHeight - newHeight) / 2}px 0px`,
        });
      } else {
        const newWidth = containerHeight / ratio;
        element.css({
          height: `${containerHeight}px`,
          padding: `0px ${(containerWidth - newWidth) / 2}px`,
        });
      }
    };

    this.changeImage = function (newImage, imageName) {
      const containerWidth = $(id).outerWidth();
      const containerHeight = $(id).outerHeight();

      const img = new Image();
      img.onload = function () {
        ratio = this.height / this.width;

        for (let i = 0; i < rows; i++) {
          element
            .find("div")
            .eq(i)
            .attr("alt", `Image of clothing: ${imageName} part ${i}`);
          element
            .find("div")
            .eq(i)
            .css({
              backgroundImage: `url(${newImage})`,
            });
        }

        if (ratio < containerHeight / containerWidth) {
          const newHeight = containerWidth * ratio;
          element.css({
            height: `${newHeight}px`,
            padding: `${(containerHeight - newHeight) / 2}px 0px`,
          });
        } else {
          const newWidth = containerHeight / ratio;
          element.css({
            height: `${containerHeight}px`,
            padding: `0px ${(containerWidth - newWidth) / 2}px`,
          });
        }
      };
      img.src = newImage;
    };

    element.css({
      position: "relative",
      padding: `0px calc((430px - ${430 * ratio}px) / 2)`,
    });

    for (let i = 0; i < rows; i++) {
      const pos = `${(i * 100) / rows}%`;
      element.append("<div></div>");
      element
        .find("div")
        .eq(i)
        .css({
          backgroundImage: `url(${img})`,
          backgroundPosition: `0px ${pos == "0%" ? "0.2%" : pos}`,
          backgroundSize: "cover",
          width: "100%",
          flex: "1",
          cursor: "pointer",
          transform: "translateZ(0) translate3d(0, 0, 0)",
          webkitTransform: "translateZ(0) translate3d(0, 0, 0)",
        });
      arr.push(element.find("div").eq(i));
    }

    if (opts.auto) {
      t = setInterval(() => {
        if (mshov) return;
        instance.go();

        setTimeout(instance.pause(), (opts.delay / 2) * Math.random());
      }, opts.delay);
    }

    this.initialize = function () {
      return this;
    };

    return this.initialize();
  };

  jQuery.fn.noisy.defs = {
    rows: 0,
    ratio: 1,
    img: "",
    auto: false,
    delay: 7000,
  };
}

function initModal() {
  $(".modal-open").on("click", function (e) {
    const $this = $(this);
    const modal = $($this).data("modal");

    $(modal).parents(".modal-overlay").addClass("modal-opened");
    setTimeout(() => {
      $(modal).addClass("modal-opened");
    }, 350);

    $(document).on("click", (e) => {
      const target = $(e.target);

      if ($(target).hasClass("modal-overlay")) {
        $(target)
          .find(".modal-modal")
          .each(function () {
            $(this).removeClass("modal-opened");
          });
        setTimeout(() => {
          $(target).removeClass("modal-opened");
        }, 350);
      }
    });
  });

  $(".modal-close").on("click", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation;

    const $this = $(this);
    const modal = $($this).data("modal");

    $(modal).removeClass("modal-opened");
    setTimeout(() => {
      $(modal).parents(".modal-overlay").removeClass("modal-opened");
    }, 350);
  });
}

function openModal(modal) {
  if (modal.indexOf("#") == -1) {
    modal = `#${modal}`;
  }

  $(modal).parents(".modal-overlay").addClass("modal-opened");
  setTimeout(() => {
    $(modal).addClass("modal-opened");
  }, 350);

  $(document).on("click", (e) => {
    const target = $(e.target);

    if ($("#model-modal").hasClass("modal-opened")) return;

    if ($(target).hasClass("modal-overlay")) {
      $(target)
        .find(".modal-modal")
        .each(function () {
          $(this).removeClass("modal-opened");
        });
      setTimeout(() => {
        $(target).removeClass("modal-opened");
      }, 350);
    }
  });
}

function closeModal(modal) {
  if (modal.indexOf("#") == -1) {
    modal = `#${modal}`;
  }
  $(modal).removeClass("modal-opened");
  setTimeout(() => {
    $(modal).parents(".modal-overlay").removeClass("modal-opened");
  }, 350);
}

function isSafari() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("safari") != -1) {
    if (ua.indexOf("chrome") > -1) {
      return false;
    }
    return true;
  }
}

function turnScreenOn(secs) {
  if (isSafari()) {
    $(".awge-content").css(
      "-webkit-animation",
      `turn-on-safari ${secs}s linear`
    );
  } else {
    $(".awge-content").css("animation", `turn-on ${secs}s linear`);
  }
}

function turnScreenOff(secs) {
  if (isSafari()) {
    $(".awge-content").css(
      "-webkit-animation",
      `turn-off-safari ${secs}s linear forwards`
    );
  } else {
    $(".awge-content").css("animation", `turn-off ${secs}s linear forwards`);
  }
}

function preloader() {
  const img1 = new Image();
  const img2 = new Image();
  const img3 = new Image();
  const img4 = new Image();
  const img5 = new Image();
  const img6 = new Image();
  const img7 = new Image();
  const img8 = new Image();
  const img9 = new Image();
  const img10 = new Image();
  const img11 = new Image();
  const img12 = new Image();
  const img13 = new Image();
  const img14 = new Image();

  img1.src = "https://dwvo2npct47gg.cloudfront.net/gifs/question-block-red.gif";
  img2.src = "https://dwvo2npct47gg.cloudfront.net/gifs/pager.gif";
  img3.src = "https://dwvo2npct47gg.cloudfront.net/gifs/home-background.gif";
  img4.src = "https://dwvo2npct47gg.cloudfront.net/gifs/vhs-camera.gif";
  img5.src = "https://dwvo2npct47gg.cloudfront.net/gifs/awgeDVD.gif";
  img6.src = "https://dwvo2npct47gg.cloudfront.net/gifs/testing-home.gif";
  img7.src = "https://dwvo2npct47gg.cloudfront.net/gifs/tv-colors.gif";
  img8.src = "https://dwvo2npct47gg.cloudfront.net/gifs/42021/cap.gif";
  img9.src = "https://dwvo2npct47gg.cloudfront.net/gifs/testing-3.gif";
  img10.src = "https://dwvo2npct47gg.cloudfront.net/gifs/awgeForum.gif";
  img11.src =
    "https://dwvo2npct47gg.cloudfront.net/gifs/about-background-combine.gif";
  img12.src = "https://dwvo2npct47gg.cloudfront.net/gifs/hats_2.gif";

  // merch
  img13.src =
    "https://dwvo2npct47gg.cloudfront.net/images/holiday22/Yellow-Front.png";
  img14.src =
    "https://dwvo2npct47gg.cloudfront.net/images/holiday22/Red-Front.png";
}

function shopPreloader() {
  // collect all images from shop object in defintiions
  let images = [];
  for (let type in shop) {
    for (let item in shop[type]) {
      images = images.concat(shop[type][item].images);
    }
  }
  // console.debug("Shop images:", images);
}

function notify(message) {
  $("#notify-message").text(message.toUpperCase());
  openModal("notify-modal");
}

function startTextGlitch() {
  $(".product-glitch-placeholder").addClass("product-glitch");
}

function stopTextGlitch() {
  $(".product-glitch-placeholder").removeClass("product-glitch");
}

function initTerms() {
  $(".awge-terms").on("click", () => {
    newPage("terms");
  });
  $(".awge-privacy").on("click", () => {
    newPage("privacy");
  });
}

function printCredits() {
  // console.log("                                                        \
  //         \n      _  ____      ____   ______  ________                 \
  //         \n     / \\|_  _|    |_  _|.' ___  ||_   __  |               \
  //         \n    / _ \\ \\ \\  /\\  / / / .'   \\_|  | |_ \\_|          \
  //         \n   / ___ \\ \\ \\/  \\/ /  | |   ____  |  _| _             \
  //         \n _/ /   \\ \\_\\  /\\  /   \\ `.___]  |_| |__/ |           \
  //         \n|____| |____|\\/  \\/     `._____.'|________|              \
  //         \n____________________________________________               \
  //         \n____________________________________________               \
  //         \n                                                           \
  //         \nCreated by Ilya Zaidze and Alex Shortt                     \
  //         \nAlex Shortt :: Developer                                   \
  //         \n  >Twitter: @_alexshortt                                   \
  //         \n  >Instagram: @alexander.shortt                            \
  //         \nIlya Zaidze :: Creative + Design                           \
  //         \n  >Twitter: @ilya2x                                        \
  //         \n  >Instagram: @ilya2x                                      \
  //         ");
}

function yams() {
  return "Miss you everyday, you will never be forgotten. RIP A$AP YAMS FOREVER.";
}

function isMobileView() {
  const mq = window.matchMedia(smartphones);
  return mq.matches;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*
 _______                       _    _
|_   __ \                     / |_ (_)
  | |__) |,--.   .--./) ,--. `| |-'__   .--.   _ .--.
  |  ___/`'_\ : / /'`\;`'_\ : | | [  |/ .'`\ \[ `.-. |
 _| |_   // | |,\ \._//// | |,| |, | || \__. | | | | |
|_____|  \'-;__/.',__` \'-;__/\__/[___]'.__.' [___||__]
               ( ( __))
Pagation.js
http://patorjk.com/software/taag/#p=display&f=Varsity&t=Pagation
*/

function pageSwitch(path) {
  const page = (path.replace("/", "") || "blank").split("?")[0];
  switch (page) {
    case "blank":
      changePage("./pages/landing.html", 3.4);
      break;
    case "home":
      changePage("./pages/home.html", 3.4);
      break;
    case "about":
      changePage("./pages/about.html", 3.4);
      break;
    case "contact":
      changePage("./pages/contact.html", 3.4);
      break;
    case "shop":
      changePage("./pages/shop.html", 3.4);
      break;
    case "product":
      changePage("./pages/product.html", 3.4);
      break;
    case "videos":
      changePage("./pages/videos.html", 3.4);
      break;
    case "pictures":
      changePage("./pages/pictures.html", 3.4);
      break;
    case "privacy":
      changePage("./pages/privacy.html", 3.4);
      break;
    case "terms":
      changePage("./pages/terms.html", 3.4);
      break;
    case "forum":
      changePage("./pages/forum.html", 3.4);
      break;
    case "awgeDVD":
      changePage("./pages/awgeDVD.html", 3.4);
      break;
    case "awgeDVD-vol-1":
      changePage("./pages/awgeDVD-vol-1.html", 3.4);
      break;
    case "awgeDVD-vol-2":
      changePage("./pages/awgeDVD-vol-2.html", 3.4);
      break;
    case "awgeDVD-vol-3":
      changePage("./pages/awgeDVD-vol-3.html", 3.4);
      break;
    case "media":
      changePage("./pages/media.html", 3.4);
      break;
    case "directed":
      changePage("./pages/directed.html", 3.4);
      break;
    case "artists":
      changePage("./pages/artists.html", 3.4);
      break;
    case "people":
      changePage("./pages/people.html", 3.4);
      break;
    case "artist":
      changePage("./pages/artist.html", 3.4);
      break;
    case "sweepstakes":
      changePage("./pages/sweepstakes.html", 3.4);
      break;
    case "sweepstakes-rules":
      changePage("./pages/sweepstakes-rules.html", 3.4);
      break;
    default:
      changePage("./pages/error.html", 3.4);
      break;
  }
}

function newPage(path) {
  state.path = path;
  window.history.pushState(state, null, path);
  pageSwitch(path);
}

// @wafwoof: what is this even for?
function initHash() {
  // fix for product removing url query
  let url_query_id = getParameterByName("id");
  if (url_query_id != null && window.location.pathname == "/product") {
    newPage(`product?id=${url_query_id}`);
  } else {
    // original code
    state.path = window.location.pathname;
    window.history.replaceState(state, null, window.location.pathname);
    newPage(state.path);
  }
}

window.onpopstate = function (event) {
  console.log(event.state);
  pageSwitch(event.state.path);
  state = event.state;
};

function landingLoad() {
  // Audio is added to the page
  // $(document).keypress(e => {
  //   if (e.which == 13) {
  //     if (window.location.pathname == "/") {
  //       newPage("home")
  //       $("body").append(
  //         '<audio src="https://dwvo2npct47gg.cloudfront.net/audio/tyler-awge.mp3" type="audio/mp3" autoplay></audio>'
  //       )
  //     }
  //   }
  // })

  // $("#landing-start-button").click(() => {
  //   newPage("home")
  //   $("body").append(
  //     '<audio src="https://dwvo2npct47gg.cloudfront.net/audio/tyler-awge.mp3" type="audio/mp3" autoplay></audio>'
  //   )
  // })

  // $("#landing-content").click(() => {
  //   newPage("home");
  //   $("body").append(
  //     '<audio src="https://dwvo2npct47gg.cloudfront.net/audio/tyler-awge.mp3" type="audio/mp3" autoplay></audio>'
  //   );
  // });
  // Play same audio but on loop
  $(document).keypress((e) => {
    if (e.which == 13) {
      if (window.location.pathname == "/") {
        newPage("home");
        $("body").append(
          '<audio src="https://dwvo2npct47gg.cloudfront.net/audio/grim.mp3" type="audio/mp3" autoplay loop></audio>'
        );
      }
    }
  });

  $("#landing-start-button").click(() => {
    newPage("home");
    $("body").append(
      '<audio src="https://dwvo2npct47gg.cloudfront.net/audio/grim.mp3" type="audio/mp3" autoplay loop></audio>'
    );
  });

  $("#landing-content").click(() => {
    newPage("home");
    $("body").append(
      '<audio src="https://dwvo2npct47gg.cloudfront.net/audio/grim.mp3" type="audio/mp3" autoplay loop></audio>'
    );
  });
}

function homeLoad() {
  $(".product-button").click(() => {
    newPage("shop");
  });
  $(".about-button").click(() => {
    newPage("about");
  });
  $("#home-awgeDVD").click(() => {
    newPage("awgeDVD");
  });
  $("#pictures-button").click(() => {
    newPage("awgeDVD");
  });
  $(".contact-button").click(() => {
    newPage("contact");
  });
  $(".hm-button").click(() => {
    window.open("https://humanmade.jp/");
  });
  $(".testing-button").click(() => {
    window.open("https://tstng.co/");
  });
  $(".rallyrace-button").click(() => {
    // window.open("https://asaprocky.com");
    window.open(
      "https://forms.sonymusicfans.com/campaign/asaprocky-dontbedumb/"
    );
  });
  $(".forums-button").click(() => {
    // window.open("http://forums.awgeshit.com", "_self")
    newPage("forum");
  });
  $(".home-video-gif").click(() => {
    newPage("media");
  });
  $(".home-video-text").click(() => {
    newPage("media");
  });
  $("home-navbar-text").click(() => {
    newPage("home");
  });
  $("#home-video-wrapper-mobile").click(() => {
    newPage("media");
  });
}

function contactLoad() {
  $("#contact-send-awge").click(() => {
    if (
      $("#contact-email").val() == "" ||
      $("#contact-subject").val() == "" ||
      $("#contact-message").val() == ""
    ) {
      notify("Fill in all fields");
      return;
    }

    // const xhr = new XMLHttpRequest()
    // xhr.open(
    //   "POST",
    //   `https://judtgvulg8.execute-api.us-east-1.amazonaws.com/prod/email-contact?email=${encodeURIComponent(
    //     $("#contact-email").val()
    //   )}&subject=${encodeURIComponent(
    //     $("#contact-subject").val()
    //   )}&message=${encodeURIComponent($("#contact-message").val())}`,
    //   true
    // )
    // xhr.send()
    fetch(`https://judtgvulg8.execute-api.us-east-1.amazonaws.com/prod/email-contact?
      email=${encodeURIComponent($("#contact-email").val())}
      &subject=${encodeURIComponent($("#contact-subject").val())}
      &message=${encodeURIComponent($("#contact-message").val())}`);

    // Respond to user input
    $("#contact-email").val("");
    $("#contact-subject").val("");
    $("#contact-message").val("");
    notify("MESSAGE SENT TO AWGE");
  });

  $("#contact-send-order-support").click(() => {
    if (
      $("#contact-email").val() == "" ||
      $("#contact-subject").val() == "" ||
      $("#contact-message").val() == ""
    ) {
      notify("Fill in all fields");
      return;
    }

    // const xhr = new XMLHttpRequest()
    // xhr.open(
    //   "POST",
    //   `https://judtgvulg8.execute-api.us-east-1.amazonaws.com/prod/email-support?email=${encodeURIComponent(
    //     $("#contact-email").val()
    //   )}&subject=${encodeURIComponent(
    //     $("#contact-subject").val()
    //   )}&message=${encodeURIComponent($("#contact-message").val())}`,
    //   true
    // )
    // xhr.send()
    fetch(`https://judtgvulg8.execute-api.us-east-1.amazonaws.com/prod/email-support?
      email=${encodeURIComponent($("#contact-email").val())}
      &subject=${encodeURIComponent($("#contact-subject").val())}
      &message=${encodeURIComponent($("#contact-message").val())}`);

    $("#contact-email").val("");
    $("#contact-subject").val("");
    $("#contact-message").val("");
    notify("MESSAGE SENT TO ORDER SUPPORT");
  });

  autosize($("#contact-email"));
  autosize($("#contact-subject"));
  autosize($("#contact-message"));
}

function productLoad() {
  shopPreloader();

  $("#product-option-1").click(() => {
    changeShopType(1);
  });

  $("#product-option-2").click(() => {
    changeShopType(2);
  });

  $("#product-option-3").click(() => {
    changeShopType(3);
  });

  $("#product-option-4").click(() => {
    changeShopType(4);
  });

  $("#product-option-tstng").click(() => {
    window.open("https://tstng.co/store.html");
  });

  $("#product-item-decrease").click(() => {
    // changeShopPage(-1)
    advanceProductShot(-1);
  });

  $("#product-item-increase").click(() => {
    // changeShopPage(1)
    advanceProductShot(1);
  });

  $("#product-buy-button").click(() => {
    if (shop[currentType][currentItem.index].sizes == null) {
      if (!isOutOfStock(`${shop[currentType][currentItem.index].baseSKU}-OS`)) {
        // if (!isOutOfStock(`${shop[currentType][currentItem.index].baseSKU}`)) {
        addToCart();
      }
    } else if (
      !isOutOfStock(
        `${shop[currentType][currentItem.index].baseSKU}-${currentItem.size}`
      )
    ) {
      // } else if (!isOutOfStock(`${shop[currentType][currentItem.index].baseSKU}`)) {
      addToCart();
    }
  });

  $("#cart-checkout").click(() => {
    cleanCart();
    if (Object.keys(getCart()).length == 0) return;
    closeModal("cart-modal");
    openCheckoutLink();
  });

  $(".product-items-item").click(() => {
    if (shop[currentType][currentItem.index].camera != null) {
      loadModel(
        shop[currentType][currentItem.index].filename,
        shop[currentType][currentItem.index].camera
      );
      openModal("model-modal");
    }
    const localPrice =
      shop[currentType][currentItem.index].price == "Sold Out"
        ? "Sold Out"
        : `$${shop[currentType][currentItem.index].price}`;
    $("#model-price").text(localPrice);
  });

  const img = new Image();
  img.onload = function () {
    $("#product-item").html("");

    noise = $("#product-item").noisy({
      rows: 30,
      img: resolveImgURL(shop[currentType][1].images[0]),
      ratio: this.height / this.width,
      id: "#product-item",
    });

    window.addEventListener("resize", () => {
      noise.updateContainerBounds();
    });

    $("#product-item-mobile").css(
      "background-image",
      resolveImgURL(shop[currentType][1].images[0])
    );

    // 2024-7: UPDATED REDIRECT LOGIC FOR SHOP PRODUCTS
    let urlQuery_id = getParameterByName("id");
    let shopRouteMap = {};
    for (let item in shop[1]) {
      shopRouteMap[shop[1][item].baseSKU] = item;
    }
    if (urlQuery_id != null) {
      // console.log("Checking for product:", urlQuery_id, "in shopRouteMap:", shopRouteMap);
      if (shopRouteMap[urlQuery_id] != null) {
        setShopProduct(shopRouteMap[urlQuery_id]);
      } else {
        newPage("shop");
      }
    }

    // Temporary redirect until size selection is fixed.
    window.location = "https://live.awge.com";

    console.debug("Product loaded:", urlQuery_id);
  };

  img.src = resolveImgURL(shop[currentType][1].images[0]);
  hydrateCart();

  // what is this even for?
  // function newFunction() {
  //   return currentItem.size
  // }
}

function resolveImgURL(name) {
  // return `https://dwvo2npct47gg.cloudfront.net/images/${name}`
  return name;
}

function messageLoad() {
  $("#message-order-num").text(orderData.num);

  $("#checkout-close-button").on("click", () => {
    localStorage.cart = "";
    newPage("");
  });
}

function videosLoad() {
  buildVideoPlayer();

  const id = getParameterByName("id");
  if (videos[id] != null) {
    openFullscreenVideo(id);
  } else {
    // newPage("videos");
  }
}

function picturesLoad() {
  // $(".pictures-container").click(() => {
  //   return
  //   $(".pictures-container").toggleClass("pictures-max-container")
  //   const image = event.target

  //   const trueTop =
  //     $(image).offset().top - $(".pictures-container").offset().top

  //   $(".pictures-content").animate(
  //     {
  //       scrollTop: trueTop,
  //     },
  //     0
  //   )
  // })
  return;
}

function directedLoad() {
  buildDirectedPlayer();

  const id = getParameterByName("id");
  if (directed[id] != null) {
    openDirectedVideo(id);
  } else {
    // newPage("directed");
  }
}

function awgeDVDVolLoad() {
  $("#dvd-video").get(0).load();

  /*
  $("#dvd-video").on('click', function() {
      newPage("home");
  });

  $(document).ready(function() {
      var x = setInterval(function() {
          if ($("#dvd-video").get(0).paused) {
              $("#dvd-video").get(0).play();
          }
          else {
              clearInterval(x);
              console.log("ok");
          }
      }, 500)
  });
  */
}

function toggleVideoPlay(id) {
  if (!$(id).get(0).paused) {
    !$(id).get(0).pause();
  } else {
    !$(id).get(0).play();
  }
}

function awgeDVDLoad() {
  $("#dvd-video").on("click", () => {
    newPage("home");
  });

  $("#awgedvd-vol-1").on("click", () => {
    newPage("awgeDVD-vol-1");
  });
  $("#awgedvd-vol-2").on("click", () => {
    newPage("awgeDVD-vol-2");
  });
  $("#awgedvd-vol-3").on("click", () => {
    newPage("awgeDVD-vol-3");
  });
}

function mediaLoad() {
  $("#media-videos").click(() => {
    newPage("videos");
  });
  $("#media-pictures").click(() => {
    newPage("pictures");
  });
  $("#media-directed").click(() => {
    newPage("directed");
  });
}

function aboutLoad() {
  $("#about-artists").click(() => {
    newPage("artists");
  });
  $("#about-people").click(() => {
    newPage("people");
  });
}

function artistsLoad() {
  $(".about-artists-artist").click(function () {
    newPage(`artist?id=${$(this).attr("for")}`);
  });
}

function artistLoad() {
  const id = getParameterByName("id");

  if (id == null || id == "" || artists[id] == null) {
    newPage("artists");
    return;
  }

  const artist = artists[id];
  let bios = "";
  artist.bio.forEach((elem) => {
    bios = `${bios}<li>${elem}</li>`;
  });

  $("#artist-name").html(artist.name);
  $("#artist-background").css("background-image", `url('${artist.gif}')`);
  $("#artist-bio").html(bios);
  $("#artist-img").css("background-image", `url('${artist.img}')`);
  $("#artist-img").css("background-position", artist.imgPos);
}

function loadPage(dir, time) {
  $("#awge-content").load(dir, () => {
    $("#awge-tube-border").removeClass("awge-tube-border-mobile");
    switch (dir) {
      case "./pages/landing.html":
        $("#awge-tube-border").addClass("awge-tube-border-mobile");
        landingLoad();
        break;
      case "./pages/home.html":
        homeLoad();
        break;
      case "./pages/contact.html":
        contactLoad();
        break;
      case "./pages/shop.html":
        // do nothing - products are loaded in manually via shop.html
        break;
      case "./pages/product.html":
        productLoad();
        break;
      case "./pages/videos.html":
        videosLoad();
        break;
      case "./pages/about.html":
        aboutLoad();
        break;
      case "./pages/sweepstakes.html":
        break;
      case "./pages/sweepstakes-rules.html":
        break;
      case "./pages/pictures.html":
        picturesLoad();
        break;
      case "./pages/awgeDVD.html":
        awgeDVDLoad();
        break;
      case "./pages/awgeDVD-vol-1.html":
        awgeDVDVolLoad();
        break;
      case "./pages/awgeDVD-vol-2.html":
        awgeDVDVolLoad();
        break;
      case "./pages/awgeDVD-vol-3.html":
        awgeDVDVolLoad();
        break;
      case "./pages/media.html":
        mediaLoad();
        break;
      case "./pages/directed.html":
        directedLoad();
        break;
      case "./pages/artists.html":
        artistsLoad();
        break;
      case "./pages/artist.html":
        artistLoad();
        break;
      default:
        break;
    }

    initModal();
    turnScreenOn(time);
    initTerms();
  });
}

function changePage(dir, time) {
  turnScreenOff(0.35);
  setTimeout(loadPage, 350, dir, time);
}

/*
 ____   ____  _        __
|_  _| |_  _|(_)      |  ]
  \ \   / /  __   .--.| | .---.   .--.   .--.
   \ \ / /  [  |/ /'`\' |/ /__\\/ .'`\ \( (`\]
    \ ' /    | || \__/  || \__.,| \__. | `'.'.
     \_/    [___]'.__.;__]'.__.' '.__.' [\__) )

Videos.js
http://patorjk.com/software/taag/#p=display&f=Varsity&t=Videos%0A
*/

function buildDirectedPlayer() {
  for (let i = 1; i < Object.keys(directed).length + 1; i++) {
    $("#videos-container").prepend(
      `\
        <div class="videos-listing">\
          <button class="videos-listing-button" onclick="openDirectedVideo(${i})">\
            <img id="video-listing-${i}" onclick="openDirectedVideo(${i})" class="videos-listing-preview" src="${directed[i].gif}" alt="${directed[i].title} video by ${directed[i].desc}"/>\
        </button>\
            <div class="videos-listing-info">\
                <h1>${directed[i].title}</h1>\
                <h4>${directed[i].desc}</h4>\
            </div>\
        </div>\
        `
    );
  }
}

function buildVideoPlayer() {
  for (let i = 1; i < Object.keys(videos).length + 1; i++) {
    $("#videos-container").prepend(
      `\
        <div class="videos-listing">\
          <button class="videos-listing-button" onclick="openFullscreenVideo(${i})">\
            <img id="video-listing-${i}" class="videos-listing-preview" src="${videos[i].gif}" alt="${videos[i].title} video by ${videos[i].desc}"/>\
        </button>\
            <div class="videos-listing-info">\
                <h1>${videos[i].title}</h1>\
                <h4>${videos[i].desc}</h4>\
            </div>\
        </div>\
        `
    );
  }
}

function convertTime(value) {
  value = Math.floor(value);
  let minutes = Math.floor(value / 60);
  let seconds = value - minutes * 60;
  minutes.toString();
  seconds.toString();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function openDirectedVideo(id) {
  if (directed[id].isVevo) {
    $($(`#video-listing-${id}`).addClass("animate-turn-off"));
    setTimeout(() => {
      $(".videos-content").prepend(
        '\
            <div class="videos-fullscreen-container">\
                <button id="awge-back" class="awge-home" style="">\
                    <img src="https://dwvo2npct47gg.cloudfront.net/gifs/awge-home.gif" alt="Home button spinning globe">\
                </button>\
                <iframe class="videos-fullscreen-video" style="margin:10vh 10vw;border:none;width: 80% !important; height: 80% !important;" src="https://embed.vevo.com?isrc=USRV81700927&autoplay=true" allowfullscreen="true">\
                </iframe>\
            </div>\
            '
      );
      $("#awge-back").click(() => {
        closeFullscreenVideo();
      });
    }, 425);
  } else {
    $($(`#video-listing-${id}`).addClass("animate-turn-off"));
    setTimeout(() => {
      $(".videos-content").prepend(
        `\
            <div class="videos-fullscreen-container">\
                <button id="awge-back" class="awge-home" style="">\
                    <img src="https://dwvo2npct47gg.cloudfront.net/gifs/awge-home.gif" alt="Home button spinning globe">\
                </button>\
                <video id="videos-fullscreen-video" class="videos-fullscreen-video animate-turn-on video-js vjs-default-skin" autoplay loop controls preload="auto" data-setup="{}" poster="${directed[id].gif}">\
                    <source src="${directed[id].link}" type="video/mp4">\
                    <p class="vjs-no-js">\
                      To view this video please enable JavaScript, and consider upgrading to a web browser that\
                      <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>\
                    </p>\
                </video>\
            </div>\
            <script src="https://vjs.zencdn.net/7.0.2/video.js"></script>\
            `
      );
      setTimeout(() => {
        $("#videos-fullscreen-video").get(0).play();
      }, 100);

      $("#awge-back").click(() => {
        closeFullscreenVideo();
      });
    }, 425);
  }
}

function openFullscreenVideo(id) {
  if (videos[id].isVevo) {
    $($(`#video-listing-${id}`).addClass("animate-turn-off"));
    setTimeout(() => {
      $(".videos-content").prepend(
        '\
            <div class="videos-fullscreen-container">\
                <div id="awge-back" class="awge-home" style="">\
                    <img src="https://dwvo2npct47gg.cloudfront.net/gifs/awge-home.gif" alt="Home button spinning globe">\
                </div>\
                <iframe class="videos-fullscreen-video" style="margin:10vh 10vw;border:none;width: 80% !important; height: 80% !important;" src="https://embed.vevo.com?isrc=USRV81700927&autoplay=true" allowfullscreen="true">\
                </iframe>\
            </div>\
            '
      );
      $("#awge-back").click(() => {
        closeFullscreenVideo();
      });
    }, 425);
  } else {
    $($(`#video-listing-${id}`).addClass("animate-turn-off"));
    setTimeout(() => {
      $(".videos-content").prepend(
        `\
            <div class="videos-fullscreen-container">\
                <div id="awge-back" class="awge-home" style="">\
                    <img src="https://dwvo2npct47gg.cloudfront.net/gifs/awge-home.gif" alt="Home button spinning globe">\
                </div>\
                <video id="videos-fullscreen-video" class="videos-fullscreen-video animate-turn-on video-js vjs-default-skin" autoplay loop controls preload="auto" data-setup="{}" poster="${videos[id].gif}">\
                    <source src="${videos[id].link}" type="video/mp4">\
                    <p class="vjs-no-js">\
                      To view this video please enable JavaScript, and consider upgrading to a web browser that\
                      <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>\
                    </p>\
                </video>\
            </div>\
            <script src="https://vjs.zencdn.net/7.0.2/video.js"></script>\
            `
      );
      // setTimeout(function() {
      //   $("#videos-fullscreen-video")
      //     .get(0)
      //     .play();
      // }, 100);

      $("#awge-back").click(() => {
        closeFullscreenVideo();
      });
    }, 425);
  }
}

function closeFullscreenVideo() {
  $(".animate-turn-off").removeClass("animate-turn-off");
  $(".videos-fullscreen-container").addClass("animate-turn-off");
  setTimeout(() => {
    $(".videos-fullscreen-container").remove();
  }, 425);
}
/*
  ______   __
.' ____ \ [  |
| (___ \_| | |--.   .--.   _ .--.
 _.____`.  | .-. |/ .'`\ \[ '/'`\ \
| \____) | | | | || \__. | | \__/ |
 \______.'[___]|__]'.__.'  | ;.__/
                          [__|
shop.js
http://patorjk.com/software/taag/#p=display&f=Varsity&t=Shop
*/

var currentItem = {};
var currentType = 1;

function setShopProduct(index) {
  if (shop[currentType][index] == null) {
    index = 1;
  }

  const price = $("#product-item-price");
  const name = $("#product-item-name");
  const progress = $("#product-item-progress");
  const image = $("#product-item-image");
  const message = $("#product-items-message");
  const numItems = Object.keys(shop[currentType]).length;

  noise.go();
  startTextGlitch();
  $("#product-item-mobile").css(
    "background-image",
    `url(${resolveImgURL(shop[currentType][index].images[0])})`
  );
  $("#product-item-mobile").attr("alt", shop[currentType][index].name);

  setTimeout(() => {
    noise.changeImage(
      resolveImgURL(shop[currentType][index].images[0]),
      shop[currentType][index].name
    );

    $(progress)
      .html(`${index}/${numItems}`)
      .attr("data-text", `${index}/${numItems}`);
    const localPrice =
      shop[currentType][index].price == "Sold Out"
        ? "Sold Out"
        : `$${shop[currentType][index].price}`;
    $(price).html(localPrice).attr("data-text", localPrice).data(localPrice);
    $(message).html(shop[currentType][index].message);
    $(image).prop("src", resolveImgURL(shop[currentType][index].images[0]));
    // console.debug("NAME", shop[currentType][index].name);
    $(name)
      .html(shop[currentType][index].name)
      .attr("data-text", shop[currentType][index].name)
      .data(shop[currentType][index].name);

    currentItem.index = index;
    $("#itemOfInterest").val(shop[currentType][index].name); // Updates our hidden field of item of interest in the klaviyo form

    // const numSizes = Object.keys(shop[currentType][index].sizes).length;
    // $("#itemSize").empty();

    // if(numSizes > 0){
    //   $("#itemSize").append("<option value='' disabled selected>Select Size</option>");
    //   for(var i = 0; i < numSizes; i++){
    //      $("#itemSize").append(
    //        `<option value="${shop[currentType][index].sizes[i]}">${shop[currentType][index].sizes[i]}</option>`
    //      );
    //   }
    // }

    resetSizes();
    renderImages();
    setTimeout(() => {
      noise.pause();
      stopTextGlitch();
    }, 400);
  }, 400);
}

function changeShopType(type) {
  setShopProduct(1);
  resetSizes();
  const itemsContainer = $(".product-items-container");
  const typeContainer = $(".product-type-container");

  $(typeContainer).children().removeClass("product-option-active");
  $(`.product-option-${type}`).addClass("product-option-active");

  $(itemsContainer).css(
    "animation",
    `turn-off${isSafari() ? "-safari" : ""} 0.45s linear forwards`
  );
  setTimeout(() => {
    currentType = type;
    setShopProduct(1);
    resetSizes();
    $(itemsContainer).css(
      "animation",
      `turn-on-quick${isSafari() ? "-safari" : ""} 0.65s linear`
    );
  }, 650);
}

function changeShopPage(offset) {
  const numItems = Object.keys(shop[currentType]).length;
  let index = parseInt(currentItem.index) + offset;

  if (index > numItems) index = 1;
  else if (index < 1) index = numItems;

  setShopProduct(index);
}

function closeSizes(size) {
  const wrapper = $(".product-size-wrapper");
  const container = $(".product-items-options-middle");

  $(wrapper).html("");
  if (size == null) {
    $(wrapper).append(
      '<button onclick="openSizes()" class="product-item-option product-size-button">SIZE</button>'
    );
    currentItem.size = null;
  } else {
    $(wrapper).append(
      `<button onclick="openSizes()" id="product-size-final" class="product-item-option product-size-button">${size}</button>`
    );
    currentItem.size = size;
  }

  updateBuyButton();

  $(container).css("width", "auto");
  $(container).removeClass("product-items-options-middle-open");
}

function openSizes() {
  const wrapper = $(".product-size-wrapper");
  const container = $(".product-items-options-middle");
  const { index } = currentItem;
  const numSizes = Object.keys(shop[currentType][index].sizes).length;

  $(wrapper).html("");
  for (let i = 0; i < numSizes; i++) {
    const size = shop[currentType][index].sizes[i];
    const { baseSKU } = shop[currentType][index];
    if (isOutOfStock(`${baseSKU}-${size}`)) {
      $(wrapper).append(
        `<button class="product-item-option product-size-option product-size-option-disabled">${size}</button>`
      );
    } else {
      $(wrapper).append(
        `<button onclick="closeSizes('${size}')" class="product-item-option product-size-option">${size}</button>`
      );
    }
  }
  $(container).css("width", $(container).width());

  $(container).animate(
    {
      width: "100%",
    },
    250
  );

  $(container).addClass("product-items-options-middle-open");
}

function resetSizes() {
  closeSizes();
  const wrapper = $(".product-size-wrapper");
  const container = $(".product-items-options-middle");

  $(wrapper).html("");
  $(container).removeClass("product-items-options-middle-open");
  if (shop[currentType][currentItem.index].sizes == null) {
    $(wrapper).css("display", "none");
    currentItem.size = "OS";
    updateBuyButton();
  } else {
    $(wrapper).css("display", "flex");
    $(wrapper).append(
      '<button onclick="openSizes()" class="product-item-option product-size-button">SIZE</button>'
    );
    currentItem.size = null;
  }
}

$(document).on("click", (e) => {
  const target = $(e.target);
  const container = $(".product-items-options-middle");
  if ($(container).hasClass("product-items-options-middle-open")) {
    if (
      !$(target).hasClass("product-items-options-middle") &&
      !$(target).hasClass("product-size-wrapper") &&
      !$(target).hasClass("product-item-option")
    ) {
      closeSizes(currentItem.size);
    }
  }
});

function renderImages() {
  const wrapper = $(".product-sideimages-wrapper");
  const { index } = currentItem;
  let numImages = 0;

  $(wrapper).html("");

  if (shop[currentType][index].images == null) {
    $(wrapper).css("display", "none");
  } else {
    $(wrapper).css("display", "flex");
    numImages = Object.keys(shop[currentType][index].images).length;
  }

  for (let i = 0; i < numImages; i++) {
    const image = shop[currentType][index].images[i];
    // const { baseSKU } = shop[currentType][index]
    $(wrapper).append(
      `<button class="product-sideimages-button" data-imageindex="${i}" onClick=updateProductShot(${i})><div class="product-sideimages-image" style="background-image: url('${resolveImgURL(
        image
      )}');"></div></button>`
    );
  }
}

const productShotState = {
  currentShot: 0,
};

function updateProductShot(shotIndex) {
  productShotState.currentShot = shotIndex;
  const newImage = resolveImgURL(
    shop[currentType][currentItem.index].images[shotIndex]
  );
  $("#product-item-mobile").css("background-image", `url(${newImage})`);
  noise.go();
  setTimeout(() => {
    noise.changeImage(newImage, shop[currentType][currentItem.index].name);
    $("#product-item-image").prop("src", newImage);
    setTimeout(() => {
      noise.pause();
    }, 400);
  }, 400);
}

function advanceProductShot(direction) {
  if (direction !== 1 && direction !== -1) {
    console.error("Invalid direction for advanceProductShot");
    return;
  }
  // take in -1 or 1 as direction, write code to loop around if new index is out of bounds
  let currentShot = productShotState.currentShot;
  let newIndex = currentShot + direction;
  const numImages =
    Object.keys(shop[currentType][currentItem.index].images).length - 1;
  // console.debug("Current Shot: ", currentShot, "New Index: ", newIndex);
  if (newIndex < 0) {
    newIndex = numImages;
  } else if (newIndex > numImages) {
    newIndex = 0;
  }
  updateProductShot(newIndex);
  return newIndex;
}

function getCart() {
  try {
    return localStorage.cart == null ? {} : JSON.parse(localStorage.cart);
  } catch (e) {
    console.error(`${"Error Getting Cart - Emptying... " + " :: "}${e}`);
    localStorage.cart = "{}";
    return JSON.parse(localStorage.cart);
  }
}

function cleanCart() {
  // make sure all skus in cart are valid
  const cart = getCart();

  if (Object.keys(cart).length == 0) {
    return;
  }

  for (let i = Object.keys(cart).length - 1; i >= 0; i--) {
    const id = Object.keys(cart)[i];
    const baseSKU = id.substring(0, id.lastIndexOf("-"));

    let hasBaseSKU = false;
    for (let j = 1; j <= Object.keys(shop).length; j++) {
      for (let k = 1; k <= Object.keys(shop[j]).length; k++) {
        if (shop[j][k].baseSKU == baseSKU) {
          hasBaseSKU = true;
          break;
        }
      }
    }

    if (!hasBaseSKU) {
      delete cart[id];
    }
  }

  localStorage.cart = JSON.stringify(cart);
}

function hydrateCart() {
  cleanCart();

  const container = $("#cart-container");
  $(container).html("");

  const cart = getCart();
  for (let i = 0; i < Object.keys(cart).length; i++) {
    const id = Object.keys(cart)[i];
    const baseSKU = id.substring(0, id.lastIndexOf("-"));
    let index = -1;

    if (cart[id] == 0) {
      continue;
    }

    for (let j = 1; j <= Object.keys(shop).length; j++) {
      for (let k = 1; k <= Object.keys(shop[j]).length; k++) {
        if (shop[j][k].baseSKU == baseSKU) {
          type = j;
          index = k;
          break;
        }
      }
    }

    const item = shop[type][index];
    const size = id.substring(id.lastIndexOf("-") + 1);
    // make ADA accessible when new items come on
    $(container).append(
      `<div id=${id} class="cart-item"> \
                        <div class="cart-item-delete-wrapper">\
                            <h1 class="cart-item-delete" onclick="removeFromCart('${id}')">X</h1>\
                        </div>\
                        <div class="cart-item-image" style="background-image: url('${resolveImgURL(
                          item.images[0]
                        )}')"></div>\
                        <div class="cart-item-name-wrapper">\
                            <h1 class="cart-item-name" alt="Cart Item Name">${
                              item.name
                            }${size === "OS" ? "" : ` - SZ ${size}`}</h1>\
                        </div>\
                        <div class="cart-item-quantity-wrapper">\
                            <h1 class="cart-item-quantity" alt="Cart Item Quantity">${
                              cart[id]
                            }</h1>\
                        </div>\
                        <div class="cart-item-price-wrapper">\
                            <h1 class="cart-item-price">$${
                              parseFloat(item.price) * parseFloat(cart[id])
                            }</h1>\
                        </div>\
                    </div>`
    );
  }

  if ($(container).html() == "") {
    $(container).append(
      '<div class="cart-items-text">YOUR CART IS EMPTY...</div>'
    );
  }

  localStorage.cart = JSON.stringify(cart);
}

function addToCart() {
  // add current item to js cart with following notation
  // baseSKU-size: num
  // i.e. awge-shirt-MD: 2
  if (currentItem.size == null) {
    console.error("Add to cart failed :: No Size");
    return;
  }

  const { baseSKU } = shop[currentType][currentItem.index];
  const { size } = currentItem;
  // const item = shop[currentType][currentItem.index];
  const id = `${baseSKU}-${size}`;
  const cart = getCart();
  if (cart[id] == null) {
    cart[id] = 0;
  }

  cart[id] += 1;

  localStorage.cart = JSON.stringify(cart);
  hydrateCart();

  openModal("cart-modal");
}

function removeFromCart(id) {
  const cart = getCart();
  delete cart[id];
  localStorage.cart = JSON.stringify(cart);
  hydrateCart();
}

function isOutOfStock(id) {
  if (skuMatch[id] == null) {
    console.debug(`SKU not found: ${id}`);
    return true;
  }
  return !skuMatch[id].available;
}

function updateBuyButton() {
  const buyButton = document.getElementById("product-buy-button");
  const sizeButton = document.getElementById("product-size-button");
  const notifyMeButton = document.getElementById("notifyMeBtn"); // Reference to the Notify Me button

  buyButton.classList.remove("product-buy-button-disabled");
  while (sizeButton.classList.contains("product-size-button-disabled")) {
    sizeButton.classList.remove("product-size-button-disabled");
  }

  sizeButton.classList.remove("product-size-button-disabled");
  notifyMeButton.style.display = "none"; // Hide the Notify Me button by default

  buyButton.textContent = "ADD TO CART";

  if (!currentItem.index) {
    currentItem.index = 1;
  }

  const item = shop[currentType][currentItem.index];
  const { sizes } = item;
  const { baseSKU } = item;

  // Check if the product has multiple sizes
  if (sizes !== null && currentItem.size === null) {
    if (currentItem.size !== "OS") {
      // If the size is not one size, disable the buy button
      buyButton.classList.add("product-buy-button-disabled");
    }
  }

  // Check if the product is sold out
  if (currentItem.index != null) {
    if (sizes == null && isOutOfStock(`${baseSKU}-OS`)) {
      // if (sizes == null && isOutOfStock(`${baseSKU}`)) {
      // no sizes, check immediately
      console.debug(
        `Product is sold out. Index: ${currentItem.index}, Size: ${currentItem.size}`
      );
      sizeButton.classList.add("product-size-button-disabled");
      buyButton.classList.add("product-buy-button-disabled");
      buyButton.textContent = "SOLD OUT";
      notifyMeButton.style.display = "flex"; // Show the Notify Me button
    } else if (sizes != null && currentItem.size == null) {
      // multiple sizes, check all sizes
      let allOOS = true;
      for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        if (!isOutOfStock(`${baseSKU}-${size}`)) {
          // if (!isOutOfStock(`${baseSKU}`)) {
          allOOS = false;
          break;
        }
      }
      // If all sizes are out of stock, disable the size button and buy button
      if (allOOS) {
        sizeButton.classList.add("product-size-button-disabled");
        buyButton.classList.add("product-buy-button-disabled");
        buyButton.textContent = "SOLD OUT";
        notifyMeButton.style.display = "flex"; // Show the Notify Me button
      }
    }
  }
}

/*
   ______  __                    __                       _
 .' ___  |[  |                  [  |  _                  / |_
/ .'   \_| | |--.  .---.  .---.  | | / ]  .--.   __   _ `| |-'
| |        | .-. |/ /__\\/ /'`\] | '' < / .'`\ \[  | | | | |
\ `.___.'\ | | | || \__.,| \__.  | |`\ \| \__. | | \_/ |,| |,
 `.____ .'[___]|__]'.__.''.___.'[__|  \_]'.__.'  '.__.'_/\__/

checkout.js
http://patorjk.com/software/taag/#p=display&f=Varsity&t=Checkout%0A
*/

function openCheckoutLink() {
  const cart = getCart();

  // Create checkout method - this very confusing because of the old -OS suffix
  console.debug("Testing checkout");
  shopClient.checkout.create().then((checkout) => {
    const lineItems = [];
    for (let i = 0; i < Object.keys(cart).length; i++) {
      let id = Object.keys(cart)[i];
      let variant = skuMatch[id];
      lineItems.push({
        variantId: variant.id,
        quantity: cart[id],
      });
    }
    console.debug("lineItems", lineItems);
    shopClient.checkout
      .addLineItems(checkout.id, lineItems)
      .then((finalCheckout) => {
        localStorage.cart = "dicks"; // @wafwoof - I guess they did this as a joke because anything would work here?
        hydrateCart();
        window.location = finalCheckout.webUrl;
      });
  });
}

function getCartSubtotal() {
  const cart = getCart();
  let subtotal = 0;
  for (let i = 0; i < Object.keys(cart).length; i++) {
    const id = Object.keys(cart)[i];

    const type = id.split("-")[0];
    const index = id.split("-")[1];
    // const size = id.split("-")[2]
    const item = shop[currentType][type][index];

    if (item == null) {
      cart[id] = 0;
    }

    subtotal += parseFloat(item.price) * parseFloat(cart[id]);
  }
  return subtotal;
}

/*
 _______                                              _
|_   __ \                                            / |_
  | |__) |,--.    _   __  _ .--..--.  .---.  _ .--. `| |-'
  |  ___/`'_\ :  [ \ [  ][ `.-. .-. |/ /__\\[ `.-. | | |
 _| |_   // | |,  \ '/ /  | | | | | || \__., | | | | | |,
|_____|  \'-;__/[\_:  /  [___||__||__]'.__.'[___||__]\__/
                 \__.'
Payment.js
http://patorjk.com/software/taag/#p=display&f=Varsity&t=Payment
*/

let checkoutShipping;
let checkoutEmail;
let orderData;
let shopClient;
const items = [];
var skuMatch = {};

async function initShopify() {
  shopClient = ShopifyBuy.buildClient({
    storefrontAccessToken: "c93be35bf35584f666b857f0747fa13d",
    domain: "awge-2018.myshopify.com",
  });
  // shopClient = ShopifyBuy.buildClient({
  //   storefrontAccessToken: "823258de2c249417725fed498f25a25d",
  //   domain: "awge2022.myshopify.com",
  // });

  // (set to only fetch Don't Be Dumb 2024 products)
  // shopClient.collection.fetchWithProducts('gid://shopify/Collection/270538375223', {productsFirst: 250}).then((collection) => {
  // (set to only fetch Don't Be Dumb 2024 June products)
  shopClient.collection
    .fetchWithProducts("gid://shopify/Collection/272010084407", {
      productsFirst: 250,
    })
    .then((collection) => {
      console.debug("collection:", collection);
      collection.products.forEach((product) => {
        product.variants.forEach((variant) => {
          if (variant.selectedOptions[0].name.toLowerCase() === "size") {
            skuMatch[`${variant.sku}-${variant.selectedOptions[0].value}`] =
              variant;
          } else {
            skuMatch[`${variant.sku}-OS`] = variant;
          }
          items.push(variant);
        });
      });
      try {
        updateBuyButton();
      } catch (exception) {
        console.warn("buy button did not update", exception);
      }
      // console.debug("SKUMATCH:", skuMatch);
      // console.debug(items);
    });
}

/*
  ______         __   ____    ____               __        __
 / ____ `.      |  ] |_   \  /   _|             |  ]      [  |
 `'  __) |  .--.| |    |   \/   |   .--.    .--.| | .---.  | |  .--.
 _  |__ './ /'`\' |    | |\  /| | / .'`\ \/ /'`\' |/ /__\\ | | ( (`\]
| \____) || \__/  |   _| |_\/_| |_| \__. || \__/  || \__., | |  `'.'.
 \______.' '.__.;__] |_____||_____|'.__.'  '.__.;__]'.__.'[___][\__) )

Models.js
http://patorjk.com/software/taag/#p=display&f=Varsity&t=3d%20Models
*/

let scene;
let camera;
let renderer;
let controls;
let object;

function initModel(container) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  const loader = new THREE.JSONLoader();

  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0); // 0xfD35144
  // #D35144
  // scene.background = new THREE.Color(0xf1B1B1B);
  $(container).append(renderer.domElement);

  const light = new THREE.AmbientLight(0xe0e0e0); // soft white light
  scene.add(light);

  camera.position.z = 5;

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;

  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

function animateModel() {
  requestAnimationFrame(animateModel);
  renderer.render(scene, camera);
  controls.update();
}

function setCameraPosition(x, y, z) {
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
}

function animateModelLoading() {
  let loadText = "Loading";
  let num = ($("#model-loading").text().match(/\./g) || []).length;
  num += 1;
  if (num > 3) num = 1;
  for (let i = 0; i < num; i++) {
    loadText += ".";
  }
  $("#model-loading").text(loadText);
}

function showModelLoading() {
  $("#model-loading").animate(
    {
      opacity: 1,
    },
    1000
  );
  return setInterval(animateModelLoading, 400);
}

function hideModelLoading(id) {
  $("#model-loading").animate(
    {
      opacity: 0,
    },
    750
  );
  setTimeout(() => {
    clearInterval(id);
  }, 1000);
}

function loadModel(name, settings) {
  const onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.debug(`${Math.round(percentComplete, 2)}% downloaded`);
    }
  };

  const onError = () => {
    console.error("Error loading model");
  };

  if (object != null) {
    scene.remove(object);
  }
  const loadingID = showModelLoading();

  const mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath("./awge-media/models/");
  mtlLoader.load(`${name}.mtl`, (materials) => {
    materials.preload();
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath("https://dwvo2npct47gg.cloudfront.net/models/");
    objLoader.load(
      `${name}.obj`,
      (objectOBJ) => {
        hideModelLoading(loadingID);
        setTimeout(() => {
          object = objectOBJ;
          object.position.y = 0;
          object.rotation.x = 0;

          setCameraPosition(settings.pos[0], settings.pos[1], settings.pos[2]);
          controls.minDistance = settings.minDist;
          controls.maxDistance = settings.maxDist;

          if (settings.scale)
            object.scale.set(settings.scale, settings.scale, settings.scale);

          scene.add(object);
        }, 750);
      },
      onProgress,
      onError
    );
  });
}
