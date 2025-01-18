const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");

//UI projesini başlatma.

const ui = new UI();
const storage = new Storage();


// tüm eventleri yükleme işlemi

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addCar);
    document.addEventListener("DOMContentLoaded",function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    }); 
    
    cardBody.addEventListener("click",deleteCar);
    clear.addEventListener("click",clearAllCars);

}

function addCar(e){
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if( title === "" || price === ""|| url === ""){
        ui.displayMessage("tüm bilgiler doldurulmalıdır..","danger");
        
    }else{
        //yeni araç oluşturduk
        const newCar = new Car(title, price, url);
        // UI a araç ekledik
        ui.addCarToUI(newCar);

        storage.addCarToStorage(newCar);

        ui.displayMessage("Araç Başarıyla Eklendi","success");
        e.preventDefault();
    }
    ui.clearInputs(titleElement, priceElement, urlElement);
    e.preventDefault();
    


}
function deleteCar(e) {
    if(e.target.id === "delete-car"){
        ui.deleteCarFromUI(e.target);
        storage.deleteCarFromStorage(e.target.parentElemet.parentElemet.previousElementSibling.previousElementSibling.textContent);
        
        UI.displayMessage("araç silm eişlemi başarıyla gerçekleşti...","success");
    }
  }
  function clearAllCars(e) {
    
    if(confirm("tüm araçlar silinecektir emın misiniz?")){
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }
    }