function myFunction() {
    var x = document.getElementById("show");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

var btn = document.getElementById('submit').addEventListener('click',(e)=>{
  
  let item = document.getElementsByClassName('item')
  
  for (let i = 0; i < item.length; i++) {
    const element = item[i];
    if(element.value == ""){
      e.preventDefault();
      console.log(typeof(element.value))
      element.style.backgroundColor = "#f7d8d8";
    }
  }


})

    