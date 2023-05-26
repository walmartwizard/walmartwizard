function showTime() {
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    const months = [ "Jan ", "Feb ", "Mar ", "Apr ", "Jun ", "Jul ", "Aug ", "Sept ", "Oct ", "Nov ", "Dec " ]
    const d = new Date();
    let day = days[ dt.getDay() ];
    let dt = d.getDate();
    let mt = months[ dt.getMonth() ];
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if ( h == 0 ) {
        h = 12;
    }

    if ( h > 12 ) {
        h = h - 12;
        session = "PM";
    }

    h = ( h < 10 ) ? "0" + h : h;
    m = ( m < 10 ) ? "0" + m : m;
    s = ( s < 10 ) ? "0" + s : s;

    var time = day + ', ' + mt + dt + ' // ' + h + ":" + m + ":" + s + " " + session;
    document.getElementById( "time" ).innerText = time;
    document.getElementById( "time" ).textContent = time;

    setTimeout( showTime, 1000 );
}
showTime();

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
