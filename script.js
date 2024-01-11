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

// document.addEventListener("DOMContentLoaded", function () {
//   // Handle initial page load
//   handleRoute();

//   // Handle navigation events
//   window.addEventListener("hashchange", handleRoute);

//   function handleRoute() {
//       const hash = window.location.hash.substr(1);

//       // Define your routes
//       const routes = {
//           "": "index",        // Default route
//           "login": "login",  // Maps #login to the login route
//           "profile": "profile",
//           "dashboard": "dashboard"
//           // Add more routes as needed
//       };

//       // Check if the hash corresponds to a route
//       if (hash in routes) {
//           // Load the content for the route
//           loadContent(routes[hash]);
//       } else {
//           // Handle unknown routes (e.g., display a 404 page)
//           loadContent("404");
//       }
//   }

//   function loadContent(route) {
//       // Use fetch or any other method to load the content for the given route
//       fetch(`/views/${route}.html`)  // Update the path based on your file structure
//           .then(response => response.text())
//           .then(html => {
//               // Update the content of your main container
//               document.getElementById("main-container").innerHTML = html;
//           })
//           .catch(error => console.error("Error loading content:", error));
//   }
// });
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

document.addEventListener("DOMContentLoaded", function () {
  // Check if the current page is the login page
  if (window.location.pathname === "/login.html") {
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");
    const loadingText = document.getElementById("loadingText");

    // Check if user has 'remember' cookie, and if so, redirect to dashboard
    const rememberMe = getCookie("remember");
    if (rememberMe === "true") {
      window.location.href = "dashboard.html";
    }

    // Check if 'remember' cookie is present and if the session has expired
    const rememberCookieExpired = rememberMe && checkRememberCookieExpiration();

    if (rememberCookieExpired) {
      // If 'Remember Me' has expired, clear the email from localStorage
      localStorage.removeItem("userEmail");
    }

    loginBtn.addEventListener("click", async function () {
      console.log("Clicked");

      // Show loading text and hide login button
      loadingText.style.display = "inline-block";
      loginBtn.style.display = "none";

      // Define an async function for the try-catch block
      async function fetchData() {
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
            if (rememberCheckbox && rememberCheckbox.checked) {
              localStorage.setItem("userEmail", email); // Store email in localStorage
              setCookie("remember", "true", 14); // Cookie expires in 14 days
            } else {
              // If 'Remember Me' is not checked, store email temporarily in sessionStorage
              sessionStorage.setItem("userEmail", email);
            }

            window.location.href = "dashboard.html";
          } else {
            alert("Invalid login credentials");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // Hide loading text and show login button
          loadingText.style.display = "none";
          loginBtn.style.display = "inline-block";
          console.log("Login button and loading text restored");
        }
      }

      // Call the async function
      await fetchData();
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

    // Function to check if 'remember' cookie has expired
    function checkRememberCookieExpiration() {
      const rememberCookie = getCookie("remember");
      if (rememberCookie) {
        const expirationDate = new Date(rememberCookie);
        return expirationDate < new Date(); // Returns true if the expiration date is in the past
      }
      return false; // No 'remember' cookie present
    }
  }
});




document.addEventListener("DOMContentLoaded", async function () {
  // Check if the current page is the dashboard page
  if (window.location.pathname === "/dashboard.html") {
    // Fetch the user's email from localStorage
    const userEmail = localStorage.getItem("userEmail");

    // Check if the user's email is present
    if (userEmail) {
      // Fetch user data using the email
      const userData = await fetchUserData(userEmail);

      // Update the username in the sidebar
      updateUsername(userData.name);
    }

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

    const logoutButtons = document.querySelectorAll(".logout-btn");

    if (logoutButtons.length > 0) {
      logoutButtons.forEach(function (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
          // Clear cookies
          document.cookie = "remember=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          // Clear localStorage
          localStorage.removeItem("userEmail");

          // Redirect to login page
          window.location.href = "login.html";
        });
      });
    }
  }
});

// Function to fetch user data using email
async function fetchUserData(email) {
  try {
    const response = await fetch(`https://teslaxapi.onrender.com/api/profile/${email}`);
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Function to update the username in the sidebar
function updateUsername(username) {
  const usernameElement = document.querySelector(".profile-usertitle-name");
  if (usernameElement) {
    usernameElement.textContent = username;
  }
}




document.addEventListener("DOMContentLoaded", function () {
  // Check if the current page is the profile page
  if (window.location.pathname === "/profile.html") {
    // Function to fetch user data using email
    const fetchUserData = async (email) => {
      try {
        const response = await fetch(`https://teslaxapi.onrender.com/api/profile/${email}`);
        return await response.json();
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };

    // Function to update profile information
    const updateProfileInfo = (userData) => {
      if (userData) {
        // Update name and email
        document.getElementById("amount-name").textContent = userData.name;
        document.getElementById("amount-email").textContent = userData.email;

        // Calculate new amount based on percentage
        const currentAmount = parseFloat(userData.amount);
        let percentage = 0;

        if (currentAmount >= 50 && currentAmount <= 200) {
          percentage = 0.05;
        } else if (currentAmount > 200 && currentAmount <= 700) {
          percentage = 0.1;
        } else if (currentAmount > 700 && currentAmount <= 5000) {
          percentage = 0.16;
        } else if (currentAmount > 5000 && currentAmount <= 10000) {
          percentage = 0.25;
        } else if (currentAmount > 10000) {
          percentage = 0.25; // 25% for amounts above $10,000
        }

        const newAmount = currentAmount * (1 + percentage);

        // Update displayed amount
        document.getElementById("amount-display").textContent = `$${newAmount.toFixed(2)}`;

        updateUsername(userData.name);
      }
    };

    // Check if the user's email is present in localStorage
    const userEmail = localStorage.getItem("userEmail");

    // Check if the user's email is present
    if (userEmail) {
      // Fetch user data using the email
      const userData = await fetchUserData(userEmail);

      // Update the profile information on the page
      updateProfileInfo(userData);
    }

    // Schedule the update to run every Friday
    const updateProfileData = async () => {
      // Fetch user data using the stored email
      const userData = await fetchUserData(userEmail);

      // Update the profile information on the page
      updateProfileInfo(userData);
    };

    setInterval(async () => {
      await updateProfileData();
    }, 7 * 24 * 60 * 60 * 1000); // 7 days

    const logoutButtons = document.querySelectorAll(".logout-btn");

    if (logoutButtons.length > 0) {
      logoutButtons.forEach(function (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
          // Clear cookies
          document.cookie = "remember=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          // Clear localStorage
          localStorage.removeItem("userEmail");

          // Redirect to login page
          window.location.href = "login.html";
        });
      });
    }
  }
});


