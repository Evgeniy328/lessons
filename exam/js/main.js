let apiKey = "23a41f15977ea82e5ccd2fd84342c505";
let apiKeyNews = "798469cc5612436f8efa2aa629649d2f";
let cityId = "703845";

// random number
let min = getRandomInt(0, 90),
  max = getRandomInt(0, 90) + 1;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", function () {
  //=================geolocation===================
  weather();
  dailyWeather();
  news();
  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      weather();
      dailyWeather();
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    weatherLL(lat, lon);
    dailyWeatherLL(lat, lon);
  }
  //=================btns weather====================
  let btn1 = document.querySelector("#btnKR");
  let btn2 = document.querySelector("#btnKiev");
  let btn3 = document.querySelector("#btnIFr");
  btn1.addEventListener("click", () => {
    cityId = "703845";
    weather();
    dailyWeather();
  });
  btn2.addEventListener("click", () => {
    cityId = "703448";
    weather();
    dailyWeather();
  });
  btn3.addEventListener("click", () => {
    cityId = "707471";
    weather();
    dailyWeather();
  });
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);
  async function formSend(e) {
    e.preventDefault();
    let inpEmail = document.querySelector("#email");
    let email = document.querySelector("#email");
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(inpEmail.value)) {
      email.classList.add("_error");
    } else {
      email.classList.remove("_error");
    }
    let password = document.getElementById("password");
    var lowerCaseLetters = /[a-z]/g;
    if (password.value.match(lowerCaseLetters)) {
      password.classList.remove("_error");
    } else {
      password.classList.add("_error");
      return;
    }
    var upperCaseLetters = /[A-Z]/g;
    if (password.value.match(upperCaseLetters)) {
      password.classList.remove("_error");
    } else {
      password.classList.add("_error");
      return;
    }
    var numbers = /[0-9]/g;
    if (password.value.match(numbers)) {
      password.classList.remove("_error");
    } else {
      password.classList.add("_error");
      return;
    }
    let symbols = /[!@#$%^&*]/;
    if (password.value.match(symbols)) {
      password.classList.remove("_error");
    } else {
      password.classList.add("_error");
      return;
    }
    if (password.value.length >= 8) {
      password.classList.remove("_error");
    } else {
      password.classList.add("_error");
      return;
    }
  }
  const formSign = document.getElementById("formSign");
  formSign.addEventListener("submit", formSendSign);
  async function formSendSign(e) {
    e.preventDefault();
    let inpEmail = document.querySelector("#email1");
    let email1 = document.querySelector("#email1");
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      username.value === "" ||
      username.value.length < 3 ||
      username.value.length > 25
    ) {
      username.classList.add("_error");
    } else {
      username.classList.remove("_error");
    }
    if (!reg.test(inpEmail.value)) {
      email1.classList.add("_error");
    } else {
      email1.classList.remove("_error");
    }

    let password1 = document.getElementById("password1");
    let confirm = document.getElementById("confirm");

    var lowerCaseLetters = /[a-z]/g;
    if (password1.value.match(lowerCaseLetters)) {
      password1.classList.remove("_error");
    } else {
      password1.classList.add("_error");

      return;
    }

    var upperCaseLetters = /[A-Z]/g;
    if (password1.value.match(upperCaseLetters)) {
      password1.classList.remove("_error");
    } else {
      password1.classList.add("_error");

      return;
    }

    var numbers = /[0-9]/g;
    if (password1.value.match(numbers)) {
      password1.classList.remove("_error");
    } else {
      password1.classList.add("_error");

      return;
    }

    let symbols = /[!@#$%^&*]/;
    if (password1.value.match(symbols)) {
      password1.classList.remove("_error");
    } else {
      password1.classList.add("_error");

      return;
    }

    if (password1.value.length >= 8) {
      password1.classList.remove("_error");
    } else {
      password1.classList.add("_error");
      return;
    }

    if (password1.value != confirm.value) {
      confirm.classList.add("_error");
    } else {
      confirm.classList.remove("_error");
    }
  }
  function news() {
    let storyTitle1 = document.querySelector("#stori-title1"),
      storyTitle2 = document.querySelector("#stori-title2"),
      storyText1 = document.querySelector("#stori-text1"),
      storyText2 = document.querySelector("#stori-text2"),
      storyTime1 = document.querySelector("#stori-time1"),
      storyTime2 = document.querySelector("#stori-time2"),
      storyDiv1 = document.querySelector("#stori1"),
      storyDiv2 = document.querySelector("#stori2"),
      storyTitle3 = document.querySelector("#stori-title3"),
      storyTime3 = document.querySelector("#stori-time3");

    async function getNews() {
      let url = "js/newsDB.json";
      try {
        let res = await fetch(url);
        return await res.json();
      } catch (error) {
        console.log(error);
      }
    }
    getNews();

    async function renderNews() {
      let newsTitle = await getNews();
      storyTitle1.textContent = `${newsTitle[min].title}...`;
      storyTime1.textContent = newsTitle[min].publishedAt.slice(0, 10);
      storyTitle2.textContent = `${newsTitle[max].title}...`;
      storyTime2.textContent = newsTitle[max].publishedAt.slice(0, 10);
      storyDiv1.addEventListener("click", () => {
        window.open(`${newsTitle[min].url}`);
      });
      storyDiv2.addEventListener("click", () => {
        window.open(`${newsTitle[max].url}`);
      });
    }
    renderNews();

    // let request;
    // if (window.XMLHttpRequest) {
    //   request = new XMLHttpRequest();
    // } else {
    //   request = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // request.open(
    //   "GET",
    //   `https://newsapi.org/v2/everything?q=Apple&from=2022-09-26&sortBy=popularity&apiKey=${apiKeyNews}`
    // );
    // request.onload = function (newsObj) {
    //   newsObj = JSON.parse(request.response);
    //   console.log(newsObj);
    //   if (request.status === 200 && request.readyState === 4) {
    //     storyTitle1.textContent = `${newsObj.articles[min].title}...`;
    //     storyTime1.textContent = newsObj.articles[min].publishedAt.slice(0, 10);
    //     storyTitle2.textContent = `${newsObj.articles[max].title}...`;
    //     storyTime2.textContent = newsObj.articles[max].publishedAt.slice(0, 10);
    //     storyDiv1.addEventListener("click", () => {
    //       window.open(`${newsObj.articles[min].url}`);
    //     });
    //     storyDiv2.addEventListener("click", () => {
    //       window.open(`${newsObj.articles[max].url}`);
    //     });
    //   }
    // };
    // request.send();
  }
});

