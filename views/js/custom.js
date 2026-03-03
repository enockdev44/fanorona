var board = {isa:'', roa: '', telo: '', efatra: '', dimy: '', enina: '', fito: '', valo: '', sivy: '', mpilalao: 'P1'};
var message = "";

class Game {
    player1; // Ronaldo
    player2; // Messi
    whoWin; // Messi
    gameOver; // draw or win 
    
    constructor() {
        this.player1 = "Ronaldo";
        this.player2 = "Messi";
        this.whoWin = "";
        this.gameOver = "";
        
        $("#player1").html(this.player1);
        $("#player2").html(this.player2);
    }
  
    
    saveInDatabase() {
        //console.log('Game saved!');
        //console.log(this);

        $.post("/api/game",
            {
                player1: this.player1,
                player2: this.player2,
                whoWin: this.whoWin,
                gameOver: this.gameOver
            },
            function(data, status){
                console.log("Data: " + data + "\nStatus: " + status);
            }
        );
        var element = '';
        for (let ele of ['isa', 'roa', 'telo', 'efatra', 'dimy', 'enina', 'fito', 'valo', 'sivy']) {
            element = '#'+ele;
            $(element).off('click');
        }
    }
    
    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }
    
    getWhoWin() {
        return this.whoWin;
    }
    
    getGameOver() {
        return this.gameOver;
    }
}

var game = null;

function sendProductId(id, name, price) {
    $("#productForm").attr("action", "/api/products/"+id);
    $("#methodForm").val("PUT");
    $("#idForm").val(id);
    $("#name").val(name);
    $("#price").val(price);
}

function startGame() {
    game = new Game();
    infoPlayer();
    resetBoard();
}

function resetBoard() {
    $("#isa").html('<div class="p-2">X</div>');
    $("#roa").html('<div class="p-2">X</div>');
    $("#telo").html('<div class="p-2">X</div>');
    $("#efatra").html('<div class="p-2">X</div>');
    $("#dimy").html('<div class="p-2">X</div>');
    $("#enina").html('<div class="p-2">X</div>');
    $("#fito").html('<div class="p-2">X</div>');
    $("#valo").html('<div class="p-2">X</div>');
    $("#sivy").html('<div class="p-2">X</div>');
    board = {isa:'', roa: '', telo: '', efatra: '', dimy: '', enina: '', fito: '', valo: '', sivy: '', mpilalao: 'P1'};
}

function youWin(text) {
    $('#victory').show(1000);
    $('#victory h3').html(text); 
    $('#victory p').html(message);
    //$('#board').hide(1000);
    $('#information').hide(1000);
    game.gameOver = "win";
}

function drawGame() {
    if(board.isa!='') {
        if(board.roa!='') {
            if(board.telo!='') {
                if(board.efatra!='') {
                    if(board.dimy!='') {
                        if(board.enina!='') {
                            if(board.fito!='') {
                                if(board.valo!='') {
                                        if(board.sivy!='') {
                                            if(game.whoWin=='') {
                                                $('#draw').show(1000);
                                                $('#draw h3').html("Oh! Sahala!"); 
                                                $('#draw p').html("Tsy misy mpandresy fa ady sahala ny anareo!");
                                                game.gameOver = "draw";    
                                                //$('#board').hide(1000);
                                                $('#information').hide(1000);

                                                game.saveInDatabase();
                                                //resetBoard();
                                            } // no winner

                                        }
                                }

                            }

                        }

                    }

                }

            }
        }
    }
}

