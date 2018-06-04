var haslo = "Bez pracy nie ma kołaczy"; 
haslo = haslo.toUpperCase(); //Umieszczenie statycznego hasła.

var dlugosc = haslo.length;
var bledy = 0;

var yes = new Audio("sound/yes.wav");
var no = new Audio("sound/no.wav"); //Proste dźwięki przy odgadnianiu hasła.

var haslo1 = "";

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

var litery = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];﻿


function start()
{
	var tresc_diva = "";
	
	for(i=0; i<=34; i++) //Tworzenie alfabetu za pomocą JS. ta pętla tworzy 35 divów w którym każdy z nich zawiera swój znak. 
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if((i+1) % 7 == 0) //Co siedem znaków umieszczona jest przerwa dająca lepszy efekt wizualny.
			tresc_diva = tresc_diva + '<div style="clear: both;"> </div>';
	}
	
	document.getElementById("alfabet").innerHTML = tresc_diva;
	
	wypisz_haslo();
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
	var trafiona = false; //Po kliknięciu na litere, każda zostanie zmieniona na czerwoną. Dodatkowy if sprawdzi, czy jednak zamienić ją na zieloną.
	
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
		var element = "lit" + nr; //Zmiana stylu diva na zielony.
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		wypisz_haslo();
	}
	else
	{
		no.play();
		var element = "lit" + nr; //Zmiana stylu diva na czerwony.
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";"); //Zabezpieczenie, by ponowne klikanie wcześniej chybionej litery nie dodawało liczby błędów do wisielca.
		
		bledy++;
		var obraz = "img/s" + bledy + ".jpg"; //podmiana obrazka z folderu "img".
		document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'" alt="" />';
	}
	
	if(haslo == haslo1)
	{
		document.getElementById("alfabet").innerHTML = 'Wygrałeś! <br /> <br /> <span class="resetWin" onclick="location.reload()">ZAGRASZ JESZCZE RAZ?</span>'; //Wygrana.
	}
	
	if(bledy >= 9)
	{
		document.getElementById("alfabet").innerHTML = 'Przegrałeś! <br /> <br /> <span class="resetLose" onclick="location.reload()">ZAGRASZ JESZCZE RAZ?</span>'; //Przegrana.
	}

}