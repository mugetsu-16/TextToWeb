//DOM variables
const backBtn = document.querySelector("#back");
const fwdkBtn = document.querySelector("#forward");

const index = parseInt(String(window.location).indexOf("chapter/")) + 8;
const num = String(window.location).substring(index);
let last;

let ch;
async function getLastCh() {
  const res = await fetch("/getLastCh");
  const data = await res.json();
  ch = data;

  if (num == data.lastChapter) {
    fwdkBtn.style.opacity = "0.5";
    last = true;
  } else if (num == 1) backBtn.style.opacity = "0.5";
}

backBtn.addEventListener('click', () => {
    if (num == 1)
        alert('this is already first chapter')
    else
    window.location = `/chapter/${parseInt(num) -1}`
})

fwdkBtn.addEventListener('click', () => {
    if (last == true)
        alert('this is already last chapter')
    else
    window.location = `/chapter/${parseInt(num) + 1}`
})


getLastCh();
