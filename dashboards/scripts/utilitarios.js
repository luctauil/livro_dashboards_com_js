/**
 * Converte valor monetário com vírgula para ponto decimal
 * Ex: "1.234,56" => 1234.56
 */
function normalizarValorMonetario(valor) {
    if (!valor) return 0;
    return parseFloat(
      valor.toString()
        .replace(/\./g, '') // remove separador de milhar
        .replace(',', '.')  // troca vírgula por ponto decimal
    );
}

/**
 * Transforma texto em letras maiúsculas
 * Ex: "sp" => "SP"
 */
function padronizarMaiusculo(texto) {
    return texto ? texto.toString().toUpperCase() : '';
}
  
/**
 * Transforma texto em letras minúsculas
 * Ex: "SP" => "sp"
 */
function padronizarMinusculo(texto) {
    return texto ? texto.toString().toLowerCase() : '';
}

/**
 * Substitui valor nulo ou undefined por 0
 */
function tratarNuloComoZero(valor) {
    return valor == null ? 0 : valor;
}