var player1 = prompt("enter your name player 1, you will be blue");
var player1col = '#FF00FF';

var player2 = prompt("enter your name player 2, you will be red");
var player2col = '#ADFF2F';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum) {
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowindex,colindex,color) {
  return $('table').eq(rowindex).find('td').eq(colindex).find('button').css('background-color',color);
}

function returnColor(rowindex,colindex) {
  return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color');
}

function checkBottom(colindex) {
  var reportcolor = returnColor(5,colindex);
  for (var row = 5; row > -1; row--) {
    reportcolor = returnColor(row,colindex);
    if (reportcolor === '#D3D3D3') {
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four) {
  return (one === two && one === three && one === four && one !== 'D3D3D3' && one!== undefined)
}

function horizontalWin() {
  for (var row = 0; row < 6; row++) {
    for (var col =0; col < 4; col++ ) {
      if (colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))) {
        console.log('horizontal');
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function verticalWin() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
      }
      else {
        continue;
      }
    }
  }
}

function diagonalWin() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row <7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return  true;
      }
      else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}



var currentPlayer = 1;
var currentName = player1;
var currentColor = player1col;

$('h3').text(player1 + 'its your turn,pick a coloumn to drop in');

$('.board button').on('click',function(){

  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);

  changeColor(bottomAvail,col,currentColor);

  if(horizontalWin() || verticalWin() || diagonalWin()){
    $('h1').text(currentName + ' you have won!');
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

currentPlayer = currentPlayer * -1;

  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName + 'its your turn');
    currentColor = player1col;
    currentPlayer = 2;
  }
  else{
    currentName = player2;
    $('h3').text(currentName + 'its your turn');
    currentColor = player2col;
    currentPlayer = 1;
  }
})
