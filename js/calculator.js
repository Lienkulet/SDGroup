const divResult = document.getElementById("price_final");
const calculatorBtn = document.getElementById("calculatorBtn");
const totalSpace = document.getElementById("totalSpace");
const height = document.getElementById("height");
const bulbs = document.getElementById("bulbs");
const outlet = document.getElementById("outlet");
const water = document.getElementById("water");
const heatedFloor = document.getElementById("heatedFloor");
const usi = document.getElementById("doors");
const price_final = document.getElementById("price_final");
const planID = document.getElementById("planID");
const contact_name = document.getElementById("calculatorName");
const contact_email = document.getElementById("calculatorEmail");
const phone = document.getElementById("calculatorPhone");
const echidaBtn = document.getElementById("echidaBtn");
const contacteazaneBTN = document.getElementById("contacteazaneBTN");

const phone2 = document.getElementById("application_tel");
const name2 = document.getElementById("application_name");
const email3 = document.getElementById("email");
const tel3 = document.getElementById("tel");
const name3 = document.getElementById("name");
const regex_phone = /^0\d{8}$/;
const regex_name = /^[A-Z][a-z]+(?:[ '-][A-Za-z]+)*$/;
const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const contact_name = document.getElementById("validation_error_name");
// const contact_email = document.getElementById("validation_error_phone");
// const validation_error_email = document.getElementById("validation_error_email");

let phoneOk = false;
let nameOk = false;
let emailOk = false;

// =========== FORM VALIDATION START =========== 
phone.addEventListener("input", (e) => {
    e.preventDefault();
    if(!regex_phone.test(phone.value)){
        phoneOk = false;
        // validation_error_phone.style.display = 'flex';
    }
    else {
        // validation_error_phone.style.display = 'none';
        phoneOk = true;
    }
});

// contact_name.addEventListener("input", (e) => {
//     e.preventDefault();
//     if(!regex_name.test(contact_name.value)){
//         nameOk = false;
//         // validation_error_name.style.display = 'flex';
//     }
//     else {
//         // validation_error_name.style.display = 'none';
//         nameOk = true;
//     }
// });

contact_email.addEventListener("input", (e) => {
    e.preventDefault()
    if(!regex_email.test(contact_email.value)){
        emailOk = false;
        // validation_error_email.style.display = 'flex';
    }
    else {
        // validation_error_email.style.display = 'none';
        emailOk = true;
    }
});
// =========== FORM VALIDATION END =========== 

// =========== SEND EMAIL START =========== 
function sendEmail(finalPrice, suprafataPereti, suprafataPodea, perimetru){
    let message = `Total: ${parseInt(finalPrice)}}eur 
                \n Plan: ${planID.value}
                \n Suprafata totala al apartamentului: ${totalSpace.value} m2
                \n Inaltimea al apartamentului: ${height.value} m2
                \n Perimetru: ${perimetru} m2
                \n Suprafata pereti: ${suprafataPereti} m2
                \n Suprafata podea: ${suprafataPodea} m2
                \n Nr corpurilor de iluminat: ${bulbs.value} buc.
                \n Nr prizelor si intrerupatoarelor: ${outlet.value} buc.
                \n Puncte apa si canaliare: ${water.value} unit.
                \n Suprafata Podea calda: ${heatedFloor.value} m2
                \n Nr usi: ${usi.value} buc.
                `;
    const params = {
        from_name: contact_name.value,
        email_id: contact_email.value,
        message: message,
        clientName: contact_name.value,
        phone_number: phone.value
    }

    emailjs.send('service_yzqbgwf', 'template_luzcqpu', params).then(
        (response) => {

        },
        (error) => {
          window.alert('A aparut o eroare in timpul transmiterii mesajului dvs, va rugam incerca-ti mai tarziu...', error);
        },
      );
}

calculatorBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if(validator()){
        let perimetru = totalSpace.value * 1.2;
        let suprafataPereti = perimetru * height.value;
        let suprafataPodea = totalSpace.value;
        let suprafataTavan = totalSpace.value;
        let suprafataBaie = 100;

        // pretul lucrarile executate si numarul executat
        let lucrariDemolare = (suprafataPereti + suprafataPodea + suprafataTavan) * 120;
        // Pregatire suprafete pentru lucru						
        let zidarie = suprafataPodea * 0.2 * 120;
        let curatireSuprafata = (suprafataPereti + suprafataPodea + suprafataTavan) * 12;
        let amorsareSuprafata = (suprafataPereti + suprafataPodea + suprafataTavan) * 12;
        let nivelarePereti = suprafataPereti * 150;
        let aplicareGlet = (suprafataPereti + suprafataPodea) * 50;
        let nivelarePodea= suprafataPodea * 200;
        let slefuire = (suprafataPereti + suprafataPodea) * 25;
        let totalPregatire = lucrariDemolare + zidarie + curatireSuprafata + amorsareSuprafata + nivelarePereti + aplicareGlet + nivelarePodea + slefuire;

        // Apa si canalizarea	
        let lucrariApaCanalizareMurdar = water.value * 1500;
        let podeleCalde = heatedFloor.value * 400;
        let totalWater = lucrariApaCanalizareMurdar + podeleCalde;

        // Lucrari cu electricitatea						
        let electricMurdar = 220 * 105;
        let executrareCanal = 40 * 80;
        let montareCutie = 1200;
        let asamblareCutie = 140 * 60;
        let montareDuze = 25 * 90;
        let astupareRosturiTrasare = 30 * 80;
        let totalElectricity = electricMurdar + executrareCanal + montareCutie + asamblareCutie + montareDuze + astupareRosturiTrasare;
        //let totalElectricity = bulbs * 220 + 3200 + 1200 + 8400 + outlet * 25 + bulbs * 30;

        // Montare teracota						
        let hidroizolare = 120 * suprafataBaie;
        let montareTeracota = 500 * suprafataBaie;
        let montareDecoratiuniTeracota = 1000
        let totalTeracota = hidroizolare + montareTeracota + montareDecoratiuniTeracota;

        // Pregatirea pentru vopsea						
        let ghipsocarton = suprafataTavan * 180;
        let amorsareRosturi = suprafataTavan * 30;
        let astupareRosturi = suprafataTavan * 90;
        let amorsareFibraSticlaTavan = suprafataTavan * 15;
        let amorsareFibraSticlaPereti = suprafataPereti * 15;
        let aplicareFibraSticlaTavan = suprafataTavan * 70;
        let aplicareFibraSticlaPereti = suprafataPereti * 70;
        let gletuireTavan = suprafataTavan * 120;
        let gletuireSuprafeteVopsite = (suprafataPereti - suprafataBaie) * 120;
        let gletuireSubTapete = suprafataPereti * 45 * 0;
        let montareBagheteTavan = perimetru * 100;
        let montarePlinteAscunse = perimetru * 200 * 0;
        let montareMoldinguriGips = 100 * 0;
        let montareDecoratiuni = 400 * 0;
        let slefuireTavan = 25 * suprafataTavan;
        let slefuirePereti = 25 * suprafataPereti;
        let amorsareSuprafataVopsire = (suprafataPereti + suprafataPodea + suprafataTavan) * 15;
        let totalPregatireVopsea = ghipsocarton + amorsareRosturi + astupareRosturi + amorsareFibraSticlaPereti + amorsareFibraSticlaTavan + 
            aplicareFibraSticlaPereti + aplicareFibraSticlaTavan +gletuireTavan + gletuireSuprafeteVopsite + gletuireSubTapete + 
            montareBagheteTavan + montarePlinteAscunse + montareMoldinguriGips + montareDecoratiuni + slefuireTavan + slefuirePereti + amorsareSuprafataVopsire;

        // Finisarea lucrarilor						
        let vopsirePereti = 120 * suprafataPereti;
        let vopsireTavan = 160 * suprafataTavan;
        let montareTapeta = 100 * 0 * suprafataPereti;
        let montarePrize = 50 * outlet.value;
        let montareCorpuriIlumintate = 200 * bulbs.value;
        let montareLeduri = 100 * 10;
        let montareObiecteSanitare = water.value/2 * 100;
        let montareUsi = 1400 * usi.value;
        let totalFinisareLucrari = vopsirePereti + vopsireTavan + montareTapeta + montarePrize + montareCorpuriIlumintate + montareLeduri +
                                    montareObiecteSanitare + montareUsi;

        let totalCosturi = totalPregatire + totalWater + totalElectricity + totalTeracota + totalPregatireVopsea + totalFinisareLucrari;
        let total = totalCosturi / 85;

        let capital = parseInt(total) / 19.1;
        let inoire = capital * 0.5;
        let cosmetic = capital * 0.8;
        let individual = capital + capital * 0.3;

        let finalPrice;

        if(planID.value === 'capital') finalPrice = capital;
        else if(planID.value === 'inoire') finalPrice = inoire;
        else if(planID.value === 'cosmetic') finalPrice = cosmetic;
        else finalPrice = individual;

        price_final.innerText = `Pret final: ${parseInt(finalPrice)} euro per m2`;
        sendEmail(finalPrice, suprafataPereti, suprafataPodea, perimetru);
    }
})


