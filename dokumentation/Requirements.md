_Für diese Parteien noch requirements erfassen:_
- Andere Schulen
- Eltern

#Allgemeines:

1. Als Nutzer möchte ich mich anmelden können, um die Software zu nutzen.

2. Als Nutzer möchte ich die Möglichkeit haben, angemeldet zu bleiben, um Zeit zu sparen.
    
3. Als Nutzer möchte ich ein intuitives UI bedienen, damit ich mich nicht ärgere und schnell zum Ziel komme.
    
4. Als Nutzer möchte ich mit wenigen Klicks mein Ziel erreichen, um Zeit zu sparen.


#PT 1: AG Buchung für alle SuS

Nutzergruppen: SuS, System-admin, AG-Leiter (Admin)

##Fragen:
Frage | Antwort
---|---
Was ist in dem Fall ein Admin - ein Lehrer oder ein Systemadmin? | Es soll einen superadmin geben der Admins für die Bereiche einstellen kann. Es soll für einen Bereich n durch einen Superadmin festgelegte Admins geben.
Sollen sich die Listen am Ende des Jahres zurücksetzen oder sollen die Buchungen bestehen bleiben?|Es soll einen Manuellen löschen Button geben für das zurücksetzen einer Komponente geben. Das kann durch einen Admin ausgeführt werden. Diesen Knopf soll es einmal für jede Komponente geben.
Nutzernamen hinzufügen/andern/löschen können bei CSV Upload??? -> Was ist damit gemeint?|Soll das System für andere Schulen unabhängig von iServ machen. Geringe Priorität.
Soll es zwei mglk geben AGs zu importieren? Einmal als Liste und einmal einzelne?|Nein. CSV import für alle AGs. Oder die AGs einzeln auf der Seite anlegen.
?? Sollen alle diese Sachen durch einen AG-Leiter dezentral oder durch einen Systemadmin zentral gemacht werden können ??|Es wird zentral durch einen Admin gemacht

##user-stories
###SUS

1. Als SuS möchte ich mich mit "einem Klick" in eine AG ein oder austragen können, weil ich so ohne bürokratischen Aufwand AGs buchen kann.
   1. nur wenn das System nicht gesperrt ist

2. Als SuS möchte ich deutlich sehen, für welche AGs ich mich eintragen kann und für welche nicht, damit ich mir keine AG aussuche, an der ich am Ende nicht teilnehmen darf.
   1. ne schöne Übersicht ist wichtig

3. Als SuS möchte ich meine Gebuchten AGs sehen können, damit ich Gewissheit habe, dass die Buchung funktioniert hat & dass keine AGs sich zeitlich überschneiden.

4. Als SuS möchte ich mich auf einer Nachrückliste eintragen können, falls die AG voll ist, damit ich nicht ständig überprüfen muss, ob ein Platz frei geworden ist.

5. Als SuS möchte ich gewarnt werden, wenn ich mich in eine AG eintragen möchte, die sich mit einer AG die ich bereits gebucht habe zeitlich überschneidet, damit ich nicht versehentlich zwei AGs buche die gleichzeitig stattfinden.
   1. wir solltens nicht machen zu viel Aufwand

###ADMIN

1. Als Admin möchte ich, dass keine SuS sich in AGs eintragen können, an denen sie nicht teilnehmen dürfen, damit die Plätze nicht unnötig blockiert werden.

2. Als Admin möchte ich eine übersicht über alle gebuchten AGs haben, damit ich genau weiß, welcher Schüler in welcher AG ist.

3. Als Admin möchte ich die Möglichkeit haben SuS aus AGs unabhängig von einer Systemsperre auszutragen, damit ich die Liste nach Sperrung noch anpassen kann, wenn ein SuS nicht an der AG teilnimmt.

4. Als Admin möchte ich die Möglichkeit haben SuS in eine AG unabhängig von einer Systemsperre einzutragen (wenn die max. Teilnehmeranzahl das zulässt, sonst erscheint Warnung, einbuchen trotzdem möglich), damit ich die Liste nach der Sperrung noch anpassen kann, wenn ein SuS überraschend noch an der AG teilnehmen wird.