function colorizeResult(result) {
    switch(result) {
        //horizontal
        case '123':
            $('#isa').html('1');
            $('#roa').html('2');
            $('#telo').html('3');
            $('#isa').addClass('bg-success text-white');
            $('#roa').addClass('bg-success text-white');
            $('#telo').addClass('bg-success text-white');
            break;
        case '456':
            $('#efatra').html('4');
            $('#dimy').html('5');
            $('#enina').html('6');
            $('#efatra').addClass('bg-success text-white');
            $('#dimy').addClass('bg-success text-white');
            $('#enina').addClass('bg-success text-white');
            break;
        case '789':
            $('#fito').html('7');
            $('#valo').html('8');
            $('#sivy').html('9');
            $('#fito').addClass('bg-success text-white');
            $('#valo').addClass('bg-success text-white');
            $('#sivy').addClass('bg-success text-white');
            break;
        //vertical
        case '147':
            $('#isa').html('1');
            $('#efatra').html('4');
            $('#fito').html('7');
            $('#isa').addClass('bg-success text-white');
            $('#efatra').addClass('bg-success text-white');
            $('#fito').addClass('bg-success text-white');
            break;
        case '258':
            $('#roa').html('2');
            $('#dimy').html('5');
            $('#valo').html('8');
            $('#roa').addClass('bg-success text-white');
            $('#dimy').addClass('bg-success text-white');
            $('#valo').addClass('bg-success text-white');
            break;
        case '369':
            $('#telo').html('3');
            $('#enina').html('6');
            $('#divy').html('9');
            $('#telo').addClass('bg-success text-white');
            $('#enina').addClass('bg-success text-white');
            $('#sivy').addClass('bg-success text-white');
            break;
        //diagonal
        case '159':
            $('#isa').html('1');
            $('#dimy').html('5');
            $('#sivy').html('9');
            $('#isa').addClass('bg-success text-white');
            $('#dimy').addClass('bg-success text-white');
            $('#sivy').addClass('bg-success text-white');
            break;
        case '357':
            $('#telo').html('3');
            $('#dimy').html('5');
            $('#fito').html('7');
            $('#telo').addClass('bg-success text-white');
            $('#dimy').addClass('bg-success text-white');
            $('#fito').addClass('bg-success text-white');
            break;
        default:
            break;
    }
    
}

