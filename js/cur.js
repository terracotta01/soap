function soap() {
// get data from inputs to variables
    var tp = document.getElementById("selectfxType").value;
    var ccy = document.getElementById("selectCurrency").value;
    var dtFrom = document.getElementById("inputDateFrom").value;
    var dtTo = document.getElementById("inputDateTo").value;
// create an XMLHttpRequest object
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://old.lb.lt/webservices/fxrates/FxRates.asmx?op=getFxRates', true);
    // build SOAP request according to variables from inputs
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<soap:Body>' +
              '<getFxRatesForCurrency xmlns="http://www.lb.lt/WebServices/FxRates">' +
                '<tp>' + tp + '</tp>' +
                '<ccy>' + ccy + '</ccy>' +
                '<dtFrom>' + dtFrom + '</dtFrom>' +
                '<dtTo>' + dtTo + '</dtTo>' +
              '</getFxRatesForCurrency>' +
            '</soap:Body>' +
          '</soap:Envelope>';
    // Define a function to be called when the readyState property changes
    xmlhttp.onreadystatechange = function () {
    // Holds the status of the XMLHttpRequest
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // show xml in console
          console.log(xmlhttp.responseXML);
    // parse a text string into an XML DOM object FxRate
          var arrayFxRate = xmlhttp.responseXML.getElementsByTagName("FxRate");

    // create table

          var tablearea = document.getElementById('tablearea');
          document.getElementById('tablearea').innerHTML = '';
          // document.getElementByTagName('table').innerHTML = '';


          table = document.createElement('table');
          // Create headings row
          trh = document.createElement('tr');
          trh.appendChild(document.createElement('td') );
          trh.appendChild(document.createElement('td') );
          trh.appendChild(document.createElement('td') );

          trh.cells[0].appendChild(document.createTextNode('Data'));
          trh.cells[1].appendChild(document.createTextNode('Valiutos kodas'));
          trh.cells[2].appendChild(document.createTextNode('Santykis'));
          table.appendChild(trh.cloneNode( true ));

          // parse a text string into an XML DOM object FxRate for date(Dt), currency code(Ccy), currency rate(Amt)
          for (var i = 0; i < arrayFxRate.length; i++) {
          // create rows and cells, inserting to table cells Date, Currency Name, Currency Rate
            tr = document.createElement('tr');

            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');

            var text1 = document.createTextNode(arrayFxRate[i].getElementsByTagName("Dt")[0].childNodes[0].nodeValue);
            var text2 = document.createTextNode(arrayFxRate[i].getElementsByTagName("Ccy")[1].childNodes[0].nodeValue);
            var text3 = document.createTextNode(arrayFxRate[i].getElementsByTagName("Amt")[1].childNodes[0].nodeValue);

            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            table.appendChild(tr);
          }
          tablearea.appendChild(table);

          // calculating difference of currency rate per period
          var difference = document.getElementById("difference");

          difference.innerHTML =  "Pokytis per laikotarpį: " + (arrayFxRate[0].getElementsByTagName("Amt")[1].childNodes[0].nodeValue - arrayFxRate[arrayFxRate.length-1].getElementsByTagName("Amt")[1].childNodes[0].nodeValue);

          // TEST - show result in console
          // for (var i = 0; i < arrayFxRate.length; i++) {
          // 	console.log(arrayFxRate[i].getElementsByTagName("Amt")[1].childNodes[0].nodeValue);
          // }
          // for (var i = 0; i < arrayFxRate.length; i++) {
          // 	console.log(arrayFxRate[i].getElementsByTagName("Ccy")[1].childNodes[0].nodeValue);
          // }
          }
       }
     }
          // Send the POST request text/xml; charset=utf-8
          xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
          xmlhttp.send(sr);
          // send request
  }
