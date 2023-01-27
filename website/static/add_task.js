const text = document.getElementById("text-date")
const date = document.getElementById("date-input")
const btnGroup = document.getElementById("btn-group")
const submitBtn = document.getElementById("submit")
var buttonData

// displat date
text.addEventListener("click", ()=>{
    date.value = ""
    text.valie = ""
    date.showPicker()
    cheakDate()
    console.log(date.value)
})

// wait for user to choose
function cheakDate(){
    if (date.value == ""){
        window.setTimeout(cheakDate, 100);
    }
    else{
        const words = date.value.split("-")
        text.value = `${words[2]}/${words[1]}/${words[0]}`
    }
    return date.valie
}

// choose harry button
btnGroup.addEventListener("click", (e)=>{
    // remove choose button
    Array.from(btnGroup.getElementsByClassName("btn-outline-primary")).forEach(function(element) {
        element.classList.remove("btn-outline-primary")
        element.classList.add("btn-outline-dark")
      });
    // add choosen button
    e.target.classList.remove('btn-outline-dark');
    e.target.classList.add("btn-outline-primary")
    buttonData = e.target.textContent
    console.log(buttonData)
})


// send data
function sendData() {

    // whos task data
    const whosTask = document.getElementById("whos-task")
    
    const data = {
        "whos_task": whosTask.options[whosTask.selectedIndex].text,
        "whos_task_id": whosTask.value,
        "date": document.getElementById("text-date").value,
        "harry": buttonData,
        "task": document.getElementById("task").value
    }
    console.log(data)

    $.ajax({
        type: "POST",
        url: "/add-task",
        data: JSON.stringify(data, null, '\t'),
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
        }
    });
};

// submit data
submitBtn.addEventListener("click", ()=>{
    sendData()
    window.location.href = "/add-task"
})

