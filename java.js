hamtaelemnet();
//
//
//få site id från sl
function getsiteid() {
  const span = document.getElementById("information");
  sparaelement(span.value);
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
        div.innerHTML = info.SiteId; //+ "<br>" + info.X + "<br>" + info.Y;
        getrealinfo();
        hidebuttons();

        //info.Name; //+ " " + info.SiteId + " " + info.X + " " + info.Y;
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
  const url =
    "https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=73415dbcf95348e79eb8399b7f51d6c4&siteid=" +
    span +
    "&timewindow=60";
  console.log(span);
  fetch(url) //hämtar realtid
    .then(resp => resp.json()) //berättar att filen är json dokumnet
    .then(function(data) {
      if (document.getElementById("trams").checked == true) {
        infos = data.ResponseData.Trams;
      } else if (document.getElementById("buss").checked == true) {
        infos = data.ResponseData.Buses;
      }

      //let infos = data.ResponseData.Trams;
      // if stats fr bytevar text = "";
      return infos.map(function(info) {
        if (mytime(info.ExpectedDateTime) > 0) {
          div.innerHTML +=
            "<tr><td>" +
            info.LineNumber +
            " " +
            info.Destination +
            "</td><td>" +
            mytime(info.ExpectedDateTime) +
            " min" +
            "</td><td>" +
            info.DisplayTime +
            "</td></tr>";
        }

        //bättre förklairngx
        //getdistens();
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
//

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
  //console.log(minutediff);
  //console.log(date2);
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
        document.getElementById("information").value = info.data1;
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

      return infos.map(function(info) {});
    })
    .catch(function(error) {
      console.log(error);
    });
}
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
