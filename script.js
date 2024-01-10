$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
    $("#header a").addClass("nav-link-dark");
    $("#headerImg").attr(
      "src",
      "images/logo-bfece249803f3d440ef27a70c60f54f1.png"
    );
    $(".mobile-nav-toggle>span").addClass("mobile-nav-toggle--span");
    $(".mobile-nav-toggle").addClass("mobile-nav-toggle--scrolled");
  } else {
    $("#header").removeClass("header-scrolled");
    $("#header a").removeClass("nav-link-dark");
    $("#headerImg").attr(
      "src",
      "images/logo-white-512a641e90600644922a2327e20c5067.png"
    );
    $(".mobile-nav-toggle span").removeClass("mobile-nav-toggle--span");
    $(".mobile-nav-toggle").removeClass("mobile-nav-toggle--scrolled");
  }
});

// if ($(window).scrollTop() > 100) {
//     $('#header').addClass('header-scrolled');
//     $('#header a').addClass('nav-link-dark');
//     $('#headerImg').attr("src", "images/logo-bfece249803f3d440ef27a70c60f54f1.png");
// }

if ($(".main-nav").length && $(".main-nav").attr("display") != "none") {
  var $mobile_nav = $(".main-nav").clone().prop({
    class: "mobile-nav d-lg-none",
  });
  $("body").append($mobile_nav);
  $("nav").prepend(
    '<button type="button" class="mobile-nav-toggle d-lg-none"><span></span><span></span><span></span></button>'
  );
  $("body").append('<div class="mobile-nav-overly"></div>');

  $(document).on("click", ".mobile-nav-toggle", function (e) {
    $("body").toggleClass("mobile-nav-active");
    $(".mobile-nav-overly").toggle();
    $(".mobile-nav-toggle>span").addClass("mobile-nav-toggle--span");
  });

  $(document).click(function (e) {
    var container = $(".mobile-nav, .mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("mobile-nav-active")) {
        $(".mobile-nav-toggle span").removeClass("mobile-nav-toggle--span");
        $("body").removeClass("mobile-nav-active");
        $(".mobile-nav-overly").hide();
      }
    }
  });
} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
  $(".mobile-nav-toggle span").removeClass("mobile-nav-toggle--span");
  $(".mobile-nav, .mobile-nav-toggle").hide();
  $(".mobile-nav-overly").hide();
}

$(".owl-one").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  items: 1,
});

$(".owl-two").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  items: 1,
});

$(document).ready(function () {
  var myDate = new Date();
  myDate.setDate(myDate.getDate() + 10);
  $("#countdown").countdown(myDate, function (event) {
    $(this).html(
      event.strftime(
        '<div class="col-3"> <div class="time text-slate-dark">%D</div> <span class="text text-slate">Days</span> </div> <div class="col-3"> <div class="time text-slate-dark">%H</div><span class="text text-slate">Hours</span> </div> <div class="col-3"> <div class="time text-slate-dark">%M</div><span class="text text-slate">Minutes</span> </div> <div class="col-3"> <div class="time text-slate-dark">%S</div><span class="text text-slate">Seconds</span> </div>'
      )
    );
  });
});
// Set the date we're counting down to
// var countDownDate = new Date();
// countDownDate.setDate(countDownDate.getDate() + 10);

// // Update the count down every 1 second
// var x = setInterval(function () {

//     // Get today's date and time
//     var now = new Date().getTime();

//     // Find the distance between now and the count down date
//     var distance = countDownDate - now;

//     // Time calculations for days, hours, minutes and seconds
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     $(".sale-timer__days").prepend(days);
//     $(".sale-timer__hours").prepend(hours);
//     $(".sale-timer__minutes").prepend(minutes);
//     $(".sale-timer__seconds").prepend(seconds);

//     // If the count down is over, write some text
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("countdownSale").innerHTML = "EXPIRED";
//     }
// }, 1000);

