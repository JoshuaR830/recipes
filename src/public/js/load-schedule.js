function loadSchedule() { 
    var schedule = document.getElementById('schedule-container');
    scheduleRequest = new XMLHttpRequest();
    scheduleRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            schedule.innerHTML = this.responseText;
            onScheduleLoaded();
        }
    };
    scheduleRequest.open("GET", `/schedule-content`);
    scheduleRequest.send();
};