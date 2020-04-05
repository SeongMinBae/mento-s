function createPageChangeFunc(data) {
        return function() {
            var elmName = document.querySelector("#name-contact"),
                elmNum = document.querySelector("#number-contact");

            emptyElement(elmName).appendChild(document.createTextNode(MENU_NAME[data]));
            if(data == 0){
            	pageController.movePage("page-fish");
            }
            if(data == 1){
            	location.href = "info.html";
            }
            //20200403 by Dobby
            if(data==5)
            {
            	location.href="fishcount.html";
            }
        };
    }
