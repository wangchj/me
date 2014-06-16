

var canvasIsOpen = false;
var boardShown   = '';
/**
 * Entry point of the script. This is called after the page is loaded.
 */
$(function(){
    $('.app').click(function(e)
    {
        //Set the correct board on canvas
        updateDisplayBoard(this.id);

        //Reduce icon size
        $('.app-icon').animate({width: 32, height: 32}, {duration: 'fast',});
        $('.app').animate({'font-size':12},{duration:'fast'});
        $('.app').not(this).animate({opacity: 0.3}, {duration: 'fast', queue: false});
        $(this).css('opacity', 1);

        if($.contains($('#app-row-1').get(0), this)) //If row 1 clicked
        {
            $('#app-row-1').animate({top: -40},{ duration: 'fast'});
            $('#app-row-2').animate({top: (computeCanvasHeight() - 50) },{ duration: 'fast'}); //top:450
        }
        else //If row 2 clicked
        {
            $('#app-row-1').animate({top: -140},{ duration: 'fast'});
            $('#app-row-2').animate({top: -140},{ duration: 'fast'});
        }

        //Show nick
        //showCanvasNick(this);

        //Open the canvas
        $('#canvas').css('top', 130).show();
        $('#canvas').animate({height: computeCanvasHeight(), opacity: 1},{duration: 'fast'}); //height:505
        //Scroll canvas to top
        $('#canvas').scrollTop(0);
        canvasIsOpen = true;

        e.stopPropagation(); 
    });

    $('#canvas').click(function(e){e.stopPropagation();});

    $(document).click(function(e){
        if(e.which == 1)
            resetLayout();
    });
});

/**
 * 1. Close the display canvas
 * 2. Rest icon size and location
 * 3. Sets canvasIsOpen = false
 */
function resetLayout()
{
    if(canvasIsOpen)
    {
        //$('#canvas').animate({height: 0},{duration: 'fast'});
        $('#app-row-1').animate({top: 0},{ duration: 'fast'});
        $('#app-row-2').animate({top: 0},{ duration: 'fast'});
        $('#canvas').hide().css('height', 0);
        $('.app-icon').animate({width: 114, height: 114}, {duration: 'fast',});
        $('.app').animate({opacity: 1, 'font-size':14}, {duration: 'fast'});

        canvasIsOpen = false;
    }
}

/**
 * Sets the correct app display board on the canvas.
 * Sets boardShown = appId.
 */
function updateDisplayBoard(appId)
{
    //If already showing the right board, then nothing to do.
    if(appId === boardShown)
        return;

    //Get app name
    var name = appId.substring(appId.indexOf('-') + 1);
    //$('#canvas iframe').attr('src', name + '.html');
    $('#canvas').load(name + '.html'); //$('.board').attr('class','board');

    boardShown = appId;
}

/**
 * Computes canvas height from window height.
 */
function computeCanvasHeight()
{
    var minHeight = 500;
    var h = window.innerHeight * .75;
    if(h < minHeight)
        return minHeight;
    return h;
}

/**
 * Displays the canvas nick, if canvas is not open.
 * Adjust the position of the nick, if canvas is open.
 * @param appDom HTML DOM of the clicked app; this is not jQuery object.
 */ 
function showCanvasNick(appDom)
{
    if(canvasIsOpen && boardShown === appDom.id)
        return;
    var l = $(appDom).offset().left + $(appDom).width() / 2;
    var t = $(appDom).offset().top + 25;

    console.log(l + ' ' + t);

    if(!canvasIsOpen)
        $('#canvas_nick').css({top: t, left: l}).show();
    else
    {
        $('#canvas_nick').animate({top: t, left: l},{duration:'fast'});
    }
}