function winGame() {
    /*
        horizontal win game
    */
    // X 123
    if(board.isa=='X') {
        if(board.roa==board.isa) {
                if(board.telo==board.isa) {
                    message = 'Arahabaina fa nandresy mahintsy matory na 123 ianao!';
                    colorizeResult('123');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // X 456
    if(board.efatra=='X') {
        if(board.dimy==board.efatra) {
                if(board.enina==board.efatra) {
                    message = 'Arahabaina fa nandresy mahintsy matory na 456 ianao!';
                    colorizeResult('456');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // X 789
    if(board.fito=='X') {
        if(board.valo==board.fito) {
                if(board.sivy==board.fito) {
                    message = 'Arahabaina fa nandresy mahintsy matory na 789 ianao!';
                    colorizeResult('789');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // O 123
    if(board.isa=='O') {
        if(board.roa==board.isa) {
                if(board.telo==board.isa) {
                    message = 'Arahabaina fa nandresy mahintsy matory na 123 ianao!';
                    colorizeResult('123');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // O 456
    if(board.efatra=='O') {
        if(board.dimy==board.efatra) {
                if(board.enina==board.efatra) {
                    message = 'Arahabaina fa nandresy mahintsy matory na 456 ianao!';
                    colorizeResult('456');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // O 789
    if(board.fito=='O') {
        if(board.valo==board.fito) {
                if(board.sivy==board.fito) {
                    message = 'Arahabaina fa nandresy mahintsy matory na 789 ianao!';
                    colorizeResult('789');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }

    /*
        vertical win game
    */
    
    // X 147
    if(board.isa=='X') {
        if(board.efatra==board.isa) {
                if(board.fito==board.isa) {
                    message = 'Arahabaina fa nandresy mahintsy mitsangana na 147 ianao!';
                    colorizeResult('147');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // X 258
    if(board.roa=='X') {
        if(board.dimy==board.roa) {
                if(board.valo==board.roa) {
                    message = 'Arahabaina fa nandresy mahintsy mitsangana na 258 ianao!';
                    colorizeResult('258');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // X 369
    if(board.telo=='X') {
        if(board.enina==board.telo) {
                if(board.sivy==board.telo) {
                    message = 'Arahabaina fa nandresy mahintsy mitsangana na 369 ianao!';
                    colorizeResult('369');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    
    // O 147 na 258 na 369
    if(board.isa=='O') {
        if(board.efatra==board.isa) {
                if(board.fito==board.isa) {
                    message = 'Arahabaina fa nandresy mahintsy mitsangana na 147 ianao!';
                    colorizeResult('147');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // O 258
    if(board.roa=='O') {
        if(board.dimy==board.roa) {
                if(board.valo==board.roa) {
                    message = 'Arahabaina fa nandresy mahintsy mitsangana na 258 ianao!';
                    colorizeResult('258');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // O 369
    if(board.telo=='O') {
        if(board.enina==board.telo) {
                if(board.sivy==board.telo) {
                    message = 'Arahabaina fa nandresy mahintsy mitsangana na 369 ianao!';
                    colorizeResult('369');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    
    /*
        diagonal win game
    */
    // X 159
    if(board.isa=='X') {
        if(board.dimy==board.isa) {
                if(board.sivy==board.isa) {
                    message = 'Arahabaina fa nandresy mihorirana na 159 ianao!';
                    colorizeResult('159');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // X 357
    if(board.telo=='X') {
        if(board.dimy==board.telo) {
                if(board.fito==board.telo) {
                    message = 'Arahabaina fa nandresy mihorirana na 357 ianao!';
                    colorizeResult('357');
                    youWin("Nandresy i "+ game.getPlayer1() +"!");
                    game.whoWin = game.player1;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // O 159
    if(board.isa=='O') {
        if(board.dimy==board.isa) {
                if(board.sivy==board.isa) {
                    message = 'Arahabaina fa nandresy mihorirana na 159 ianao!';
                    colorizeResult('159');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    // X 357
    if(board.telo=='O') {
        if(board.dimy==board.telo) {
                if(board.fito==board.telo) {
                    message = 'Arahabaina fa nandresy mihorirana na 357 ianao!';
                    colorizeResult('357');
                    youWin("Nandresy i "+ game.getPlayer2() +"!");
                    game.whoWin = game.player2;
                    game.saveInDatabase();
                    //startGame();
                }
        }        
    }
    changePlayer();
    drawGame();
}
function infoPlayer() {
    if(board.mpilalao=='P1') {
        $('#information h3').html("Ry "+ game.getPlayer1() +"!");
    } else if(board.mpilalao=='P2') {
        $('#information h3').html("Ry "+ game.getPlayer2() +"!");
    }
    $('#information p').html("Toronao izao!");
}
function changePlayer() {
    if(board.mpilalao=='P1') {
        board.mpilalao = 'P2';
    } else if(board.mpilalao=='P2') {
        board.mpilalao = 'P1';
    }
    infoPlayer();
}

$(document).ready(function(){
  $('#victory').hide(100);
  $('#draw').hide(100);
  
  startGame();
  $("#isa").click(function(){
    if(board.mpilalao=='P1') {
        board.isa = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.isa = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#roa").click(function(){
    if(board.mpilalao=='P1') {
        board.roa = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.roa = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#telo").click(function(){
    if(board.mpilalao=='P1') {
        board.telo = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.telo = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#efatra").click(function(){
    if(board.mpilalao=='P1') {
        board.efatra = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.efatra = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#dimy").click(function(){
    if(board.mpilalao=='P1') {
        board.dimy = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.dimy = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#enina").click(function(){
    if(board.mpilalao=='P1') {
        board.enina = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.enina = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#fito").click(function(){
    if(board.mpilalao=='P1') {
        board.fito = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.fito = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#valo").click(function(){
    if(board.mpilalao=='P1') {
        board.valo = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.valo = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
  $("#sivy").click(function(){  
    if(board.mpilalao=='P1') {
        board.sivy = 'X';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">X</div>');  
    } else if(board.mpilalao=='P2') {
        board.sivy = 'O';
        $(this).off('click');
        $(this).html('<div class="p-2 text-dark">O</div>');  
    }
    winGame();
  });
});
