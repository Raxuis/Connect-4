let table = document.getElementById('table');

const query = fetch(`http://localhost:8888/Connect-4/src/data/index.php?api=read`);

query
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
        html = '<table>'
        response.forEach(ele => {
            html += '<tr>'
            html += '<td>' + '<p>' + ele.red_name + '</p>' + '</td>'
            html += '<td>' + '<p>' + ele.yellow_name + '</p>' + '</td>'
            html += '<td>' + '<p>' + ele.red_score + ' : ' + ele.yellow_score + '</p>' + '</td>'
            if (ele.time) {
                html += '<td>' + '<p>' + 'Game time : ' + ele.time + '</p>' + '</td>'
            } else {
                html += '<td>' + '<p>' + 'Time not found' + '</p>' + '</td>'
            }
            html += '</tr>'
            console.log(ele);
        });
        html += '</table>'
        table.innerHTML = html;
    })
    .catch(error => console.log(error));
