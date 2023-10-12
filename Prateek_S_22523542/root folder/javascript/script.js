window.onload = () => {
    //calling the onclickMenu function to show the menu bar when hamburger is clicked
    onclickMenu();
    btn = document.getElementById("submit1");
    if (btn) {

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const pattern = /^5[1-5][0-9]{14}$/
            const cardNum = document.getElementById("cardNumber").value;

            let expirymonth = document.getElementById("exMonth").value
            let expiryyear = document.getElementById("exYear").value
            const cvv = document.getElementById("myCvv").value
            let today = new Date();





            let year1 = today.getFullYear();
            let month1 = today.getMonth();
            let regexCvv = /^[0-9]{3,4}$/


            //validation to check the card number matches the pattern, if not it will reload the input
            if (!cardNum.match(pattern)) {
                alert("Enter valid 16 digit card number starting with 51,52,53,54 or 55")
               
               cardNum.value="";

            }
            // validation to check the expiry month and year is valid
            else if (expiryyear <= year1 && (month1 + 1) >= expirymonth || expiryyear === 0 || expirymonth === 0) {
                alert("Your card has expired or enter valid card expiry details");
                location.reload();

            }
            
            //validation to check the cvv matches the pattern
            else if (!cvv.match(regexCvv)) {
                alert("Enter a valid 3-4 digit cvv")
                location.reload();
            }
            
            else{alert("Success")
                const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard"
                //raw json data 
                const data = {
                    "master_card": cardNum,
                    "exp_year": parseInt(expiryyear),
                    "exp_month": parseInt(expirymonth),
                    "cvv_code": cvv,

                }
                fetch(url, {
                    //method post used to send json data to the server
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.status + "ok");
                            return response.json();
                        }
                        else if (response.status === 400) {
                            console.log(response.status);
                            throw "Bad data sent to the server"
                        }
                        else {
                            throw "something went wrong"
                        }
                    })
                    .then((resJson) => {
                        alert("credit card has been added")
                        window.location.href = "success.html"; //redirecting the page to the success page after the card verification
                        localStorage.setItem("textValue", cardNum.substr(-4)); //using local storage to setting the last 4 digits of the card number to a variable


                    })
                    .catch((error) => {
                        alert("error");
                    })



                }




        })
    }


}
function onclickMenu() {

    //toggle basically works as hide and show for my menu bar, when the size of the screen changed to a smartphone screen size
    document.getElementById("nav").classList.toggle("nav2")
    document.getElementById("ul1").classList.toggle("ul2")

}



