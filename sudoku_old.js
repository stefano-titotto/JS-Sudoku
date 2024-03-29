let s0 = [
'000700905',
'700021008',
'200060000',
'800000300',
'370000081',
'005000007',
'000090006',
'400630009',
'109002000'];

function stampa_input(s){
/* Scrivi nella tabella del file HTML 
	s: vettore di stringhe di numeri dove 0 significa cella vuota
*/

let tabella = document.getElementById('tabella');
let TableBody = document.getElementById("tableBody");

// crea le righe della tabella
for (let r = 0; r< s.length ; r++) {
	let el = s[r];
	var row = TableBody.insertRow();

	// crea le celle della riga	
	for (let c=0; c<el.length; c++){
		ch = el[c];
    	var cell = row.insertCell();   

		// scrivi il valore nella cella se diverso da 0
		if (ch!='0'){
			cell.innerHTML = ch;
			}

   	cell.width = '25px';
      cell.height = '25px';
		cell.align = 'center'
		cell.borderSpacing = '0px';
		
		// disegna i bordi dei quadranti
		if (!(r%3)){
			cell.style.borderTop = "thin solid black" ;
  			}
		if (!(c%3)) {
			cell.style.borderLeft = "thin solid black";
			}
		if (r==8){
			cell.style.borderBottom ="thin solid black"
			}
		if (c==8){
			cell.style.borderRight = "thin solid black"}
	}
}
}

function cancella_tabella(){
	var TableBody = document.getElementById("tableBody");
  	const rows = TableBody.rows;
  	if (rows) {
    	while (rows.length>0) {
      	TableBody.deleteRow(0)
    	}
	}
}


function stampa_tabella(s){
// Scrivi nella tabella del file HTML 
//	s: array bidimensionale di celle contenenti caratteri da '1' a '9'

let tabella = document.getElementById('tabella');
let TableBody = document.getElementById("tableBody");

// crea le righe della tabella utilizzando i contatori per riconoscere i multipli di 3
for (let r = 0; r< s.length ; r++) {
	let el = s[r];
	var row = TableBody.insertRow();

	// crea le celle della riga	
	for (let c=0; c<el.length; c++){
		ch = el[c];
    	var cell = row.insertCell();   

		// scrivi il valore nella cella se diverso da 0
		if (ch.length==1){
			cell.innerHTML = ch[0];
			}

   	cell.width = '25px';
      cell.height = '25px';
		cell.align = 'center'
		cell.borderSpacing = '0px';
		
		// disegna i bordi dei quadranti
		if (!(r%3)){
			cell.style.borderTop = "thin solid black" ;
  			}
		if (!(c%3)) {
			cell.style.borderLeft = "thin solid black";
			}
		if (r==8){
			cell.style.borderBottom ="thin solid black"
			}
		if (c==8){
			cell.style.borderRight = "thin solid black"
			}
	}
}
}

function importa_matrice(doku_text){
	let sudoku = [];
	for (stringa of doku_text){
		let riga = [];
		for (ch of stringa){
			if (ch=="0"){
				riga.push([])}
			else{
				riga.push([parseInt(ch)])}
		}
		sudoku.push(riga)
	}
	return sudoku
}

function pconsole(stringa){
	cons = document.getElementById("console")
	cons.innerHTML += stringa + "<br>"
	}

const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

