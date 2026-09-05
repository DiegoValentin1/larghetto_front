// Helpers para normalizar y validar montos (mensualidad/inscripcion) que llegan
// como texto libre desde inputs (ej. "$1,350", "1350 MXN") antes de mandarlos
// al backend, que espera un número plano.

/**
 * Limpia un valor de monto: quita "$", "MXN", espacios y comas de miles.
 * Devuelve "" si el valor es null/undefined/vacío.
 * @param {string|number} valor
 * @returns {string}
 */
export const limpiarMonto = (valor) => {
    if (valor === null || valor === undefined) return "";
    return String(valor)
        .replace(/\$/g, "")
        .replace(/MXN/gi, "")
        .replace(/,/g, "")
        .trim();
};

/**
 * Valida que un monto limpio sea un número válido (enteros o hasta 2 decimales).
 * @param {string|number} valor
 * @returns {boolean}
 */
export const esMontoValido = (valor) => {
    const limpio = limpiarMonto(valor);
    return /^\d+(\.\d{1,2})?$/.test(limpio);
};

/**
 * Convierte un monto de texto libre a número. Devuelve 0 si está vacío o inválido.
 * @param {string|number} valor
 * @returns {number}
 */
export const montoANumero = (valor) => {
    const limpio = limpiarMonto(valor);
    if (!limpio) return 0;
    const numero = Number(limpio);
    return Number.isNaN(numero) ? 0 : numero;
};
