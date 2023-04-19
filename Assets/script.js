$(document).ready(function () {
  // console.log("document ready");
  //This ensures that the code inside the function is only executed after the DOM has finished loading. This way, you can be sure that all the HTML elements are available for manipulation.

  var today = dayjs();
  var time = today.format('H');
  console.log(time);
  $('#currentDay').text(today.format('dddd, MMMM D, YYYY h:mm A'));

  const calendar = $('#calendar-list');

  for (let hours = 9; hours < 17 + 1; hours++) {
    let timeBlock = document.createElement('div');
    timeBlock.setAttribute('id', 'hour-' + hours);
    timeBlock.classList.add('time-block', 'row');

    let hourBlock = document.createElement('div');
    hourBlock.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');

    let hour = hours % 12;
    hour = (hour == 0 ? 12 : hour)

    if (hour < time) {
      timeBlock.classList.add('past');
    } else if (hour > time) {
      timeBlock.classList.add('future');
    } else if (hour == time) {
      timeBlock.classList.add('present');
    }

    hourBlock.textContent = hour + (hours > 11 ? 'PM' : 'AM');


    let textArea = document.createElement('textarea');
    textArea.classList.add('col-8', 'col-md-10', 'description');
    textArea.setAttribute('rows', '3');

    let textAreaData = localStorage.getItem(hour);

    if (textAreaData) {
      textArea.textContent = textAreaData;
    }

    let saveButton = document.createElement('div');
    saveButton.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
    saveButton.setAttribute('aria-label', 'save');

    // Save button event listener
    saveButton.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.setItem(hour, textArea.value);
    });

    let saveIcon = document.createElement('div');
    saveIcon.classList.add('fas', 'fa-save');
    saveIcon.setAttribute('aria-hidden', 'true');

    timeBlock.append(hourBlock);
    timeBlock.append(textArea);
    timeBlock.append(saveButton);
    saveButton.append(saveIcon);

    calendar.append(timeBlock);

   
  }


});
