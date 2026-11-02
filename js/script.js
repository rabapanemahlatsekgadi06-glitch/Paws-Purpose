//===============================================================
//Paws & Purpose: Adopt a Pet page
//Feature 1: Accordion (show/ hide animal details)
//Feature 2: Lightbox (click a photo to enlarge it)
//Feature 3: Enquiry from validation and response
//Feature 4: Contact form validation and email
//Feature 5: View our other animals
//Feature 6: Search the abimals (needs the search box in services.html)
//===============================================================

//---------- Feature 1: accordion ----------

//Find all the accordion buttons on the page.
const accordionButtons = document.querySelectorAll(".accordion-button");

//Add a click event to every accordion button.
accordionButtons.forEach(function (button) {

    button.addEventListener("click", function() {

//The details panel comes immediately after its button.
const details = button.nextElementSibling;

//Check whether the details are currently hidden.
const detailsAreHidden = details.hidden;

//Reverse the hidden state: show hidden details or hide visible ones.
details.hidden = !detailsAreHidden;

//Update this accessibility attribute to match the new state.
button.setAttribute("aria-expanded", String(detailsAreHidden));

//Change the button label to explain what clicking will do next.
if(detailsAreHidden){
    button.textContent = "Hide details";
}else{
    button.textContent = "Show details";
}
    });
});


// ---------- Feature 2: lightbox image ----------

//Find the dialog, the image shown inside it and the close button.
const imageLightbox = document.querySelector("#image-lightbox");
const enlargedImage = document.querySelector("#lightbox-image");
const closeLightboxButton = document.querySelector("#close-lightbox");

//Find all animal photo that should open in the lightbox.
const animalImages = document.querySelectorAll(".lightbox-image");

//Set up the lightbox only if its HTML elements exist.
if(imageLightbox && enlargedImage && closeLightboxButton){

    //Give every animal photo a click event.
    animalImages.forEach(function (animalImage) {

        animalImage.addEventListener("click", function (){
            //Copy the clicked image's file path into the larger image.
            enlargedImage.src = animalImage.src;
            //Copy its description so the enlarged image has useful alt text.
            enlargedImage.alt = animalImage.alt;
            //Open the dialog as a modal window.
            imageLightbox.showModal();
        });
    });

    //Close the dialog when the visitor clicks the close button.
    closeLightboxButton.addEventListener("click", function(){
        imageLightbox.close();
    });

    //Also close it when the visitor clicks outside the picture.
    imageLightbox.addEventListener("click", function(event){
        if(event.target === imageLightbox){

        }
    });
}


// ---------- Feature 3: enquiry form ----------

//Find the enquiry form. It only exists on enquiry.html.
const enquiryForm = document.querySelector("#enquiry-form");

