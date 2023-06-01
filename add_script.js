// Cuando la página se carga, rellenar los campos del formulario si hay un script a editar
document.addEventListener('DOMContentLoaded', function () {
  var editingScript = JSON.parse(localStorage.getItem('editingScript') || '{}')
  if (editingScript.name) {
    document.getElementById('script-name').value = editingScript.name
    document.getElementById('code').value = editingScript.code
  }
})

document.getElementById('save').addEventListener('click', function () {
  var scriptName = document.getElementById('script-name').value
  var code = document.getElementById('code').value
  var savedScripts = JSON.parse(localStorage.getItem('savedScripts') || '{}')
  savedScripts[scriptName] = code
  localStorage.setItem('savedScripts', JSON.stringify(savedScripts))

  // Borrar el script a editar de localStorage
  localStorage.removeItem('editingScript')

  window.close()
})