5. Als Admin möchte ich die Möglichkeit haben die AG Buchung für alle AG freizugeben, damit sich die SuS dafür eintragen können.

6. Als Admin möchte ich die Möglichkeit haben die Buchung für alle AG zu sperren, damit durch die SuS keine Änderungen mehr möglich sind.

7. Als Admin möchte ich die Kursliste für alle als PDF generieren können, damit ich die Liste aushängen kann.

8. Als Admin möchte ich die Daten für meine AG als CSV exportieren können, damit ich damit meine Excel Tabelle füllen kann.

9. Als Admin möchte ich AGs anlegen können (mit Name, Beschreibung, Freitext, zugelassene Klassenstufen, Platzanzahl), indem ich es als CSV hochlade oder manuell über die Homepage einrichte, damit ich den SuS meine AG(s) anbieten kann

10. Als Admin möchte ich zu einem beliebigen Zeitpunkt AG Daten löschen & ändern können, damit alle SuS diese Änderungen online einsehen können.




##PT 2: Facharbeit/Belegarbeit für SuS der Klasse 9

1. Als Schüler möchte ich das Thema meiner Facharbeit, meine betreuende Lehrkraft und die unterrichtende Lehrkraft in einem Formular angeben um Zettel zu vermeiden.

2. Als Schüler erwarte ich, dass mein Name in dem Formular automatisch vorausgefüllt ist, um mir Zeit zu sparen und weniger Fehler zu machen.

3. Als Schüler möchte ich eine PDF generieren, wenn ich das Formular vollständg ausgefüllt habe.
   1. vollständig ausgefüllt heißt ich hab es eingereicht. Ich darf keine Änderungen mehr vornehmen können.

4. Als Lehrer/Admin möchte ich, dass die Änderungen nur bis zu einem bestimmten festgelegten Datum möglich sind, um Deadlines einzuhalten.

5. Als Admin möchte ich nach der Themen-Einreichung, das Anhängen eines Dokumentes freischalten, um die Dokumentation und Abgabe einfacher zu gestalten.

6. Als Admin möchte ich, dass eine verspätete Abgabe mir angezeigt wird, um den Schüler entsprechend zu benoten.

7. Als Admin möchte ich eine CSV-Datei, in der auch die Abgabezeiten stehen, generieren, um die Daten weiterzuverabeiten.

8. Als Admin möchte ich das System zur Eingabe freigeben oder zum Dokument-Upload freigeben können, um Zeitpläne einhalten zu können.

9. Als Admin möchte ich einen Überblick über alle bisherigen Abgaben haben, um Versäumnisse der Schüler zu vermeiden.
   1. wichtig

10. Als Admin möchte ich alle Dokumente in einer ZIP-Datei herunterladen können und diese werden in einer bestimmten
Verzeichnisstruktur abgelegt (KlasseNachnameVorname z.B. 7aMüllerStefan)
und in jedem dieser Ordner befindet sich eine Textdatei mit dem Abgabedatum oder der Verspätung,
um die Arbeiten der SuS kontrollieren zu können.



##PT 3: Wahlpflichtfächer Wahl


###Fragen
Frage|Antwort
---|---
Als Admin möchte ich vor der Freischaltung des Systems die wählbaren Fächer angeben können - wie soll das umgesetzt werden?|Fächer als CSV hochladen oder auf der Seite pflegen (was am einfachsten ist) und nicht zurücksetzen, wenn die Komponente zurückgesetzt wird
"Es müssen vier Checkboxen gesetzt werden, um ein weiteres Dokument generieren zu können, das auf dem ersten Dokumente (siehe Anhang) basiert, aber noch weitere Felder enthält. Das Dokument und die Beschreibung folgen noch." Was bedeutet das?|wird von Sascha noch konkretisiert
1. Als SuS der Klassen 8,9, 10 möchte ich über eine Eingabemaske freigegebene Wahlpflichkurse wählen können, damit ich es nicht mit Stift und Papier machen muss