if(enquiryForm){

    //The cost and availability for each choice in the drop list.
    const enquiryInfo = {
        "buddy":{
        topic: "Adoption Buddy (dog, 2 years)",
        cost: "R850 adoption fee (includes sterilisation, vaccinations and microchip).",
        availability: "Buddy is available now. Visit us to meet him."
        },
        "misty":{
        topic: "Adopting Misty (cat, 3 years)",
        cost: "R600 adoption fee (includes sterilisation and vaccinations).",
        availability: "Misty is available now. She prefers a quiet home without other pets."
        },
        "coco":{
        topic: "Adopting Coco (puppy, 6 months)",
        cost: "R950 adoption fee (includes first vaccinations and deworming).",
        availability: "Coco is available now. She is best suited to an active family."
        },
        "simba":{
        topic: "Adopting Simba (cat, 1 year)",
        cost: "R600 adoption fee (includes sterilisation and vaccinations).",
        availability: "Simba is available now. He is good with other cats."
        },
        "bella":{
         topic: "Adopting Bella (dog, 4 years)",
        cost: "R850 adoption fee (includes sterilisations and microchip).",
        availability: "Bella is available now. Visit us to meet her."
        },
        "max":{
        topic: "Adopting Max (senior dog, 8 years)",
        cost: "R300 reduced senior adoption fee.",
        availability: "Max is available now. He suits a quiet home."
        },
        "daisy":{
         topic: "Adopting Daisy (kitten, 4 months)",
        cost: "R600 adoption fee (includes sterilisation and vaccinations).",
        availability: "Daisy is available now. She will need vaccinations booked."
        },
        "oliver":{
        topic: "Adopting Oliver (golden puppy, 8 months)",
        cost: "R950 adoption fee (includes first vaccinations and deworming).",
        availability: "Oliver is available now. He can also be adopted with his sister Olivia."
        },
        "olivia":{
        topic: "Adopting Olivia (white puppy, 8 months)",
        cost: "R950 adoption fee (includes first vaccinations and deworming).",
        availability: "Olivia is available now. She can also be adopted with her brother Oliver."
        },
        "twins":{
        topic: "Adopting the twins, Oliver and Olivia",
        cost: "R1700 for both puppies ( a discount for adopting the pair).",
        availability: "Both twins are available now and are happiest adopted together."
        },
        "volunteer":{
        topic: "Becoming a volunteer",
        cost: "Free. There is no cost to volunteer.",
        availability: "Saturdays 09:00 - 12:00, 8 spots open."
        },
        "sponsor":{
         topic: "Becoming a sponsor",
        cost: "From R150 per month, or a once-off donation from R50.",
        availability: "Open all year. Sign up any time."
        }
    };

    //Run this code when the visitor clicks the submit button.
    enquiryForm.addEventListener("submit", function (event){

        //Stop the page from reloading.
        event.preventDefault();

        //Get what the visitor typed or chose.
        const fullName = document.querySelector("#full-name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const interest = document.querySelector("#interest").value;
        const message = document.querySelector("#message").value.trim();
        const consent = document.querySelector("#consent").checked;

        const responseBox = document.querySelector("#enquiry-response");
        const feedback = document.querySelector("#form-feedback");

        //Clear old errors and hide the old response.
        document.querySelectorAll("#enquiry-form .error").forEach(function (errorText) {
            errorText.textContent = "";
        });
        responseBox.hidden = true;

        //Count how many errors we find.
        let errorCount = 0;

        //Check the name.
        if(fullName === ""){
            document.querySelector("#full-name-error").textContent = "Please enter your full name.";
            errorCount++;
        }else if (fullName.length < 2){
            document.querySelector("#full-name-error").textContent = "Your name must be at least 2 characters.";
            errorCount++;
        }

        //Check the email.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email === ""){
            document.querySelector("#email-error").textContent = "Please enter your email address.";
            errorCount++;
        }else if (!emailPattern.test(email)){
            document.querySelector("#email-error").textContent = "Please enter a valid email, for example name@example.com.";
            errorCount++;
        }

        //Check the drop down list.
        if(interest === ""){
            document.querySelector("#interest-error").textContent = "Please choose what you are enquiring about.";
            errorCount++;
        }

        //Check the message length.
        if(message.length < 10){
            document.querySelector("#message-error").textContent = "Your message must be at least 10 characters.";
            errorCount++;
        }

        //If there are errors, show a message and stop here.
        if(errorCount > 0){
            feedback.textContent = "Please fix the errora above and try again.";
            feedback.className = "feedback-error";
            return;
        }

        //Everything is valid: show the cost and avilability.
        const info = enquiryInfo[interest];
        document.querySelector("#resp-name").textContent = fullName;
        document.querySelector("#resp-topic").textContent = info.topic;
        document.querySelector("#resp-cost").textContent = info.cost;
        document.querySelector("#resp-availability").textContent = info.availability;
        document.querySelector("#resp-email").textContent = email;

        responseBox.hidden = false;
        feedback.textContent = "Thank you! Your enquiry has been received.";
        feedback.className = "feedback-success";
    });
}


// ---------- Feature 4: contact form ----------

//Find the contact form. It only exists on contact.html.
const contactForm = document.querySelector("#contact-form");

