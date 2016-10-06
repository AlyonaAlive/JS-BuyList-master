$(function(){
    var itemList = [];
    var template='<div class=\"line clearfix item_container\">' + $(".item_container").html() + "</div>";
    
    function addItemToArray(name, count, state){
        itemList.push({name,count,state});
    }
    
    function plusOneItem(name){
        itemList.forEach(function(value){
            if(name == value.name){
                value.count+=1;
            } 
         
        });
    }
    
    function minusOneItem(name){
        itemList.forEach(function(value){
            if(name == value.name){
                value.count-=1;
            } 
        });
    }
    
    function changeStatus(name){
        itemList.forEach(function(value){
            if(name == value.name){
                value.state = !value.state;
            } 
        });
    }
    
    function deleteItemByName(name){
        itemList.forEach(function(value){
            if(name == value.name){
                itemList.splice(value.indexOf, 1);
            } 
        });
    }
    
    function logList(){
        console.log("-------------");
        itemList.forEach(function(value){
            console.log(value); 
        });
    }
    
    function initList(){
        var items = ['Помідори', 'Сир', 'Печиво'];
        $(".item_container").remove();
        for(var i =0; i<3; i++){
            $('.left_column').append(template);
            $(".item_container").last().find('.item_name').text(items[i]);
            $('.item_container').css('display', 'block');
            addItemToArray(items[i], 1, false);
        }
        addListenersToButtons();
        drawRightBar();
    }
    
    initList();
  
    function drawRightBar(){
        $('.right_column').remove();
        $('.center').append("<div class=\"right_column\"><div class=\"segment\"><h3>Залишилось</h3></div><div class=\"segment\"><div class=\"not_bought\"></div></div><div class=\"segment\"><h3>Куплено</h3></div><div class=\"segment\"><div class=\"stats-bought\" ></div></div></div>");
        itemList.forEach(function(value){
            if(!value.state){
                $('.not_bought').append("<span class=\"label\"><span class=\"title\">" + value.name + "</span><span class=\"orange_circle_count\">"+value.count+"</span></span>");
            }
            else{
                 $('.stats-bought').append("<span class=\"label\" style=\"text-decoration:line-through;\"><span class=\"title\" style=\"text-decoration: line-throught;\">" + value.name + "</span><span class=\"orange_circle_count\">"+value.count+"</span></span>");
            }
        });  
    
    }
    
    function addOneItem(name){
        addItemToArray(name, 1, false);
        $('.left_column').append(template);
        $(".item_container").last().find('.item_name').text(name);
        $('.item_container').css('display', 'block');
        addListenersToButtons();
        
    }
   
    function addListenersToButtons(){
        
        $(".delete_button").click(function(){
            $(this).parent().parent().remove();
            deleteItemByName($(this).parent().parent().find('.item_name').html());
            drawRightBar();
        });

        $(".buy_button").click(function(){
            changeStatus($(this).parent().parent().find(".item_name").html());
            $(this).parent().parent().find(".item_name").removeClass("item_name_not_bought");
            $(this).parent().parent().find(".item_name").addClass("item_name_bought");

            $(this).parent().parent().find(".delete_button").css("display","none");
            $(this).parent().parent().find(".icon_red_button").css("display","none");
            $(this).parent().parent().find(".icon_green_button").css("display","none");

            $(this).css("display","none");
            $(this).parent().parent().find(".notbought_button").css("display","block");
            drawRightBar(); 

        });   

        $(".notbought_button").click(function(){
            changeStatus($(this).parent().parent().find(".item_name").html());
            $(this).parent().parent().find(".item_name").addClass("item_name_not_bought");
            $(this).parent().parent().find(".item_name").removeClass("item_name_bought");

            $(this).parent().parent().find(".delete_button").css("display","inline");
            $(this).parent().parent().find(".icon_red_button").css("display","inline");
            $(this).parent().parent().find(".icon_green_button").css("display","inline");

            $(this).css("display","none");
            $(this).parent().parent().find(".buy_button").css("display","inline");
             drawRightBar();
        });

        $(".add_new_button").click(function(){
            var text=$('.input_item_name').val();
            if(text.length>0){ 
                addOneItem(text);
                drawRightBar();
                $('.input_item_name').val("");
            }

        });

        $(".icon_green_button").click(function(){
            plusOneItem($(this).parent().parent().find(".item_name").html());
            var count = ($(this).parent().find(".count_label")).html();
            count++;
            $(this).parent().find(".count_label").text(count);
            drawRightBar();
        });

        $(".icon_red_button").click(function(){
            var count=($(this).parent().find(".count_label")).html();
            if(count>1){
                count--;
                minusOneItem($(this).parent().parent().find(".item_name").html());
                $(this).parent().find(".count_label").text(count);
                drawRightBar();   
            }
        });
    }
    
});
