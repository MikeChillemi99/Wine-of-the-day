// Liste de vins
const wines = [
    {
      id: 1,
      name: "Nero Avola Sicilia Bromeus",
      type: "Rouge",
      year: 2022,
      region: "Italie, Sicile",
      variety: "Nero d\"Avola",
      alcohol: "14.5%"
    },
    {
      id: 2,
      name: "Vaud AOC Assemblage Rouge Escargot",
      type: "Rouge",
      year: 2023,
      region: "Suisse, Vaud",
      variety: "Gamaret, Gamay, Garanoir, Pinot Noir",
      alcohol: "12.5%"
    },
    {
      id: 3,
      name: "Vin de Pays d'Oc IGP La Cuvée Mythique",
      type: "Rouge",
      year: 2022,
      region: "France, Languedoc-Roussillon",
      variety: "Carignan, Syrah, Grenache",
      alcohol: "14%"
    },
    {
      id: 4,
      name: "Valais AOC Petite Arvine Terrasses du Rhône Bibacchus",
      type: "Blanc",
      year: 2022,
      region: "Suisse, Valais",
      variety: "Petite Arvine",
      alcohol: "13.5%"
    },
    {
      id: 5,
      name: "Aigle Les Murailles Chablais AOC H. Badoux",
      type: "Blanc",
      year: 2023,
      region: "Suisse, Vaud",
      variety: "Chasselas",
      alcohol: "12.5%"
    },
    {
      id: 6,
      name: "Valais AOC Johannisberg Domaine du Mont d'Or Mi-Doux",
      type: "Blanc",
      year: 2023,
      region: "Suisse, Valais",
      variety: "Silvaner",
      alcohol: "13.5%"
    },
    {
      id: 7,
      name: "Rosé Cote des Roses AOP G. Bertrand",
      type: "Rosé",
      year: 2023,
      region: "France, Languedoc-Roussillon",
      variety: "Syrah, Cinsault, Grenache",
      alcohol: "12.5%"
    },
    {
      id: 8,
      name: "Valais AOC Rosé Oeil de Perdrix Le Rosel",
      type: "Rosé",
      year: 2023,
      region: "Suisse, Valais",
      variety: "Pinot Noir",
      alcohol: "13.5%"
    },
    {
      id: 9,
      name: "Côtes de Provence AOP Rosé Grande Récolte",
      type: "Rosé",
      year: 2023,
      region: "France, Provence",
      variety: "Cinsault, Grenache",
      alcohol: "13%"
    }
];

// Variables
const wineName = document.getElementById("wine-name");
const wineType = document.getElementById("wine-type");
const wineYear = document.getElementById("wine-year");
const wineRegion = document.getElementById("wine-region");
const wineVariety = document.getElementById("wine-variety");
const wineAlcohol = document.getElementById("wine-alcohol");
const countdownElement = document.getElementById("countdown");

// Récupérer la date actuel en string
function fnGetCurrentDateString() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

// Retourn un nombre aléatoire dans l'intervale de ma liste
function fnGetRandomWine() {
    const randomIndex = Math.floor(Math.random() * wines.length);
    return randomIndex;
}

// Affiche le vin
function fnShowWine(index) {
    const wine = wines[index];
    wineName.textContent = wine.name;
    wineType.textContent = wine.type;
    wineYear.textContent = wine.year;
    wineRegion.textContent = wine.region;
    wineVariety.textContent = wine.variety;
    wineAlcohol.textContent = wine.alcohol;
}

// Timer countdown et contrôle du temps pour afficher un nouveau vin chaque jours
function fnStartCountdown() {

    function fnUpdateCountdown() {
        const now = new Date();
        const nextDay = new Date();
        nextDay.setDate(now.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);

        // Le timeleft est le temps restant
        const timeLeft = nextDay - now;
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Mettre ensemble les heures, minutes et secondes
        countdownElement.innerHTML = 
            `${String(hoursLeft).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;

        // Si le décompte est à 0 ou en dessous
        if (timeLeft <= 0) {
            // Mise à jour du vin
            const newWineIndex = fnGetRandomWine();
            // Stocker dans le localStorage le nouveau index
            localStorage.setItem('wineIndex', newWineIndex);
            fnShowWine(newWineIndex);
            // Reset du countdown
            fnStartCountdown();
        }
    }

    // Mise à jour du décompte chaque secondes
    setInterval(fnUpdateCountdown, 1000);
}

// Ecoute quand la page est chargée
window.addEventListener('DOMContentLoaded', function() {
    const currentDate = fnGetCurrentDateString();
    const storedDate = localStorage.getItem('currentDate');
    
    // Comparaison de la date actuelle et de la date stockée
    if (currentDate !== storedDate) {
        // Si c'est un nouveau jour, choisi un nouveau vin
        const newWineIndex = fnGetRandomWine();
        localStorage.setItem('wineIndex', newWineIndex);
        localStorage.setItem('currentDate', currentDate);
    }

    const storedWineIndex = localStorage.getItem('wineIndex');
    fnShowWine(storedWineIndex);
    fnStartCountdown();
});
