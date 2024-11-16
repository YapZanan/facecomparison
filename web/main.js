function sendImages() {
	const image1File = document.querySelector("#image1-container button img");
	const image2File = document.querySelector("#image2-container button img");

	const image1Button = document.querySelector("#image1-container");
	const image2Button = document.querySelector("#image2-container");

	const selectedModel = document.querySelector("#model");

	const compareButton = document.querySelector("#compareButton");
	const loadingSpinner = document.querySelector("#loadingSpinner");
	const distanceElement = document.querySelector("#distance");

	if (image1File && image2File) {
		// Show loading spinner
		compareButton.disabled = true; // Disable the button
		image1Button.disabled = true;
		image2Button.disabled = true;
		selectedModel.disabled = true;
		loadingSpinner.classList.remove("hidden"); // Show loading spinner

		// Get the src of the image elements, assuming they're base64 or a valid image URL
		const image1Src = image1File.src;
		const image2Src = image2File.src;

		// Call the eel function to send images and get the result
		eel.receive_images(
			image1Src,
			image2Src,
			selectedModel.value,
		)(function (result) {
			// Hide the loading spinner and enable the button
			loadingSpinner.classList.add("hidden");
			compareButton.disabled = false;
			selectedModel.disabled = false;
			image1Button.disabled = false;
			image2Button.disabled = false;

			// Update the distance result in the HTML
			if (result && result.error) {
				distanceElement.textContent = "Error: " + result.error;
			} else {
				const similarityPercentage = (result * 100).toFixed(2);
				distanceElement.textContent = `${similarityPercentage}%`;
			}
		});
	} else {
		alert("Pilih 2 file wajah yang valid");
	}
}

function previewImage(event, containerId, previewId) {
	const file = event.target.files[0];
	if (!file) {
		console.log("No file selected");
		return;
	}

	const reader = new FileReader();

	reader.onload = function (e) {
		const container = document.getElementById(containerId);

		// Clear the container content to avoid duplicates
		container.innerHTML = "";

		// Create the button that will act as the image container
		const button = document.createElement("button");
		button.type = "button";
		button.classList.add(
			"w-full",
			"h-96",
			"bg-gray-200",
			"border-2",
			"border-dashed",
			"border-gray-400",
			"rounded-md",
			"flex",
			"items-center",
			"justify-center",
			"text-gray-600",
			"hover:bg-gray-300",
			"relative",
			"object-contain",
		);

		// Create the image element
		const img = document.createElement("img");
		img.src = e.target.result;
		img.classList.add(
			"w-full",
			"h-full",
			"object-cover",
			"rounded-md",
			"object-contain",
		);

		// Make the image clickable to trigger the file dialog
		img.onclick = function () {
			const input = container.querySelector("input");
			input.click(); // Trigger the file input click event
		};

		// Create the hidden file input element
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.classList.add("hidden");
		input.onchange = function (event) {
			previewImage(event, containerId, previewId); // Re-trigger the image preview logic
		};

		// Append the input field to the container
		container.appendChild(input);

		// Append the image to the button
		button.appendChild(img);

		// Add the button with the image to the container
		container.appendChild(button);
	};

	if (file) {
		reader.readAsDataURL(file);
	}
}
