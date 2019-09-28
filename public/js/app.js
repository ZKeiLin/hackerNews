const dataMes = document.querySelector('#data');

function fetchData() {
  let spinner = renderSpiner();
  dataMes.appendChild(spinner);
  fetch(`/hacker`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          dataMes.textContent = data.error;
        } 
        var ul = document.createElement("ul");
        ul.className = "list-group list-group-flush"
        for (let i in data) {
          let content = data[i];
          if (content !== null) {
            let li = renderListItem(content);
            ul.appendChild(li);                 
          }
        }
        dataMes.removeChild(spinner);
        dataMes.appendChild(ul); 
      });
    });
}

fetchData();

function renderListItem(content) {
  let li = document.createElement("LI");
  li.className = "list-group-item d-flex align-items-center";   

  let point = document.createElement("span");
  point.className = "badge badge-primary badge-pill point";
  point.innerHTML = content.score;

  let link = document.createElement("A"); 
  link.innerHTML = content.title;
  link.href = content.url;
  link.className = "card-text";
  link.target = "_blank";

  let time = document.createElement("p");
  let small = document.createElement('small')
  small.className = "text-muted"
  small.innerHTML=timeCalulator(content.time);
  time.appendChild(small);
  time.className="card-text";

  let container = document.createElement("DIV");
  container.appendChild(link);
  container.appendChild(time);

  li.appendChild(point)
  li.appendChild(container);
  return li;
}

function renderSpiner() {
  var spinner = document.createElement("DIV");
  spinner.className = "spinner-border text-primary";
  spinner.role = "status";

  var spinnerText = document.createElement("SPAN");
  spinnerText.className = "sr-only";
  spinnerText.innerHTML = "Loading";

  spinner.appendChild(spinnerText);
  return spinner
}

function timeCalulator(timestamp) {
  var date = new Date(timestamp*1000);
  var hours = date.getHours();
  // // Minutes part from the timestamp
  // var minutes = "0" + date.getMinutes();
  // // Seconds part from the timestamp
  // var seconds = "0" + date.getSeconds();

  var formattedTime = hours + " hours ago";
  return formattedTime;
}

