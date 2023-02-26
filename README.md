# Sudoku

Risolutore automatico di Sudoku. 
L'ho scritto in Javascript così mio padre lo può utilizzare semplicemente
con l'iPad senza doversi scaricare applicazioni.

## Prima versione

Trova la prima soluzione e la visualizza.

Non controlla se ci sono più soluzioni.

## Seconda versione

Verifica se il Sudoku ha soluzioni multiple.

In questo caso, non viene proposta nessuna soluzione ed il semaforo rimane rosso.

## Terza: soluzione parziale

Non visualizza la soluzione ma:
- visualizza il semaforo verde
- l'utente può vedere la soluzione cliccando casella per casella

- [ ] una funzione elimina per ogni casella le opzioni eccetto quella relativa alla soluzione e quella vuota.
- [ ] si potrebbe anche dare un colore diverso alle caselle del sudoku da quelle da risolvere.
- [x] la funzione vhe scrive il sudoku sul tabellone elimina dalla cella le opzioni diverse dal numero definito dal sudoku


## Quarta (todo)

Memorizza i sudoku da risolvere
