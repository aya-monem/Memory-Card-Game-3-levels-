
window.onload = on_load;
function on_load(){
    document.getElementById("notifications").style.display = "none";
    document.getElementById("difficulty").style.display = "block";
    document.getElementById("topPart").style.display = "none";
    document.getElementById("easyMode").style.display = "none";
    document.getElementById("mediumMode").style.display = "none";
    document.getElementById("hardMode").style.display = "none";
};
function choseMode(ele){
     mode = ele.getAttribute('data-mode');
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("topPart").style.display = "block";
    document.getElementById("topPart").classList.add(mode); // to know which mode is chosen
    document.getElementById(mode).style.display = "block";
    start_game(mode);
}
 function restart(ele){
    var getMode = ele.parentNode.parentNode.parentNode.classList[2];// easy or medium or hard
    start_game(getMode);
 }
function start_game(mode){
      // shuffle of cards
      chosed_mode_area =  document.getElementById(mode);
      cards = chosed_mode_area.getElementsByClassName("cardStyle"); 
      cards=[...cards];
      shuffled_cards = array_shuffle(cards); 
      ///// restart cases
      // 1 - removing all classes
      cards.forEach(function(element){
        element.classList.remove("open","match","unmatch","disabled");
      }); 
      //
      document.getElementById("notifications").style.display = "none";
      // 3- initial no of moves
      no_moves = 0;
      stars = document.getElementsByClassName("fas fa-star");
   for (var i = 0 ; i < 3 ; i++){
       stars[i].style.visibility = "visible";
   }
   document.getElementById("moves").innerHTML = "";
   document.getElementById("counter_show").innerHTML = "";
   ////
     var rows = chosed_mode_area.getElementsByClassName("rowStyle");

      putInsideHtml(rows,shuffled_cards);
      cards.forEach(function(ele){
        ele.classList.add("open");
     });

     // empty 
     openedCards = [];
     matched_cards = [];

      // showing all cards at first second
   setTimeout(function(){
    cards.forEach(function(ele){
       ele.classList.remove("open");
       ele.addEventListener("click", showCard );
       ele.addEventListener("click", opened_cards );
    });
  },900);
    // 2- initial the counter
    
    seconds = 0;
    minutes = 3;
    clearInterval(counter_play);
    document.getElementById("counter_show").style.color = "black";
    
    //  start counter   
        call_counter();
  
} // close of start function


  // declaration of array_shuffle function 
  
  function array_shuffle(arr){
    
    var empty_place_for_swapping;
      for (var j = arr.length-1 ; j > 0 ; j--){
            var random_index = Math.floor(Math.random() * (j+1));
            empty_place_for_swapping = arr[random_index];
            arr[random_index] = arr[j];
            arr[j] = empty_place_for_swapping ;
      }
      return (arr);
   };

        // declaration of putInsideHtml function (put shuffled cards in html) 
   function putInsideHtml(rows,shuffled_cards){
    // easy mode 
    if(rows.length == 3){
        for(var i = 0 ; i < 4 ; i++ ){
            rows[0].appendChild(shuffled_cards[i]);
        }
        for(var i = 4 ; i < 8 ; i++ ){
           rows[1].appendChild(shuffled_cards[i]);
       }
       for(var i = 8 ; i < 12 ; i++ ){
           rows[2].appendChild(shuffled_cards[i]);
       }
    }

    // medium mode 
    if(rows.length == 5){
        for(var i = 0 ; i < 4 ; i++ ){
            rows[0].appendChild(shuffled_cards[i]);
        }
        for(var i = 4 ; i < 8 ; i++ ){
           rows[1].appendChild(shuffled_cards[i]);
       }
       for(var i = 8 ; i < 12 ; i++ ){
           rows[2].appendChild(shuffled_cards[i]);
       }
       for(var i = 12 ; i < 16 ; i++ ){
           rows[3].appendChild(shuffled_cards[i]);
       }
       for(var i = 16 ; i < 20 ; i++ ){
          rows[4].appendChild(shuffled_cards[i]);
       }
    }

    // hard mode 
    if(rows.length == 6){
        for(var i = 0 ; i < 7 ; i++ ){
            rows[0].appendChild(shuffled_cards[i]);
        }
        for(var i = 7 ; i < 14 ; i++ ){
           rows[1].appendChild(shuffled_cards[i]);
       }
       for(var i = 14 ; i < 21 ; i++ ){
           rows[2].appendChild(shuffled_cards[i]);
       }
       for(var i = 21 ; i < 28 ; i++ ){
           rows[3].appendChild(shuffled_cards[i]);
       }
       for(var i = 28 ; i < 35 ; i++ ){
          rows[4].appendChild(shuffled_cards[i]);
       }
       for(var i = 35 ; i < 42 ; i++ ){
           rows[5].appendChild(shuffled_cards[i]);
       }
    }
     
}// close of function putInsideHtml

      // declaration of show card function 
  function showCard(){
    this.classList.add("open");
   
 };

  openedCards = [];
  matched_cards = [];
 function opened_cards(){
   
      openedCards.push(this);
      no_moves++ ;
      moves_counter(); 
      this.removeEventListener("click", showCard);
      this.removeEventListener("click", opened_cards);
        if(openedCards.length === 2){
         
            if (openedCards[0].childNodes[0].className === openedCards[1].childNodes[0].className){ // matching case
                    openedCards.forEach(function(ele){
                        ele.classList.remove("open");
                        ele.classList.add("match");
                        matched_cards.push(ele);
                    });
                     setTimeout(function(){
                      openedCards[0].classList.remove("match");
                      openedCards[0].classList.add("disabled");
                      openedCards[1].classList.remove("match");
                      openedCards[1].classList.add("disabled");
                      openedCards = [];
                      
                            /// case of finishing game (all cards matched) 
                           
                           if(matched_cards.length == cards.length){
                                clearInterval(counter_play);
                                document.getElementById("notifications").style.display = "block";
                                document.getElementsByClassName("message")[0].innerHTML = "Congratulation <br> You are a winner.... <i class='fas fa-trophy'></i> "
                                
                         
                           }

                     },600);      
                           
            }
            
            else  {   // unmatching case 
                  // adding unmatch class
                openedCards.forEach(function(ele){
                  ele.classList.remove("open");
                    ele.classList.add("unmatch");
                  });
                    // after 600 msec , remove unmatch class
                    setTimeout(function(){

                      openedCards.forEach(function(ele){
                      ele.classList.remove("unmatch");
                      ele.addEventListener("click", showCard );
                      ele.addEventListener("click", opened_cards );
                      });
                      openedCards = [];  

                  },600);
              
              } 
        } // close of outer if                       
 }; // close of function opened_cards   

      
     // declaration of counter function
     var counter_play;
 function call_counter(){
     seconds = 0;
     minutes = 3;
    counter_play = setInterval(game_counter,1000);
   
};
function  game_counter(){
    
    if (seconds == 0){
      minutes-- ;
      seconds = 60 ;
    }
    seconds-- ;
    if(minutes == 0 && seconds == 10){
      document.getElementById("counter_show").style.color = "red";
    }
    if(seconds < 10){
          seconds='0'+seconds;
    }
    if(minutes == 0 && seconds == 0){
        document.getElementById("counter_show").innerHTML = "Time Out" ;
        cards.forEach(function(ele){
           ele.removeEventListener("click", showCard );
           ele.removeEventListener("click", opened_cards );
         });
         document.getElementById("notifications").style.display = "block";
         document.getElementsByClassName("message")[0].innerHTML = "Good luck !!"
        // document.getElementById("restartGame").removeEventListener("click",restart);
        clearInterval(counter_play);
        return;
    } 
    document.getElementById("counter_show").innerHTML ='0'+ minutes +" : "+  seconds ;
  
}

// declaration of moves_counter function

function  moves_counter(){
   // no_moves ++  ;
   document.getElementById("moves").innerHTML = no_moves ;
          /* RATING */
   // case of 3 stars rating
  
     if (no_moves > cards.length && no_moves <= cards.length+10 ) {
      stars[2].style.visibility = "hidden"; 
     }
     else if(no_moves > cards.length+10 && no_moves <= cards.length*2){
      stars[1].style.visibility = "hidden";
     }
     else if(no_moves > cards.length*2){
        stars[0].style.visibility = "hidden";
     }

 }  // close of moves_counter function

 // function of disappearing notification div
 function disappear(){
    document.getElementById("notifications").style.display = "none";
 }


/*
// declaration of pause game function
function pause_game(id){
   document.getElementById(id).style.display = "none";
   document.getElementById("playBtn").style.display = "block";
   clearInterval(counter_play);
}
function play_game(id){
    document.getElementById(id).style.display = "none";
    document.getElementById("pauseBtn").style.display = "block";
    setInterval(game_counter,1000);
 }
 */