if(contactForm){

    //The email address each center receives messages on.
    const centerEmails = {
        pretoria: "pretoria@pawsandpurpose.org",
        johannesburg: "johannesburg@pawsandpurpose.org"
    };

    //Run this code when the visitor clicks the submit button.
    contactForm.addEventListener("submit", function (event){

        //Stop the page from reloading.
        event.preventDefault();

        //Get what the visitor typed.
        const contactName = document.querySelector("#contactname").value.trim();
        const contactEmail = document.querySelector("#contactemail").value.trim();
        const contactPhone = document.querySelector("#contactphone").value.trim();
        const center = document.querySelector("#contactcenter").value;
        const messageType = document.querySelector("#contacttype").value;
        const contactMessage = document.querySelector("#contactmessage").value.trim();

        //Find the preview box and the feedback line.
        const previewBox = document.querySelector("#email-preview");
        const feedback = document.querySelector("#contact-feedback");

        //Clear old messages and hide the old preview.
        document.querySelectorAll("#contact-form .error").forEach(function (errorText){
            errorText.textContent = "";
        });
        previewBox.hidden = true;

        //Count how many errors we find.
        let errorCount = 0;

        //Check the name.
        if(contactName === ""){
            document.querySelector("#contactname-error").textContent = "Please enter your name.";
            errorCount++;
        }else if (contactName.length < 2){
            document.querySelector("#contactname-error").textContent = "Your name must be at least 2 characters.";
            errorCount++;
        }

        //Check the phone number. It is optional, but if typed it must be valid.
        if(contactPhone !== ""){
            //Remove spaces and dashes, then check the South African format.
            const cleanPhone = contactPhone.replace(/[\s-]/g, "");
            const phonePattern = /^(\+27|0)[0-9]{9}$/;
            if(!phonePattern.test(cleanPhone)){
                document.querySelector("#contactphone-error").textContent = "Please enter a valid number, for example 012 345 6789.";
                errorCount++;
            }
        }
        
        //Check the drop down lists.
        if(center === ""){
            document.querySelector("#contactcenter-error").textContent = "Please choose a center.";
            errorCount++;
        }
        if(messageType === ""){
            document.querySelector("#contacttype-error").textContent = "Please choose a type of message.";
            errorCount++;
        }

        //Check the message length.
        if(contactMessage === ""){
            document.querySelector("#contactmessage-error").textContent = "Please enter a message.";
            errorCount++;
        }else if(contactMessage.length < 10){
            document.querySelector("#contactmessage-error").textContent = "Your message must be at least 10 characters.";
            errorCount++;
        }

        //If there are errors, show a message and stop here.
        if(errorCount > 0){
            feedback.textContent = "Please fix the errors above and try again.";
            feedback.className = "feedback-error";
            return;
        }

        //Everything is valid: compile the email.
        const recipient = centerEmails[center];
        const subject = messageType + " - message from " + contactName;

        //\n makes a new line in the email body.
        const body=
        "Name: " + contactName + "\n" +
        "Email: " + contactEmail + "\n" +
        "Phone: " + (contactPhone === "" ? "Not provided" : contactPhone) + "\n" +
        "Message type: " + messageType + "\n\n" +
        "Message:\n" + contactMessage;

        //SHow the email on the page so the visitor can check it.
        document.querySelector("#preview-to").textContent = recipient;
        document.querySelector("#preview-subject").textContent = subject;
        document.querySelector("#preview-body").textContent = body;

        //Build the link that opens the visitor's email app, ready to send.
        //encodedURIComponent makes spaces and symbols safe to use in a link.
        document.querySelector("#send-email").herf = 
        "mailto:" + recipient +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

        previewBox.hidden = false;
        feedback.textContent = "Your details are valid. Check the email below, then click the button to send it.";
        feedback.className = "feedback-success";
    });
}


// ---------- Feature 5: view our other animals ----------

//Find elements using their ID.
const moreAnimalsMessage = document.querySelector("#more-animals-message");
const moreAnimals = document.querySelector("#more-animals");
const moreAnimalsButton = document.querySelector("#more-animals-button");

//Check that all the elements are found.
if(moreAnimalsMessage && moreAnimals && moreAnimalsButton){

    //In the event of the button being clicked...
    moreAnimalsButton.addEventListener("click", function(){

        //Change the text content.
        moreAnimalsMessage.textContent = 
        "Meet our other animals below. Click a photo to see it larger.";

        //Make the animals visible.
        moreAnimals.hidden = false;

        //Change the button message and show that it is clicked.
        moreAnimalsButton.textContent = "Other animals shown.";
        moreAnimalsButton.disabled = true;
    });
}


// ---------- Feature 6: search the animals ---------

//Find the search box, the message line and every animal card.
const animalSearch = document.querySelector("#animal-search");
const searchMessage = document.querySelector("#search-message");
const animalCards = document.querySelectorAll(".service-card");

if(animalSearch && searchMessage){

    //Run this code every time the visitor types.
    animalSearch.addEventListener("input", function() {

        const searchText = animalSearch.value.toLowerCase().trim();
        let matches = 0;

        //Show cards that contain the search text and hide the rest.
        animalCards.forEach(function (card){
            if(card.textContent.toLowerCase().includes(searchText)){
                card.hidden = false;
                matches++;
            }else{
                card.hidden = true;
            }
        });

        //Tell the visitor if nothing matched.
        if(matches === 0){
            searchMessage.textContent = "No animals match your search.";
        }else{
            searchMessage.textContent = "";
        }
    });
}