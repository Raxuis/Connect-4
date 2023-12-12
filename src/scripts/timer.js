function timer(time) {
    let startTime = new Date().getTime();
    setInterval(() => {
        let now = Math.floor((new Date().getTime() - startTime) / 1000);
        time.innerHTML = 'It\'s been : ' + now + 's'
    }, 1000)

}