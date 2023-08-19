import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
const appSettings = {
	databaseURL:
		"https://travel-a670d-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const events = ref(database, "events");

const getEvents = async () => {
	onValue(events, function (snapshot) {
		const availableEvents = Object.values(snapshot.val());
		$("#calendar").evoCalendar({
			theme: "royal-navy",
			todayHighlight: "true",
			calendarEvents: availableEvents,
		});
	});
};

$(document).ready(getEvents);
