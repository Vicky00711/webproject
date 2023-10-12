//using local storage to get the last 4 digits of the card number using textvalue variable entered  and dispalying in the success page
document.getElementById("display").innerHTML = "Your credit/debit card number ends in ************" + localStorage.getItem("textValue"); 
