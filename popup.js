// Abrir un nuevo popup para añadir nuevo script
document.getElementById('add-new').addEventListener('click', function () {
  var width = 600
  var height = 800
  var left = window.screen.availWidth / 2 - width / 2
  var top = window.screen.availHeight / 2 - height / 2

  chrome.windows.create({
    url: 'add_script.html',
    type: 'popup',
    width: width,
    height: height,
    left: Math.round(left),
    top: Math.round(top),
  })
})

// Cargar la lista de scripts guardados
function loadScripts() {
  var savedScripts = JSON.parse(localStorage.getItem('savedScripts') || '{}')
  var savedScriptsElement = document.getElementById('saved-scripts')
  savedScriptsElement.innerHTML = ''
  for (var scriptName in savedScripts) {
    var option = document.createElement('option')
    option.text = scriptName
    option.value = scriptName
    savedScriptsElement.add(option)
  }
}
loadScripts()

// Ejecutar el script seleccionado
document.getElementById('execute').addEventListener('click', function () {
  var scriptName = document.getElementById('saved-scripts').value
  var savedScripts = JSON.parse(localStorage.getItem('savedScripts') || '{}')
  var code = savedScripts[scriptName]
  chrome.tabs.executeScript(null, { code: code })
})


document.getElementById('edit').addEventListener('click', function () {
  var scriptName = document.getElementById('saved-scripts').value
  var savedScripts = JSON.parse(localStorage.getItem('savedScripts') || '{}')
  var code = savedScripts[scriptName]
  // Guardar el script a editar en localStorage
  localStorage.setItem(
    'editingScript',
    JSON.stringify({ name: scriptName, code: code })
  )

  // Abrir la ventana de edición
  var width = 600
  var height = 800
  var left = window.screen.availWidth / 2 - width / 2
  var top = window.screen.availHeight / 2 - height / 2
  chrome.windows.create({
    url: 'add_script.html',
    type: 'popup',
    width: width,
    height: height,
    left: Math.round(left),
    top: Math.round(top),
  })
})
