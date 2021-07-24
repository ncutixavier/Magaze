(function ($) {

  "use strict";

  // Cache selectors
  var lastId,
    topMenu = $(".menu-holder"),
    topMenuHeight = 55,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));

      if (item.length) {
        return item;
      }
    });

  if ($(window).width() <= 767) {
    topMenuHeight = 0;
  }

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = $(this).attr("href");
    var offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;

    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 300);

    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id && id != "") {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[href=#" + id + "]").parent().addClass("active");
    }

    changeNavMenu();
  });

  //mobile menu and desktop menu
  $("#responsive-menu").css({ "right": -1500 });
  $("#mobile_menu").click(function () {
    $("#responsive-menu").show();

    if ($("#responsive-menu").css("right") == "-1500px") {
      $("#responsive-menu").animate({ "right": 0 }, 400);
    }
    else {
      $("#responsive-menu").animate({ "right": -1500 }, 400);
    }

    return false;
  });
  $(window).on("load resize", function () {
    changeNavMenu();
  });

  $("#responsive-menu a").click(function () {
    $("#responsive-menu").animate({ "right": -1500 }, 400);
  });

})(jQuery);

function changeNavMenu() {
  if ($(window).width() > 767) {
    $("#responsive-menu").css({ "right": -1500 });

    if ($(window).scrollTop() > 1) {
      $('.templatemo-site-header').addClass("sticky");
    }
    else {
      $('.templatemo-site-header').removeClass("sticky");
    }
  }
  else {
    $('.templatemo-site-header').removeClass("sticky");
  }
}

/* http://marxo.me/target-ie-in-css/
-----------------------------------------*/
function detectIE() {
  // Detect IE and append class to <html> element
  var UA = navigator.userAgent;
  var html = document.documentElement;
  if (UA.indexOf("IEMobile") === -1) {
    if ((UA.indexOf("rv:11.") !== -1) && (!html.classList.contains('ie11')) && window.navigator.msPointerEnabled) {
      html.classList.add("ie11");
    } else if ((UA.indexOf("MSIE 10.") !== -1) && (!html.classList.contains('ie10')) && window.navigator.msPointerEnabled) {
      html.classList.add("ie10");
    }
  }
}

/* HTML document is loaded. DOM is ready. 
-----------------------------------------*/
$(document).ready(function () {
  /* jCarousel http://sorgalla.com/jcarousel/ */
  $('.jcarousel').jcarousel();
  $('.jcarousel-control-prev')
    .on('jcarouselcontrol:active', function () {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function () {
      $(this).addClass('inactive');
    })
    .jcarouselControl({
      target: '-=1'
    });

  $('.jcarousel-control-next')
    .on('jcarouselcontrol:active', function () {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function () {
      $(this).addClass('inactive');
    })
    .jcarouselControl({
      target: '+=1'
    });

  detectIE();
});

emailjs.init('user_8Q8lp87WvxGxE6xiXQ68f')

function validate() {
  let contact_name = document.querySelector('#contact_name').value
  let contact_email = document.querySelector('#contact_email').value
  let contact_message = document.querySelector('#contact_message').value
  let contact_btn = document.querySelector('.contact_btn')

  if (contact_email && contact_name && contact_message !== "") {
    contact_btn.value = 'SEND...';

    let data = {
      name: contact_name,
      email: contact_email,
      message: contact_message,
    }

    const serviceID = 'service_ikkj11e';
    const templateID = 'template_u4z6v9l';
    swal({
      title: 'Are you sure?',
      html: true,
      text: `You want to send an email`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b28601',
      showLoaderOnConfirm: true,
      confirmButtonText: 'Yes',
      closeOnConfirm: false,
    }, function () {
      emailjs.send(serviceID, templateID, data)
        .then(() => {
          contact_btn.value = 'SEND';
          document.querySelector('#contact_name').value = ""
          document.querySelector('#contact_email').value = ""
          document.querySelector('#contact_message').value = ""
          swal({
            title: "Email Sent!",
            text: "Your email has been sent successfull! We wil get back to you as soon as possible.",
            type: 'success'
          })
        }, (err) => {
          contact_btn.value = 'SEND';
          alert(JSON.stringify(err));
        });
    })
  } else {
    swal({
      title: "Error!",
      text: "Please fill all fields!.",
      type: 'error'
    })
  }
}