function getCurDate(object) {
  const day = ("0" + object.getDate()).slice(-2);
  const month = ("0" + (object.getMonth() + 1)).slice(-2);
  const year = object.getFullYear();
  return `${day}.${month}.${year}`;
}
function timeZone(localTime, timeZone) {
  let date = new Date();
  localTime *= 1000;
  let localOffSet = date.getTimezoneOffset() * 60000;
  let utc = localTime + localOffSet;
  let myDate = utc + 1000 * timeZone;
  return new Date(myDate);
}

function dailyWeather() {
  //========================day1=============================================
  function dailyWeather1() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data1").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[6].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data1").innerHTML = getCurDate(
          timeZone(dailyObject.list[6].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax1").innerHTML =
          Math.round(dailyObject.list[6].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin1").innerHTML =
          Math.round(dailyObject.list[3].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate1"
        ).innerHTML = `${dailyObject.list[6].weather[0].main}.`;
        document.querySelector(
          "#daily-icon1"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[6].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather1();
  //========================day2=============================================
  function dailyWeather2() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data2").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[14].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data2").innerHTML = getCurDate(
          timeZone(dailyObject.list[14].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax2").innerHTML =
          Math.round(dailyObject.list[14].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin2").innerHTML =
          Math.round(dailyObject.list[11].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate2"
        ).innerHTML = `${dailyObject.list[14].weather[0].main}.`;
        document.querySelector(
          "#daily-icon2"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[14].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather2();
  //========================day3=============================================
  function dailyWeather3() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data3").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[21].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data3").innerHTML = getCurDate(
          timeZone(dailyObject.list[21].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax3").innerHTML =
          Math.round(dailyObject.list[21].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin3").innerHTML =
          Math.round(dailyObject.list[18].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate3"
        ).innerHTML = `${dailyObject.list[21].weather[0].main}.`;
        document.querySelector(
          "#daily-icon3"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[21].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather3();
  //========================day4=============================================
  function dailyWeather4() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data4").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[29].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data4").innerHTML = getCurDate(
          timeZone(dailyObject.list[29].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax4").innerHTML =
          Math.round(dailyObject.list[29].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin4").innerHTML =
          Math.round(dailyObject.list[26].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate4"
        ).innerHTML = `${dailyObject.list[29].weather[0].main}.`;
        document.querySelector(
          "#daily-icon4"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[29].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather4();
  //========================day5=============================================
  function dailyWeather5() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data5").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[37].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data5").innerHTML = getCurDate(
          timeZone(dailyObject.list[37].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax5").innerHTML =
          Math.round(dailyObject.list[37].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin5").innerHTML =
          Math.round(dailyObject.list[34].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate5"
        ).innerHTML = `${dailyObject.list[37].weather[0].main}.`;
        document.querySelector(
          "#daily-icon5"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[37].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather5();
}
function dailyWeatherLL(lat, lon) {
  function dailyWeather1() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data1").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[6].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data1").innerHTML = getCurDate(
          timeZone(dailyObject.list[6].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax1").innerHTML =
          Math.round(dailyObject.list[6].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin1").innerHTML =
          Math.round(dailyObject.list[3].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate1"
        ).innerHTML = `${dailyObject.list[6].weather[0].main}.`;
        document.querySelector(
          "#daily-icon1"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[6].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather1();
  //========================day2=============================================
  function dailyWeather2() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data2").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[14].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data2").innerHTML = getCurDate(
          timeZone(dailyObject.list[14].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax2").innerHTML =
          Math.round(dailyObject.list[14].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin2").innerHTML =
          Math.round(dailyObject.list[11].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate2"
        ).innerHTML = `${dailyObject.list[14].weather[0].main}.`;
        document.querySelector(
          "#daily-icon2"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[14].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather2();
  //========================day3=============================================
  function dailyWeather3() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data3").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[21].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data3").innerHTML = getCurDate(
          timeZone(dailyObject.list[21].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax3").innerHTML =
          Math.round(dailyObject.list[21].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin3").innerHTML =
          Math.round(dailyObject.list[18].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate3"
        ).innerHTML = `${dailyObject.list[21].weather[0].main}.`;
        document.querySelector(
          "#daily-icon3"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[21].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather3();
  //========================day4=============================================
  function dailyWeather4() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data4").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[29].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data4").innerHTML = getCurDate(
          timeZone(dailyObject.list[29].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax4").innerHTML =
          Math.round(dailyObject.list[29].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin4").innerHTML =
          Math.round(dailyObject.list[26].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate4"
        ).innerHTML = `${dailyObject.list[29].weather[0].main}.`;
        document.querySelector(
          "#daily-icon4"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[29].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather4();
  //========================day5=============================================
  function dailyWeather5() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data5").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[37].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data5").innerHTML = getCurDate(
          timeZone(dailyObject.list[37].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax5").innerHTML =
          Math.round(dailyObject.list[37].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin5").innerHTML =
          Math.round(dailyObject.list[34].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate5"
        ).innerHTML = `${dailyObject.list[37].weather[0].main}.`;
        document.querySelector(
          "#daily-icon5"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[37].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather5();
}

function weather() {
  let request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  request.open(
    "GET",
    // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
  );
  request.onload = function (object) {
    object = JSON.parse(request.response);
    // console.log(object);
    if (request.status === 200 && request.readyState === 4) {
      document.querySelector("#city").textContent = object.name;
      document.querySelector("#temp").innerHTML =
        Math.round(object.main.temp - 273) + "&deg;C";
      document.querySelector("#notate").innerHTML = `Feels like: ${
        Math.round(object.main.feels_like - 273) + "&deg;"
      }, ${object.weather[0].description}.`;
      document.querySelector(
        "#icon"
      ).innerHTML = `<img src="http://openweathermap.org/img/wn/${object.weather[0].icon}@2x.png">`;
      document.querySelector(
        "#humidity"
      ).innerHTML = `Humidity: ${object.main.humidity}.`;
      document.getElementById("cur-data").textContent = getCurDate(
        timeZone(object.dt, object.timezone)
      );
      let date1 = timeZone(object.sys.sunrise, object.timezone),
        hours1 = date1.getHours(),
        minutes1 = "0" + date1.getMinutes(),
        date2 = timeZone(object.sys.sunset, object.timezone),
        hours2 = date2.getHours(),
        minutes2 = "0" + date2.getMinutes(),
        timeSunSet = hours2 + ":" + minutes2.slice(-2),
        timeSunRise = hours1 + ":" + minutes1.slice(-2);
      sunRise = object.sys.sunrise;
      document.querySelector(
        "#sunrise"
      ).innerHTML = `Sunrise: ${timeSunRise}. `;
      document.querySelector("#sunset").innerHTML = `Sunrise: ${timeSunSet}. `;
    }
  };
  request.send();
}
function weatherLL(lat, lon) {
  let request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  request.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    // `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
  );
  request.onload = function (object) {
    object = JSON.parse(request.response);
    console.log(object);
    if (request.status === 200 && request.readyState === 4) {
      document.querySelector("#city").textContent = object.name;
      document.querySelector("#temp").innerHTML =
        Math.round(object.main.temp - 273) + "&deg;C";
      document.querySelector("#notate").innerHTML = `Feels like: ${
        Math.round(object.main.feels_like - 273) + "&deg;"
      }, ${object.weather[0].description}.`;
      document.querySelector(
        "#icon"
      ).innerHTML = `<img src="http://openweathermap.org/img/wn/${object.weather[0].icon}@2x.png">`;
      document.querySelector(
        "#humidity"
      ).innerHTML = `Humidity: ${object.main.humidity}.`;
      document.getElementById("cur-data").textContent = getCurDate(
        timeZone(object.dt, object.timezone)
      );
      let date1 = timeZone(object.sys.sunrise, object.timezone),
        hours1 = date1.getHours(),
        minutes1 = "0" + date1.getMinutes(),
        date2 = timeZone(object.sys.sunset, object.timezone),
        hours2 = date2.getHours(),
        minutes2 = "0" + date2.getMinutes(),
        timeSunSet = hours2 + ":" + minutes2.slice(-2),
        timeSunRise = hours1 + ":" + minutes1.slice(-2);
      sunRise = object.sys.sunrise;
      document.querySelector(
        "#sunrise"
      ).innerHTML = `Sunrise: ${timeSunRise}. `;
      document.querySelector("#sunset").innerHTML = `Sunrise: ${timeSunSet}. `;
    }
  };
  request.send();
}

let cityName = "Kryvyi Rih";
function weatherSearch(cityName) {
  let request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  request.open(
    "GET",
    // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    // `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=${apiKey}`
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  );
  request.onload = function (object) {
    object = JSON.parse(request.response);
    // console.log(object);
    if (request.status === 200 && request.readyState === 4) {
      document.querySelector("#city").textContent = object.name;
      document.querySelector("#temp").innerHTML =
        Math.round(object.main.temp - 273) + "&deg;C";
      document.querySelector("#notate").innerHTML = `Feels like: ${
        Math.round(object.main.feels_like - 273) + "&deg;"
      }, ${object.weather[0].description}.`;
      document.querySelector(
        "#icon"
      ).innerHTML = `<img src="http://openweathermap.org/img/wn/${object.weather[0].icon}@2x.png">`;
      document.querySelector(
        "#humidity"
      ).innerHTML = `Humidity: ${object.main.humidity}.`;
      document.getElementById("cur-data").textContent = getCurDate(
        timeZone(object.dt, object.timezone)
      );
      let date1 = timeZone(object.sys.sunrise, object.timezone),
        hours1 = date1.getHours(),
        minutes1 = "0" + date1.getMinutes(),
        date2 = timeZone(object.sys.sunset, object.timezone),
        hours2 = date2.getHours(),
        minutes2 = "0" + date2.getMinutes(),
        timeSunSet = hours2 + ":" + minutes2.slice(-2),
        timeSunRise = hours1 + ":" + minutes1.slice(-2);
      sunRise = object.sys.sunrise;
      document.querySelector(
        "#sunrise"
      ).innerHTML = `Sunrise: ${timeSunRise}. `;
      document.querySelector("#sunset").innerHTML = `Sunrise: ${timeSunSet}. `;
    }
  };
  request.send();
}
function dailyWeatherSearch(cityName) {
  function dailyWeather1() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data1").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[6].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data1").innerHTML = getCurDate(
          timeZone(dailyObject.list[6].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax1").innerHTML =
          Math.round(dailyObject.list[6].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin1").innerHTML =
          Math.round(dailyObject.list[3].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate1"
        ).innerHTML = `${dailyObject.list[6].weather[0].main}.`;
        document.querySelector(
          "#daily-icon1"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[6].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather1();
  //========================day2=============================================
  function dailyWeather2() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data2").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[14].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data2").innerHTML = getCurDate(
          timeZone(dailyObject.list[14].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax2").innerHTML =
          Math.round(dailyObject.list[14].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin2").innerHTML =
          Math.round(dailyObject.list[11].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate2"
        ).innerHTML = `${dailyObject.list[14].weather[0].main}.`;
        document.querySelector(
          "#daily-icon2"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[14].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather2();
  //========================day3=============================================
  function dailyWeather3() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data3").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[21].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data3").innerHTML = getCurDate(
          timeZone(dailyObject.list[21].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax3").innerHTML =
          Math.round(dailyObject.list[21].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin3").innerHTML =
          Math.round(dailyObject.list[18].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate3"
        ).innerHTML = `${dailyObject.list[21].weather[0].main}.`;
        document.querySelector(
          "#daily-icon3"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[21].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather3();
  //========================day4=============================================
  function dailyWeather4() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data4").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[29].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data4").innerHTML = getCurDate(
          timeZone(dailyObject.list[29].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax4").innerHTML =
          Math.round(dailyObject.list[29].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin4").innerHTML =
          Math.round(dailyObject.list[26].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate4"
        ).innerHTML = `${dailyObject.list[29].weather[0].main}.`;
        document.querySelector(
          "#daily-icon4"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[29].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather4();
  //========================day5=============================================
  function dailyWeather5() {
    let request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open(
      "GET",
      // `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    );
    request.onload = function (dailyObject) {
      dailyObject = JSON.parse(request.response);
      // console.log(dailyObject);
      if (request.status === 200 && request.readyState === 4) {
        let dailyoption = { weekday: "long" };
        document.querySelector("#daily-day-data5").innerHTML =
          new Intl.DateTimeFormat("en-US", dailyoption).format(
            timeZone(dailyObject.list[37].dt, dailyObject.city.timezone)
          );
        document.querySelector("#daily-cur-data5").innerHTML = getCurDate(
          timeZone(dailyObject.list[37].dt, dailyObject.city.timezone)
        );
        document.querySelector("#daily-tempMax5").innerHTML =
          Math.round(dailyObject.list[37].main.temp - 273) + "&deg;C";
        document.querySelector("#daily-tempMin5").innerHTML =
          Math.round(dailyObject.list[34].main.temp - 273) + "&deg;C";
        document.querySelector(
          "#daily-notate5"
        ).innerHTML = `${dailyObject.list[37].weather[0].main}.`;
        document.querySelector(
          "#daily-icon5"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyObject.list[37].weather[0].icon}@2x.png">`;
      }
    };
    request.send();
  }
  dailyWeather5();
}
document.querySelector(".btn-search").addEventListener("click", () => {
  search();
  document.querySelector(".input-search").value = "";
});
function search() {
  weatherSearch(document.querySelector(".input-search").value);
  dailyWeatherSearch(document.querySelector(".input-search").value);
}

document.querySelector(".input-search").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    search();
    document.querySelector(".input-search").value = "";
  }
});

let login = document.querySelector(".login");
let signup = document.querySelector(".signup");

document.querySelector("#profile").addEventListener("click", () => {
  login.classList.remove("notVisible");
});
document.querySelector(".close-login").addEventListener("click", () => {
  login.classList.add("notVisible");
});
document.querySelector(".close-signup").addEventListener("click", () => {
  signup.classList.add("notVisible");
});
document.querySelector(".login-to-sign").addEventListener("click", () => {
  login.classList.add("notVisible");
  signup.classList.remove("notVisible");
});
document.querySelector(".sign-to-login").addEventListener("click", () => {
  login.classList.remove("notVisible");
  signup.classList.add("notVisible");
});

let pswrd = document.getElementById("password1");
let toggleBtn = document.getElementById("toggleBtn");
let lowerCase = document.getElementById("lower");
let upperCase = document.getElementById("upper");
let digit = document.getElementById("number");
let specialChar = document.getElementById("special");
let minLength = document.getElementById("length");

function checkPassword(data) {
  const lower = new RegExp("(?=.*[a-z])");
  const upper = new RegExp("(?=.*[A-Z])");
  const number = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[!@#$%^&*])");
  const length = new RegExp("(?=.{8,})");
  if (lower.test(data)) {
    lowerCase.classList.add("valid");
  } else {
    lowerCase.classList.remove("valid");
  }

  if (upper.test(data)) {
    upperCase.classList.add("valid");
  } else {
    upperCase.classList.remove("valid");
  }

  if (number.test(data)) {
    digit.classList.add("valid");
  } else {
    digit.classList.remove("valid");
  }

  if (special.test(data)) {
    specialChar.classList.add("valid");
  } else {
    specialChar.classList.remove("valid");
  }

  if (length.test(data)) {
    minLength.classList.add("valid");
  } else {
    minLength.classList.remove("valid");
  }
}

toggleBtn.onclick = function () {
  if (pswrd.type === "password") {
    pswrd.setAttribute("type", "text");
    toggleBtn.classList.add("hide");
  } else {
    pswrd.setAttribute("type", "password");
    toggleBtn.classList.remove("hide");
  }
};
let passHelp = document.querySelector(".validation");
pswrd.addEventListener("focus", () => {
  passHelp.classList.remove("notVisible");
});
pswrd.addEventListener("blur", () => {
  passHelp.classList.add("notVisible");
});
