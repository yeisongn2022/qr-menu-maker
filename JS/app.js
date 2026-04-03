document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const urlInput = document.getElementById('menu-url');
    const colorInput = document.getElementById('qr-color');
    const generateBtn = document.getElementById('generate-btn');
    const resultSection = document.getElementById('result-section');
    const qrCanvas = document.getElementById('qr-canvas');
    const downloadBtn = document.getElementById('download-btn');
    const printBtn = document.getElementById('print-btn');

    // Función para generar el código QR
    generateBtn.addEventListener('click', () => {
        const inputUrl = urlInput.value.trim();
        const qrColor = colorInput.value;

        // Validación simple de URL
        if (!inputUrl) {
            alert("Por favor, ingresa una dirección URL válida.");
            urlInput.focus();
            return;
        }

        // Crear el QR usando la librería QRious
        new QRious({
            element: qrCanvas,
            value: inputUrl,
            size: 500, // Tamaño interno de alta resolución
            level: 'H', // Máxima corrección de errores (ideal para impresión)
            foreground: qrColor,
            background: '#ffffff'
        });

        // Mostrar la sección de resultados con efecto suave
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Función para descargar la imagen
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'mi-codigo-qr-profesional.png';
        link.href = qrCanvas.toDataURL("image/png");
        link.click();
    });

    // Función de Impresión (Utiliza la regla @media print del CSS)
    printBtn.addEventListener('click', () => {
        // Simplemente llamamos al comando de impresión del sistema
        // El CSS se encarga de ocultar todo lo que no sea el QR
        // Verificamos si el canvas tiene contenido
        if (qrCanvas.width > 0) {
            window.print();
        } else {
            alert("Primero genera un código QR.");
        }
    });
});