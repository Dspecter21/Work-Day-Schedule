$(document).ready(function () {
  console.log("document ready");
  //This ensures that the code inside the function is only executed after the DOM has finished loading. This way, you can be sure that all the HTML elements are available for manipulation.

  var today = dayjs();
  var time = today.format('H');
  console.log(time);
  $('#currentDay').text(today.format('dddd, MMMM D, YYYY h:mm A'));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

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
