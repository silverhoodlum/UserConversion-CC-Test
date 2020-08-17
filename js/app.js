function convertCurrency(){
    // Store DOM elements in const
    const userInput = document.getElementById("user-input").value;
    const screenTop = document.getElementById("screen-top");
    const screenBottom = document.getElementById("screen-bottom");
    const warningMsg = document.getElementById("warning");
    const timeScreen = document.getElementById("time-screen");
    const audLogo = document.getElementById("aud-logo");

    // Fetch data from API
    fetch("https://api.exchangerate-api.com/v4/latest/GBP")
    .then(response => response.json())
    .then(function(data){
        
        // Handle empty input field
        if(userInput.length === 0 ){
            warningMsg.textContent = "This field cannot be empty, please enter a valid number";
            clearField();
        }
        
        // Handle wrong type of input
        else if(!Number(userInput)){
            warningMsg.textContent = "Please enter a valid number";
            clearField();
        }
        
        // Convert currency
        else{
            // Clear previous timer & warning msg
            clearInterval(window.myTimer);
            warningMsg.textContent = null;
            
            // Display rates
            screenTop.textContent = `${userInput} GBP is equivalent to` ;
            screenBottom.textContent = `${(userInput*data.rates.AUD).toFixed(2)} AUD` ;

            // Display AUD logo
            audLogo.style.display = "inline-block";
            
            // Timer settings
            let minutes = 9, seconds = 59;
            let countdown = function() {
                timeScreen.textContent = `Expires in minutes ${minutes}, seconds ${seconds}`;
                
                // Handle timer end
                if(minutes===0 && seconds===0){
                timeScreen.textContent = "Rate expired";
                clearInterval(window.myTimer);                   
                }
                
                // Handle timer minute end
                else if(seconds === 0){
                  minutes--;
                  seconds=59;
                }
                
                // Second countdown
                else {
                  seconds--;
              }
            };
            
            // Run timer
            window.myTimer = setInterval(countdown, 1000); 
        
        }
        // Field clearing function 
        function clearField(){
            clearInterval(window.myTimer);
            audLogo.style.display = "none";
            screenTop.textContent = null;
            screenBottom.textContent = null;
            timeScreen.textContent = null;
        }
    })

}




