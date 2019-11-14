hamtaelemnet();
//
//
//få site id från sl
function getsiteid() {
  const span = document.getElementById("information");
  sparaelement(span.value); // ger värdet till funtionen sparaelement
  const div = document.getElementById("siteid");
  const url1 =
    "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=bed5fbd50fab49febec03d10dd35a8f5&searchstring=" +
    span.value +
    "&stationsonly=True&maxresults=1";

  fetch(url1)
    .then(resp => resp.json())
    .then(function(data) {
      let infos = data.ResponseData;

      return infos.map(function(info) {
        div.innerHTML = info.SiteId; //hämtar siteid från trafiklabs api
        getrealinfo(); // kör funktion
        hidebuttons(); // kör funktion
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

//
//
//realtid info
function getrealinfo() {
  const span = document.getElementById("siteid").innerHTML;
  const div = document.getElementById("real");
  div.innerHTML = "<tr><th>linje</th><th>Gå om</th><th>Nästa avgång</th></tr>";
  var i = 1;
  const url =
    "https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=73415dbcf95348e79eb8399b7f51d6c4&siteid=" +
    span +
    "&timewindow=60";
  fetch(url) //hämtar realtid
    .then(resp => resp.json()) //berättar att filen är json dokumnet
    .then(function(data) {
      if (document.getElementById("trams").checked == true) {
        infos = data.ResponseData.Trams;
      } else if (document.getElementById("buss").checked == true) {
        infos = data.ResponseData.Buses;
      } // kollar checkboxes ifall tåg eller buss ska lässas in
      return infos.map(function(info) {
        if (i <= 10) {
          if (mytime(info.ExpectedDateTime) > 0) {
            // if (trafiktime(info.DisplayTime) > 0) {
            div.innerHTML +=
              "<tr><td>" +
              info.LineNumber +
              " " +
              info.Destination +
              "</td><td>" +
              mytime(info.ExpectedDateTime) + // ger värdet rill funktionen mytime
              " min" +
              "</td><td>" +
              info.DisplayTime +
              "</td></tr>";
            i++; // omvandlar till
          }
        }
        // skappar en tabel i html men informationen från json filen
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
/* function trafiktime(DisplayTime) {
  var date1 = new Date();
  var date2 = Date(DisplayTime);
  console.log(date2);
  

  var minutediff = Math.round((date2 - date1) / 1000 / 60);
  return minutediff;
} */
//
//
// omvanldar så det står minter och beräknar gå avståndet
function mytime(ExpectedDateTime) {
  var date1 = new Date();
  var date2 = Date.parse(ExpectedDateTime);
  var diff = "";

  var minutediff = Math.round((date2 - date1) / 1000 / 60);
  console.log(date2, date1);
  diff = Math.floor(minutediff - document.getElementById("avstånd").value);
  if (diff == 1 + " min") {
    diff = "nu";
  }
  return diff;
}

//
//
//Hämtar data
function hamtaelemnet() {
  const url1 =
    "https://cors-anywhere.herokuapp.com/http://primat.se/services/data/emil.funhammar@outlook.com-hallplatser.json";

  fetch(url1)
    .then(resp => resp.json())
    .then(function(data) {
      let info = data.data;

      return info.map(function(info) {
        document.getElementById("information").value = info.data1; // ger värdet i json filen samma värde som skrivs in i min informations ruta
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
//
//
// sparar data
function sparaelement(stationsplats) {
  console.log(stationsplats);
  const url1 =
    "https://cors-anywhere.herokuapp.com/http://primat.se/services/sendform.aspx?xid=hallplatser&xmail=emil.funhammar@outlook.com&data1=" +
    stationsplats;

  fetch(url1)
    .then(resp => resp.json())
    .then(function(data) {
      let infos = data.data;

      return infos.map(function(info) {}); //
    })
    .catch(function(error) {
      console.log(error);
    });
}
// gömmer och visar block
function hidebuttons() {
  document.getElementById("hide").style.display = "none";
  document.getElementById("backbutton").style.display = "block";
  document.getElementById("real").style.display = "block";
}
function showbutton() {
  document.getElementById("hide").style.display = "block";
  document.getElementById("backbutton").style.display = "none";
  document.getElementById("real").style.display = "none";
}
