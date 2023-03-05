const cards = [
    "ciri.png",
    "geralt.png",
    "jaskier.png",
    "jaskier.png",
    "iorweth.png",
    "triss.png",
    "geralt.png",
    "yen.png",
    "ciri.png",
    "triss.png",
    "yen.png",
    "iorweth.png"
];

let oneVisible = false;
let turnCounter = 0;
let visible_nr;
let lock = false;
let pairsLeft = 6;

const cardIds = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11'];

for (let i = 0; i < cardIds.length; i++) {
    const card = document.getElementById(cardIds[i]);
    card.addEventListener('click', function ()  {
        revealCard(i);
    });
}

function revealCard(nr)
{
    let opacityValue = $('#c'+nr).css('opacity')
    if (opacityValue !== 0 && lock === false)
    {
        lock = true;
        let obraz = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', obraz).addClass('cardA').removeClass('card');

        if (oneVisible === false)
        {
            // first card
            oneVisible = true;
            visible_nr = nr;
            lock = false;
        }
        else
        { // second card
            if (cards[visible_nr] === cards[nr])
            {
                // console.log("para");
                setTimeout(function () { hideCards(nr, visible_nr) }, 750);
            }
            else
            { // console.log("pudło");
                setTimeout(function () { restoreCards(nr, visible_nr) }, 1000)
            }

            turnCounter ++;
            $('.score').html("Turn counter: " + turnCounter);
            oneVisible = false;
        }
    }
}

function restoreCards (nr1, nr2)
{
    $('#c' + nr1).css('background-image', 'url(img/karta.png)').addClass('card').removeClass('cardA');
    $('#c' + nr2).css('background-image', 'url(img/karta.png)').addClass('card').removeClass('cardA');
    lock = false;
}
function hideCards(nr1, nr2)
{
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');
    pairsLeft--;

    if (pairsLeft == 0)
    {
        $('.board').html('<h1>You win!<br>Done in ' + turnCounter + ' turns</h1>');
    }
    lock = false;
}