function analizza_matrice(m_input){
	// crea un clone della matrice e riempi le celle con le possibili soluzioni
	matrice = clone(m_input);
	
	function numeri_colonna(c){
		// ritorna tutti i presenti nella colonna c 
		let numeri =[];
		for (r=0; r<9; r++){
			if (matrice[r][c].length == 1){
				numeri.push(matrice[r][c][0]);
			}
		}
		return numeri;
	}

	function numeri_riga(r){
		let numeri = [];
		for(c=0;c<9;c++){
			if (matrice[r][c].length == 1){
				numeri.push(matrice[r][c][0]);
			}
		}
		return numeri;
	}

	function numeri_quadrante(r,c){
		let numeri = []
		// Calcola le coordinate di partenza del quadrante
		let R = Math.floor(r/3)*3
		let C = Math.floor(c/3)*3
		for (let r=0; r<3;r++){
			for (let c=0; c<3; c++){
				let cella = matrice[R+r][C+c];
				if (cella.length == 1){
					numeri.push(cella[0])
				}
			}
		}
		return numeri;
	}

	// riempi le celle incognite con i numeri mancanti
	for (let r=0; r<9; r++){
		for (let c=0; c<9; c++){
			// Se la cella ha un solo elemento non è incognita quindi salta alla prossima iterazione
			if (matrice[r][c].length==1) {
				continue;
			}

			// identifica i numeri non presenti in riga/colonna/quadrante
			let numeri = [ 1, 2, 3, 4, 5, 6, 7, 8, 9]

			for (el of numeri_colonna(c)){
				let i = numeri.indexOf(el)
				if (i>-1){
					numeri.splice(i,1);
				}
			}
			for (el of numeri_riga(r)){
				let i = numeri.indexOf(el)
				if (i>-1){
					numeri.splice(i,1);
				}
			}
			for (el of numeri_quadrante(r,c)){
				let i = numeri.indexOf(el)
				if (i>-1){
					numeri.splice(i,1);
				}
			}
			
			// se non trova soluzioni ritorna null e chiude l'albero ricorsivo
			if (!numeri.length){
				return null;
			}

			// memorizza le possibili soluzioni nella cella
			matrice[r][c] = numeri;
		}
	}
	return matrice
} // fine analizza_matrice

function profondita(matrice){
	let acc = 0;
	for (riga of matrice){
		for (cella of riga){
			acc = acc + cella.length
		}
	}
	return acc
}

function riduci_matrice(matrice){
	// trova tutte le soluzioni possibili senza fare ipotesi
	// ritorna null se non ha trovato soluzioni
	let acc = 0;
	let p = 0
	let matrice2 = analizza_matrice(matrice);
	if (!matrice2){
		return null;
	}
	p = profondita(matrice2);
	//se p == acc significa che non sono stati fatti passi avanti da analizza_matrice
	// se p == 81 significa che tutte le celle hanno 1 solo valore e quindi il sudoku è risolto
	while (p!=acc && p > 81){
		matrice2 = analizza_matrice(matrice2);
		if (!matrice2){
			return null
		}
		acc = p;
		p = profondita(matrice2);
	}
	return matrice2
}

function trova(matrice){
	// trova la prima cella che ha 2 elementi, eventualmente 3, 4 ecc..
	// ritorna le coordinate r,c della cella
	for (let n=2; n<8; n++){
		for (let r=0; r<9; r++){
			for (let c=0; c<9; c++){
				if (matrice[r][c].length == n){
					return [r,c];
				}
			}
		}

	}
}

function risolvi(matrice){
	let matrice2 = riduci_matrice(matrice);
	// Se la riduzione fornisce un risultato nullo ritorna null
	if (!matrice2){
		return null;
	}
	
	let p = profondita(matrice2);
	// se tutte le 81 celle hanno 1 soluzione il sudoku è risolto
	if (p==81) {
		return matrice2;
	}

	// trova la prima cella su cui fare delle ipotesi
	let [r, c] = trova(matrice2)
	for (ipotesi of matrice2[r][c]){
		// crea matrice3 con soluzione ipotetica
		let matrice3 = clone(matrice2);
		matrice3[r][c] = [ipotesi];

		// chiamata ricorsiva a risolvi
		soluzione = risolvi(matrice3);
		// se trova la soluzione ritornala, altrimenti passa all'ipotesi successiva
		if (soluzione){
			return soluzione
		}
	}

}

doku =importa_matrice(s0);
stampa_tabella(doku);

alert("Risolvi il sudoku");

a = risolvi(doku);
if (a){
cancella_tabella();
stampa_tabella(a);
}
else{pconsole("Soluzione non trovata")}
