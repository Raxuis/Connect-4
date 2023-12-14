let container = document.getElementById('container');
let score = document.createElement('div');
console.log(`http://localhost:8888/Connect-4/src/data/index.php?api=read`);

const query = fetch(`http://localhost:8888/Connect-4/src/data/index.php?api=read`);
query
    .then(response => response.json())
    .then((response) => {
        response.forEach(ele => {
            console.log(ele);
        });
    })
    .catch(error => console.log(error));