2. Als SuS möchte ich, nachdem alles korrekt eingetragen und gespeichert wurde, ein PDF Dokument generieren und ausdrucken lassen können, damit ich mit diesem Dokument meine Fächerwahl offiziell einreichen kann.

3. Als Admin möchte ich, dass ein SuS nach endgültigem festlegen der Wahlpflichfächer, die Daten nicht mehr ändern kann, damit keine Dateninkonsistenz entstehen kann.

4. Als Admin möchte ich, dass SuS der Klasse 8 & 9 genau einen Wahlpflichkurs wählen müssen, damit die vorgeschriebene Anzahl eingehalten ist.
   1. evtl für andere Schulen ist flexibilität wichtig
   2. vlt als Admin einstellbar

5. Als Admin möchte ich, dass SuS der Klasse 10 genau zwei unterschiedliche Wahlpflichkurse wählen müssen, damit die vorgeschriebene Anzahl eingehalten ist.

6. Als Admin möchte ich das System freischalten können, damit die SuS ihre Kurse wählen können

7. Als Admin möchte ich ich einen Termin einstellen können, zu dem das System gesperrt wird, damit die SuS ab dem Zeitpunkt keine Änderungen mehr vornehmen könen & die Kurse rechtzeitig geplant werden können.

8. Als Admin möchte ich jederzeit Änderungen vornehmen können (umtragen, eintragen), damit SuS die die Abgabe verpasst haben oder am Kurs nicht teilnehmen können/möchten um-/nachgetragen werden können

9. Als Admin möchte ich mir alle Daten zur Wahlpflichfächer-Wahl im CSV Format exportieren lassen können, damit mit diesen Daten weitere Planung betrieben werden kann (wie z.B. Kurslisten aufstellen)

10. Als Admin möchte ich vor der Freischaltung des Systems die wählbaren Fächer angeben können, damit die SuS die Fächer buchen können, die an der Schule angeboten werden

##PT 4: Abitur-Prüfungsabgabe (5. PK) für die Klasse 11 bzw. 12

1. Als Admin möchte ich, dass dieser Teil des Systems nur für Schülerin der Stufen 11 und 12 zugänglich ist, um falsch Angaben zu vermeiden.

2. Als Admin möchte ich das System zu jeder Zeit sperren können, um Abgabezeiten einzuhalten.

3. Als Admin möchte ich zu jeder Zeit Änderungen vornehmen können, um Änderungen einzutragen.

4. Als Admin möchte ich die Daten an jeder Stelle als CSV exportieren können, um eine Weiterverarbeitung der Daten zu ermöglichen.

5. Als Admin möchte ich sehen, welcher Schüler noch keine Abgabe getätigt hat, um Schüler zu benachrichtigen.

6. Als Schüler möchte ich angeben, ob ich eine BLL oder Präsentationsprüfung machen möchte, um meine Pflichten zu erfüllen.

7. Als Schüler möchte ich falls nötig, meinen Partner für die Prüfung angeben, um den Lehrer darüber zu informieren.

8. Als Admin möchte ich die Prüfungsabgabe in Schritt 2 freigeben können.

9. Als Schüler möchte ich mein gewähltes Referenzfach, mein gewähltes Bezugsfach und die betreuende Lehrkraft angeben können, um den Lehrer darüber zu informieren.

10. Als Admin möchte ich die Themen der SuS genehmigen oder ggfs. ablehnen und dazu in einem Textfeld einen Kommentar hinterlassen, um meine Schüler zu informieren.
    1. wir müssen mal schauen wie das Informieren statfinden kann; evtl automatische Mail?

11. Als Schüler möchte ich sehen, ob mein Thema genehmigt oder abgelehnt wurde mit der entsprechenden Begründung, um informiert zu sein.






