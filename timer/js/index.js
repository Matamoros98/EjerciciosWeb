

let hours = `00`,
  minutes = `00`,
  seconds = `00`,
  chronometerDisplay = document.getElementById('tiempo'),
  chronometerCall,
  divPlay = document.getElementById('play'), countItem = 0

function chronometer() {

  seconds++

  if (seconds < 10) seconds = `0` + seconds

  if (seconds > 59) {
    seconds = `00`
    minutes++

    if (minutes < 10) minutes = `0` + minutes
  }

  if (minutes > 59) {
    minutes = `00`
    hours++

    if (hours < 10) hours = `0` + hours
  }

  chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`

}

async function chronometerPlay() {
  await stateButton()

  chronometerCall = setInterval(chronometer, 1000);
}

async function chronometerPause() {
  await stateButton()
  clearInterval(chronometerCall)
  // console.log(`${hours}:${minutes}:${seconds}`)
}
async function chronometerStop() {
  try {
    throw new Error('error manual')
    await clearInterval(chronometerCall)
    await addRecordToList(chronometerDisplay.textContent)
    await stateButton()

    chronometerDisplay.textContent = `00:00:00`
    hours = `00`,
      minutes = `00`,
      seconds = `00`

  } catch (error) {
    await showErrorMessage(error.message)
    //console.log(error.message)

  }

}

async function addRecordToList(record) {
  const tableList = document.getElementById('table-list')
  countItem += 1
  createAt = await formatDateNow()
  itemList = [countItem, record, createAt]

  let row = tableList.querySelector('tbody').insertRow();

  for (let i = 0; i < itemList.length; i++) {
    console.log(itemList[i])
    var cell = row.insertCell(i)
    cell.innerHTML = itemList[i];
  }


}
function formatDateNow() {
  var createAt = new Date();

  // Get the day, month, year, hour, minute, and second of the date
  var day = createAt.getDate();
  var month = createAt.getMonth() + 1; // Months are zero-based, so add 1
  var year = createAt.getFullYear();
  var hour = createAt.getHours();
  var minute = createAt.getMinutes();
  var second = createAt.getSeconds();

  // Format the date and time components into "dd/mm/yyyy hh:mm:ss" format
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

function stateButton() {

  if (divPlay.hasAttribute('disabled')) {
    divPlay.removeAttribute('disabled')
    divPlay.classList.toggle('disabled-button')
  } else {
    divPlay.setAttribute('disabled', 'true')
    divPlay.classList.toggle('disabled-button')
  }

}

async function showErrorMessage(error) {
  try {
    //error = 'error desde funcion';
    //console.log(error + ' funcion')
    let PopUp = await document.createElement('div')
    let menu = await document.getElementById('menu-alert')
    menu.append(PopUp)
    await PopUp.setAttribute('id', 'popup')
    await PopUp.setAttribute('class', 'popup')
    let msg = await document.createElement('p')
    msg.innerHTML = error
    await PopUp.append(msg)

    var bottomActual = parseInt(getComputedStyle(PopUp).bottom, 10);
    var newPosition = bottomActual + 20 + newPosition + 'px';


    menu.style.bottom = newPosition;
    PopUp.style.display = 'block';
  } catch (error) {
    console.log(error)
  }


}



function closePopup() {
  popup.style.display = 'none';
}
