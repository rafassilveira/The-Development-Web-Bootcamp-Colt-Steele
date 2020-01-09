var scores = [90, 98, 89, 100, 100, 86, 94];
function average(scores){
    var sum =0;
  
    for(var i=0; i<scores.length;i++){
        sum+=scores[i];      
    };
    var avg = sum/scores.length;
    
    return Math.round(avg);
};

console.log(average(scores));

