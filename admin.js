import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
const appSettings = {
	databaseURL:
		"https://travel-a670d-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const events = ref(database, "events");

const removeEvent = (eventId) => {
	let dbItem = ref(database, `events/${eventId}`);
	remove(dbItem);
};

const eventsList = document.getElementById("events-list");

const getEvents = async () => {
	eventsList.innerHTML = "";
	onValue(events, function (snapshot) {
		const res = snapshot.val();
		eventsList.innerHTML = "";
		for (const keys in res) {
			eventsList.innerHTML += `<li>
            <div class="events-desc">
                <p class="event-name">${res[keys].name} &nbsp; (${res[keys].date})</p>
            </div>
            <div>
                <button class="remove-event-btn" id="${keys}")>Remove Event</button>
            </div>
        </li>`;
		}
		document.querySelectorAll(".remove-event-btn").forEach((el) => {
			el.addEventListener("click", () => {
				removeEvent(el.id);
			});
		});
	});
};

document
	.getElementById("add-event-form")
	.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = document.getElementById("event-name");
		const date = document.getElementById("event-date");
		const description = document.getElementById("event-description");
		const id = uuidv4();
		const eventData = {
			name: name.value,
			date: date.value,
			description: description.value,
			id: id,
			type: "event",
		};
		push(events, eventData);
		name.value = "";
		date.value = "";
		description.value = "";
	});

const addEventContainer = document.querySelector(
	".add-event-container"
);
const eventsContainer = document.querySelector(".events-container");
document
	.getElementById("add-event-btn")
	.addEventListener("click", () => {
		eventsContainer.classList.add("hide");
		addEventContainer.classList.remove("hide");
	});
document
	.getElementById("events-btn")
	.addEventListener("click", () => {
		eventsContainer.classList.remove("hide");
		addEventContainer.classList.add("hide");
		getEvents();
	});
getEvents();
