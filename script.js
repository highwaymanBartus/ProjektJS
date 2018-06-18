let haslo = "Java Script"; 
haslo = haslo.toUpperCase(); //Umieszczenie statycznego hasła.

const dlugosc = haslo.length;
let bledy = 0;

const yes = new Audio("sound/yes.wav");
const no = new Audio("sound/no.wav"); //Proste dźwięki przy odgadnianiu hasła.

let haslo1 = "";

let pomoc_stoper = false;
let pomoc_stoper2 = false;

for(i=0; i<dlugosc; i++)  //Ta pętla podmienia kolejne znaki hasła na myślniki, pozostawiając spacje w nienaruszonym stanie.
{
	if(haslo.charAt(i)==" ")
		haslo1 = haslo1 + " ";
	else
		haslo1 = haslo1 + "-";
}

function wypisz_haslo() //Wypisane hasło z podmienionymi znakami.
{
	document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

const litery = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];﻿


function start()
{
	let tresc_diva = "";
	
	for(i=0; i<=34; i++) //Tworzenie alfabetu za pomocą JS. ta pętla tworzy 35 divów w którym każdy z nich zawiera swój znak. 
	{
		let element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if((i+1) % 7 == 0) //Co siedem znaków umieszczona jest przerwa dająca lepszy efekt wizualny.
			tresc_diva = tresc_diva + '<div style="clear: both;"> </div>';
	}
	
	document.getElementById("alfabet").innerHTML = tresc_diva;
	
	wypisz_haslo();
	
	odliczanie(); // Ujawnienie się zegara.
	
	poczatek_stopera();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if(miejsce > this.length - 1) //Zabezpieczenie się przed wyjściem z dostępnej pamięci.
		return this.toString();
	else
		return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function sprawdz(nr)
{
	let trafiona = false; //Po kliknięciu na litere, każda zostanie zmieniona na czerwoną. Dodatkowy if sprawdzi, czy jednak zamienić ją na zieloną.
	
	if(pomoc_stoper == false)
	{
		zacznij_liczyc();
		pomoc_stoper == true;
	}
	
	for(i=0; i<dlugosc; i++)
	{
		if(haslo.charAt(i) == litery[nr])
		{
			haslo1 = haslo1.ustawZnak(i, litery[nr]);
			trafiona = true;
		}
	}
	
	if(trafiona == true)
	{
		yes.play();
		let element = "lit" + nr; //Zmiana stylu diva na zielony.
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		wypisz_haslo();
	}
	else
	{
		no.play();
		let element = "lit" + nr; //Zmiana stylu diva na czerwony.
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";"); //Zabezpieczenie, by ponowne klikanie wcześniej chybionej litery nie dodawało liczby błędów do wisielca.
		
		bledy++;
		let obraz = "img/s" + bledy + ".jpg"; //podmiana obrazka z folderu "img".
		document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'" alt="" />';
	}
	
	if(haslo == haslo1)
	{
		document.getElementById("alfabet").innerHTML = 'Wygrałeś! <br /> <br /> <span class="resetWin" onclick="location.reload()">ZAGRASZ JESZCZE RAZ?</span>'; //Wygrana.
		
		pomoc_stoper2 = true;		
	}
	
	if(bledy >= 9)
	{
		document.getElementById("alfabet").innerHTML = 'Przegrałeś! <br /> <br /> <span class="resetLose" onclick="location.reload()">ZAGRASZ JESZCZE RAZ?</span>'; //Przegrana.
		
		pomoc_stoper2 = true;
	}
}

function odliczanie()
{
	let dzisiaj = new Date();
	
	let dzien = dzisiaj.getDate();
	if (dzien < 10) dzien = "0"+dzien;
	
	let miesiac = dzisiaj.getMonth()+1;
	if (miesiac < 10) miesiac = "0"+miesiac;
	
	let rok = dzisiaj.getFullYear();
	
	let godzina = dzisiaj.getHours();
	if (godzina < 10) godzina = "0"+godzina;
	
	let minuta = dzisiaj.getMinutes();
	if (minuta < 10) minuta = "0"+minuta;
	
	let sekunda = dzisiaj.getSeconds();
	if (sekunda < 10) sekunda = "0"+sekunda;
	
	document.getElementById("zegar").innerHTML = dzien+"/"+miesiac+"/"+rok+" | "+godzina+":"+minuta+":"+sekunda;
	
	setTimeout("odliczanie()",1000);
}

let stoper_minuty = 0;
let stoper_sekundy = 0;
let stoper_milisekundy = 0;
	
function poczatek_stopera()
{
	document.getElementById("stoper_h3").innerHTML = stoper_minuty+":"+stoper_sekundy+":"+stoper_milisekundy;
}

function zacznij_liczyc()
{	
	if(pomoc_stoper = true)
	{
		document.getElementById("stoper_h3").innerHTML = stoper_minuty+":"+stoper_sekundy+":"+stoper_milisekundy;
			
		stoper_milisekundy = stoper_milisekundy + 1;
		
		if(stoper_milisekundy == 10)
		{
			stoper_milisekundy = 0;
			stoper_sekundy++;
		
			if(stoper_sekundy == 60)
			{
				stoper_sekundy = 0
				stoper_minuty++;
			}
		}
		if(pomoc_stoper2 == false) setTimeout("zacznij_liczyc()",100)
	}
}
