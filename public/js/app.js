const dataMes = document.querySelector('#data');

function fetchData() {
  dataMes.textContent = 'Loading...';
  dataMes.textContent = '';
  fetch(`/hacker`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          dataMes.textContent = data.error;
        } 
        var ul = document.createElement("ul");
        for (let i in data) {
          let content = data[i];
          if (content !== null) {
            var li = document.createElement("LI"); 
            var node = document.createElement("A"); 
            node.innerHTML = content.title;
            node.href = content.url;
            li.appendChild(node);
            ul.appendChild(li);                 
          }
        }
        document.getElementById("data").appendChild(ul); 
      });
    });
}

fetchData();
