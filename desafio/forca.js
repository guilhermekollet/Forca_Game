//implementação por Guilherme Kollet @guisklherme gui.s.kollet@gmail.com 19/07/2022 17:44
const chalk = require('chalk');

class Forca {

  constructor(secretWord)
  {

    this._secretWord = secretWord;
    this._stateGame = "aguardando chute";
    this._letrasChutadas = new Array;
    this._vidas = 6;
    this._palavra = this.buildPalavra(secretWord);
    this._wordsFinded = 0;
  
  }

  buildPalavra(secretWord)
  {

    let Palavra = new Array;

    for(let i = 0; i < secretWord.length; i++) Palavra.push("_");

    return Palavra;
  }

  updatePalavra(letra)
  {

    let Palavra = this._palavra;

    for(let i = 0; i < this._secretWord.length; i++)
    {

      if(letra == this._secretWord[i])
      {
        
        Palavra[i] = letra;
        this._wordsFinded += 1;

      }
    }

    return Palavra;
  }

  temLetra(letra)
  {

    for(let i = 0; i < this._secretWord.length; i++) if(letra == this._secretWord[i]) return true;

    return false;
  }

  jaJogado(letra)
  {

    for(let i=0; i < this._letrasChutadas.length; i++) if(letra == this._letrasChutadas[i]) return true;

    return false;
  }

  chutar(letra)
  {

    //verificador de caracter
    if(letra.length > 1) return console.log(chalk.red("\nDigite apenas uma letra!\n"));

    //verificador de letra já jogada
    if(this.jaJogado(letra)) return console.log(chalk.yellow("\Letra já jogada!\n"));;
    
    //incrementa a letra chutada
    this._letrasChutadas.push(letra);

    //verifica se a letra está contido na palavra secreta
    if(this.temLetra(letra))
    {
      console.log(chalk.green("\nAcertou!\n"));
      this._palavra = this.updatePalavra(letra);
      
      //se todas as letras foram encontradas, altera o estado
      if(this._wordsFinded == this._secretWord.length) this._stateGame = "ganhou";

      return true;
    }

    console.log(chalk.red("\nErrou!\n"));

    //incrementa a quantidade de vidas
    this._vidas -= 1;

    //verificador de vidas para end game
    if(this._vidas == 0) return this._stateGame = "perdeu";
  }

  buscarEstado() { return this._stateGame; }

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this._letrasChutadas,
          vidas: this._vidas,
          palavra: this._palavra
      }
  }
}

module.exports = Forca;
