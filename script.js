document.addEventListener('DOMContentLoaded', () => {
  const workoutInput = document.getElementById('workout-input');
  const workoutList = document.getElementById('workout-list');
  const addWorkoutButton = document.getElementById('add-workout');

  const eventForm = document.getElementById('event-form');
  const eventSlides = document.getElementById('event-slides');
  let events = [];
  let currentSlide = 0;

  addWorkoutButton.addEventListener('click', () => {
    if (workoutInput.value.trim() !== '') {
      addWorkout(workoutInput.value);
      workoutInput.value = '';
    }
  });

  workoutList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
    }
  });

  function addWorkout(workout) {
    const li = document.createElement('li');
    li.innerHTML = `
      ${workout}
      <button class="remove">Remove</button>
    `;
    workoutList.appendChild(li);
  }

  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventAvailability = document.getElementById('event-availability').value;

    const eventDetails = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      availability: eventAvailability
    };

    addEvent(eventDetails);

    eventForm.reset();
  });

  function addEvent(eventDetails) {
    events.push(eventDetails);
    displayEvents();
  }

  function displayEvents() {
    eventSlides.innerHTML = '';
    events.forEach((event, index) => {
      const slide = document.createElement('div');
      slide.className = 'event-slide';
      slide.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Availability: ${event.availability}</p>
        <button class="edit" onclick="editEvent(${index})">Edit</button>
        <button class="remove" onclick="removeEvent(${index})">Remove</button>
      `;
      eventSlides.appendChild(slide);
    });
    showSlide(currentSlide);
  }

  function showSlide(index) {
    const slides = document.querySelectorAll('.event-slide');
    if (slides.length === 0) return;
    slides.forEach((slide) => slide.style.display = 'none');
    slides[index].style.display = 'block';
  }

  window.changeSlide = function(n) {
    currentSlide += n;
    if (currentSlide >= events.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = events.length - 1;
    showSlide(currentSlide);
  }

  window.editEvent = function(index) {
    const event = events[index];
    document.getElementById('event-name').value = event.name;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-location').value = event.location;
    document.getElementById('event-availability').value = event.availability;
    removeEvent(index);
  }

  window.removeEvent = function(index) {
    events.splice(index, 1);
    if (currentSlide >= events.length) currentSlide = events.length - 1;
    displayEvents();
  }
});
