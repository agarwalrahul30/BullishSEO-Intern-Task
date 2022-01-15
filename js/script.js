//getting required elements
const searchWrapper = $(".search_input");
const inputBox = $("input");
const suggBox = $(".autocom-box");

//User presses any key and release
inputBox.keyup ((e)=>{
    if(e.which == 40 || e.which == 38) {
        return;
    }
    let userData = e.target.value;
    let emptyArray = [];

    if(userData) {
        //filtering array and user search to lowercase
        emptyArray = suggestions.filter((data)=>{
            //return only those names which start with user search
            return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            var statusColor;
            var phno;

            if(data.status === "Appointment") {
                statusColor = "green";
            }else {
                statusColor = "orange";
            }

            if(data.contact == null) {          //if patient does not give contact details
                phno = "";
            }else {
                phno = data.contact;
            }

            return data = '<li> <div class="container"> <table cellspacing="8"> <tr> <td rowspan="3"> <img src="images/'+data.gender.toLocaleLowerCase()+'.png" width="65px"></td> <td>'+data.name+'</td> <td class="status '+statusColor+'">'+data.status+'</td> </tr> <tr> <td>| '+data.age+' | '+data.gender+' | '+phno+'</td> </tr> <tr> <td>| '+data.place+'</td> </tr> </table> </div> </li>';
        });
        searchWrapper.addClass("active");          //show the drop-down suggestions
    }else {
        searchWrapper.removeClass("active");       //hide it back
    }
    showSuggestions(emptyArray);
  
    $("li").click(function(e) {
        $("input").val($(this).text().split(" ")[6]+" "+$(this).text().split(" ")[7]);
        searchWrapper.removeClass("active");
    });// to fill in name by clicking

    var li = $('li');
    var liSelected;
    $(window).keydown(function(e) {
    if (e.which === 40) {   //handling down arrow key press
        if (liSelected) {
            liSelected.removeClass('selected');
            next = liSelected.next();
            if (next.length > 0) {
                liSelected = next.addClass('selected');
            } else {
                liSelected = li.eq(0).addClass('selected');
            }
        } else {
            liSelected = li.eq(0).addClass('selected');
        }
        
        } else if (e.which === 38) {        //handling up arrow key press
            if (liSelected) {
                liSelected.removeClass('selected');
                next = liSelected.prev();
                if (next.length > 0) {
                    liSelected = next.addClass('selected');
                } else {
                    liSelected = li.last().addClass('selected');
                }
            } else {
                liSelected = li.last().addClass('selected');
            }
        }

        else if(e.which === 13) {           //handling Enter Key press
            if(liSelected) {
                liSelected.trigger('click');
            }
        }
    
    });
});

function showSuggestions(list) {
    let listData = "";
    let create;
    if(list.length){
        listData = list.join('');
    }

    userValue = inputBox.val();
    create = '<li> <div class="container"> <table cellspacing="8"> <tr> <td id="create-cell">Create <span><span id="create">'+userValue+'</span><span></span></td> <td><span id="create-status">New</span></td> </tr> </table> </div> </li>';

    listData+= create;          //if no suggestions match, this option will help add new person
    
    suggBox.html(listData);
}
