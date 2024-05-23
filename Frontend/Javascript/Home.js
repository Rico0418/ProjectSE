document.addEventListener("DOMContentLoaded",function(){
    const UserID = localStorage.getItem('UserId');
    const UserName = localStorage.getItem('UserName');
    if(UserID && UserName){
        document.getElementById("User-info").innerText = `Welcome ${UserName}`;
    }else{
        document.getElementById("User-info").innerText = "No user yet, please register or login first";
    }

    const LogOut = document.getElementById("BtnLogOut");
    LogOut.addEventListener("click",() => {
        localStorage.clear();
        window.location.href = 'LoginPage.html';
    });

    const recomendationDiv = document.querySelector(".card-recomendation");
    var req = new XMLHttpRequest();
    req.open('GET','https://localhost:7173/api/Hotel',true)
    req.onload = function(){
        if(req.status === 200){
            console.log(req);
            var response = JSON.parse(req.responseText);
            var hotels = response.data;

            hotels.forEach(hotel => {
                const card = document.createElement("div");
                card.className = "card";
                
                const img = document.createElement("img");
                img.src = hotel.hotelImage;
                img.alt = hotel.hotelName;

                const cardTitle = document.createElement("h3");
                cardTitle.className = "sub";
                cardTitle.textContent = hotel.hotelName;

                const cardText = document.createElement("p");
                cardText.className = "place";
                cardText.textContent = `${hotel.hotelType} | Rating: ${hotel.hotelRating} star`;

                card.appendChild(img);
                card.appendChild(cardTitle);
                card.appendChild(cardText);

                recomendationDiv.appendChild(card);
            });
        }else{
            console.error('Error fetching hotel data: ',req.statusText);
        }
    };
    req.onerror = function(){
      console.error('Request failed');  
    };
    req.send();
})