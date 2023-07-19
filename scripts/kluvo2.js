

// The hard work of this code base is not up to me. Its with thanks to user [u/kluvo2] at link [https://www.reddit.com/r/CitiesSkylines/comments/8hrdsd/add_all_subscribed_items_to_steam_collections_at/]

setTimeout(function(){

    // my contriubtion
    title = document.getElementsByClassName("manageCollectionItemsPageTitle")[0]

    if(document.getElementsByClassName("listContainerKluvo2Spotter").length == 0){
        list = document.createElement("ul")
        list.classList.add("listContainerKluvo2Spotter");
    
    
        listElements = [
            document.createElement("li"),
            document.createElement("li"),
            document.createElement("li"),
            document.createElement("li"),
            document.createElement("li")
        ]
    
        listElements[0].innerText = "open inspect element (right click -> 'inspect')"
        listElements[1].innerText = "go to 'network'"
        listElements[2].innerText = "press the green plus that has appeared on the webpage"
        listElements[3].innerText = "wait for the requests to finish"
        listElements[4].innerText = "refresh the page!"
    
        listElements.forEach(element => list.appendChild(element));
    
    
        information = document.createElement("p")
    
        information.innerText = "To know when this process is done:"
    
        title.appendChild(information)
        title.appendChild(list)
       
    
        cookie = document.cookie.match("(?:session).*?;")[0].split("=")[1].replace(";","")
    
        // my contribution
    }

    // Create "Add" button

    var btn_add = document.createElement("BUTTON");
    var collection_window = document.querySelector('div.collectionAddItemsSection')
    collection_window.insertBefore(btn_add,collection_window.firstChild);
    btn_add.setAttribute('id','ASCM_addall');
    jQuery('button#ASCM_addall').html('+')
    btn_add.style.position = 'absolute';
    btn_add.style.top = '110px';
    btn_add.style.right = '50px';
    btn_add.style['border-radius'] = '10px';
    btn_add.style.color = 'white';
    btn_add.style['font-size'] = '40px';
    btn_add.style.background = '#00c417';
    btn_add.style.width = '60px';
    btn_add.style.height = '60px';
    btn_add.style['text-decoration'] = 'none';
    // Create "Remove" button
    var btn_rem = document.createElement("BUTTON");
    var collection_window = document.querySelector('div.collectionAddItemsSection')
    collection_window.insertBefore(btn_rem ,collection_window.firstChild);
    btn_rem .setAttribute('id','ASCM_removeall');
    jQuery('button#ASCM_removeall').html('-')
    btn_rem.style.position = 'absolute';
    btn_rem.style.top = '110px';
    btn_rem.style.right = '120px';
    btn_rem.style['border-radius'] = '10px';
    btn_rem.style.color = 'white';
    btn_rem.style['font-size'] = '40px';
    btn_rem.style.background = '#c20000';
    btn_rem.style.width = '60px';
    btn_rem.style.height = '60px';
    btn_rem.style['text-decoration'] = 'none';
    // Bind "Add" button
    jQuery('button#ASCM_addall').click(function(){
        var items = [];
        var collection_name = jQuery('div.manageCollectionHeader div.breadcrumbs a').eq(2).text().trim();
        var url = new URL(document.location.href);
        var collection_id = url.searchParams.get('id');
        jQuery('div#MySubscribedItems div.itemChoice:not(.inCollection)').each(function(){
            var data = {
                id: collection_id,
                sessionid: cookie,
                childid: jQuery(this).attr('id').replace('choice_MySubscribedItems_',''),
                activeSection: collection_name
            };
            addToCollection(data, jQuery(this));
        });
    });
    // Bind "Remove" button
    jQuery('button#ASCM_removeall').click(function(){
        jQuery('div#MySubscribedItems div.itemChoice.inCollection').each(function(){
            window.RemoveChildFromCollection(jQuery(this).attr('id').replace('choice_MySubscribedItems_',''))
        });
    });
    // Function to send a request to add item to a collection
    function addToCollection(data, object){
        jQuery.ajax({
            type: "POST",
            url: 'https://steamcommunity.com/sharedfiles/addchild',
            data: data,
            success: function(response){
                if(object && response.success == 1){
                    object.addClass('inCollection');
                }
            }
        });
    }
}, 0);




