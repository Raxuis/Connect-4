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
            if (ele.yellow_name.includes('_')) {
                ele.yellow_name = ele.yellow_name.replace('_', ' ')
            }
            if (ele.red_name.includes('_')) {
                ele.red_name = ele.red_name.replace('_', ' ')
            }
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