const saveProfile = async () => {
  const profile = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    amount: document.getElementById("amount").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch(
    "https://teslaxapi.onrender.com/api/profile", // Replace with your actual backend URL
    {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    // Handle errors
    console.error("Error saving profile:", json);
    // Handle setting errors or empty fields in your frontend state as needed
  }
};

document.getElementById("profileForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission
  saveProfile(); // Call your custom function to handle the submission
});

document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const loginBtn = document.getElementById("loginBtn");
  const loadingSpinner = document.getElementById("loadingSpinner");

  // Check if user has 'remember' cookie, and if so, redirect to dashboard
  const rememberMe = getCookie("remember");
  if (rememberMe === "true") {
    window.location.href = "dashboard.html";
  }

  loginBtn.addEventListener("click", async function() {
    // Show loading spinner
    loadingSpinner.style.display = "inline-block";

    // Simulate fetching data from the database (replace with your actual API call)
    try {
      const response = await fetch("https://teslaxapi.onrender.com/api/profile");
      const data = await response.json();

      // Simulate checking login credentials
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      const isValidLogin = data.some(user => user.email === email && user.password === password);

      if (isValidLogin) {
        // Set 'remember' cookie if 'Remember Me' is checked
        const rememberCheckbox = document.getElementById("rememberCheckbox");
        if (rememberCheckbox.checked) {
          setCookie("remember", "true", 14); // Cookie expires in 14 days
        }

        window.location.href = "dashboard.html";
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loadingSpinner.style.display = "none";
    }
  });

  // Function to set a cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Function to get the value of a cookie
  function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  function updateNewUsers() {
      const newUsersElement = document.getElementById("newUsers");
      const randomValue = Math.floor(Math.random() * (40 - 4 + 1) + 4);
      newUsersElement.textContent = randomValue.toLocaleString();
  }

  function updateReviews() {
      const reviewsElement = document.getElementById("reviews");
      const currentReviews = parseInt(reviewsElement.textContent);
      reviewsElement.textContent = (currentReviews + 3).toLocaleString();
  }

  function updateTotalUsers() {
      const totalUsersElement = document.getElementById("totalUsers");
      const currentTotalUsers = parseFloat(totalUsersElement.textContent.replace(/,/g, ''));
      const incrementValue = Math.random() < 0.5 ? 20 : 50;
      const newTotalUsers = (currentTotalUsers + incrementValue).toLocaleString();
      totalUsersElement.textContent = newTotalUsers;
  }

  function updatePageViews() {
      const pageViewsElement = document.getElementById("pageViews");
      const currentPageViews = parseFloat(pageViewsElement.textContent.replace(/,/g, ''));
      pageViewsElement.textContent = (currentPageViews + 15200).toLocaleString();
  }

  updateNewUsers();
  updateReviews();
  updateTotalUsers();
  updatePageViews();

  setInterval(updateNewUsers, 4 * 24 * 60 * 60 * 1000); // 4 days
  setInterval(updateReviews, 17 * 24 * 60 * 60 * 1000); // 17 days
  setInterval(updateTotalUsers, 3 * 24 * 60 * 60 * 1000); // 3 days
  setInterval(updatePageViews, 7 * 24 * 60 * 60 * 1000); // 7 days
});


const fetchProfile = async () => {
  try {
    const response = await fetch(
      "https://teslaxapi.onrender.com/api/profile"
      // Replace "your-backend-url.com" with the actual URL of your backend
    );

    if (response.ok) {
      const profileData = await response.json();
      populateForm(profileData);
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const populateForm = (profileData) => {
  // Assuming that you have unique IDs for your form elements
  document.getElementById("name").value = profileData.name;
  document.getElementById("email").value = profileData.email;
  document.getElementById("amount-display").textContent = profileData.amount;
  // If you want to populate the password field, be cautious about security
  // It's generally not recommended to pre-fill password fields for security reasons
  // You might consider leaving the password field empty or using a placeholder
  // document.getElementById("password").value = profileData.password;
};

// fetchProfile();
