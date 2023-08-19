const scriptURL =
	"https://script.google.com/macros/s/AKfycbzl5LwR4kKWEmJeD7wNKG-WX7ben0A5_YhZU1MabP00qeANOr4tjeGvinaCb_7_FmlQVg/exec";

const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	fetch(scriptURL, { method: "POST", body: new FormData(form) })
		.then(() => {
			window.alert(
				"Thanks for contacting us we will get back to you soon"
			);
		})
		.catch((error) => {
			window.alert("Form Submission Failed Please Try Again !");
			console.log(error);
		});
});
