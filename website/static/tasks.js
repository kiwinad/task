let elementsArray = document.querySelectorAll(".btn-primary");
console.log(elementsArray)

elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function(){
        $.ajax({
            type: "POST",
            url: "/tasks",
            data: JSON.stringify({id: elem.id}, null, '\t'),
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                console.log(result);
            }
        }).then((_res) => {
            location.reload()
        })
    });
});

