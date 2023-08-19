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
		"https://travelnepal2k80-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const adminUsername = "0949d320001cb5352ed16ebff07c9304";
const adminPassword = "717160f7801ad0ef175847b956f6566a";

function calculateHash(input) {
	const hash = new SparkMD5.ArrayBuffer();
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	hash.append(data);
	return hash.end();
}

document
	.getElementById("login-form")
	.addEventListener("submit", (e) => {
		e.preventDefault();
		const username = calculateHash(
			document.getElementById("username").value
		);
		const password = calculateHash(
			document.getElementById("password").value
		);
		if (username === adminUsername && password === adminPassword) {
			document
				.getElementById("login-container")
				.classList.add("hide");
			document
				.getElementById("content-container")
				.classList.remove("hide");
		} else {
			alert("You Have entered wrong details !");
		}
	});

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