const validator = () => {
    if(totalSpace.value != '' && height.value != '' && bulbs.value != '' && outlet.value != '' && water.value != '' 
    && heatedFloor.value != '' && doors.value != '' && totalSpace.value >=0 && height.value >= 0 && bulbs.value >= 0
     && outlet.value >= 0 && water.value >= 0 && heatedFloor.value >= 0 && doors.value >= 0 && phoneOk && emailOk
){
    return true;
} else {
    window.alert('Completati toate campurile corespunzator');
    return false;
}
}

function sendEchipaMail(name, phone, emaill, message){
    const params = {
        from_name: name,
        message: message,
        email_id: emaill,
        clientName: name,
        phone_number: phone
    }

    emailjs.send('service_yzqbgwf', 'template_ud6n36w', params).then(
        (response) => {

        },
        (error) => {
          window.alert('A aparut o eroare in timpul transmiterii mesajului dvs, va rugam incerca-ti mai tarziu...', error);
        },
      );
}
echidaBtn.addEventListener('click', () => {
    let phone22 = phone2.value;
    let name22 = name2.value;

    sendEchipaMail(name22, phone22, '', 'Doresc sa vin in echipa voastra');
});

contacteazaneBTN.addEventListener('click', () => {
    let email33 = email3.value;
    let name33 = name3.value;
    let tel33 = tel3.value
    
    sendEchipaMail(name33, tel33, email33, 'Mesaj din contact');
});