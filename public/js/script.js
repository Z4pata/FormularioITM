mainTypeInputs = document.querySelectorAll('.category-select input[type="radio"]');
optionBtns = document.querySelectorAll('.option-btn');
submitBtn = document.querySelector('.submit-btn');



submitBtn.addEventListener('click', async () => {
    await enviarFormulario();
});

// Cambio de categoría
mainTypeInputs.forEach(function (input) {
    input.addEventListener('change', function () {
        document.getElementById('privado-group').style.display = this.id === "privado" ? "block" : "none";
        document.getElementById('publico-group').style.display = this.id === "publico" ? "block" : "none";
        document.getElementById('caminando-group').style.display = this.id === "caminando" ? "block" : "none";
    });
});


// Selección múltiple de opciones por grupo
optionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('selected');
    });
});


// Enviar formulario
async function enviarFormulario() {
    var mainType = document.querySelector('.category-select input[type="radio"]:checked').value;
    var selectedOptionBtns = document.querySelectorAll('.option-btn.selected');

    var opcionesSeleccionadas = [];
    selectedOptionBtns.forEach(function (btn) {
        if (btn.dataset.group === mainType) {
            opcionesSeleccionadas.push(btn.dataset.value);
        }
    });

    try {
        const response = await fetch('https://formulario-itm.vercel.app/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mainType: mainType,
                options: opcionesSeleccionadas
            })
        });

        if (response.status === 400) {
            alert('Por favor, selecciona al menos una opción para el tipo de transporte elegido.');
            return;
        }

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.status);
        }


        alert('Formulario enviado con éxito: ' + response.status + ' ' + await response.text());
        window.location.reload();
    } catch (error) {
        alert('Error al enviar el formulario: ' + error.message);
    }

}