document.addEventListener('DOMContentLoaded', () => {
    const workouts = [];
    const events = [];

    function renderWorkouts() {
        const workoutList = document.getElementById('workout-list');
        workoutList.innerHTML = '';
        workouts.forEach((workout, index) => {
            const li = document.createElement('li');
            li.textContent = workout;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                workouts.splice(index, 1);
                renderWorkouts();
            };
            li.appendChild(deleteButton);
            workoutList.appendChild(li);
        });
    }

    function renderEvents() {
        const eventsSlider = document.getElementById('events-slider');
        eventsSlider.innerHTML = '';
        events.forEach((event) => {
            const div = document.createElement('div');
            div.classList.add('event-item');
            div.textContent = event;
            eventsSlider.appendChild(div);
        });
    }

    window.addWorkout = () => {
        const workoutInput = document.getElementById('workout-input');
        const workout = workoutInput.value.trim();
        if (workout) {
            workouts.push(workout);
            workoutInput.value = '';
            renderWorkouts();
        }
    };

    window.addEvent = () => {
        const eventInput = document.getElementById('event-input');
        const event = eventInput.value.trim();
        if (event) {
            events.push(event);
            eventInput.value = '';
            renderEvents();
        }
    };
});
