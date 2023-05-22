document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', getStandings);
  });
  
  async function getStandings() {
    const seasonInput = document.getElementById('season-input').value;
    const roundInput = document.getElementById('round-input').value;
  
    const apiUrl = `https://ergast.com/api/f1/${seasonInput}/${roundInput}/driverStandings.json`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  
      const standingsBody = document.getElementById('standings-body');
      standingsBody.innerHTML = '';
  
      standings.forEach((driver) => {
        const position = driver.position;
        const name = driver.Driver.givenName + ' ' + driver.Driver.familyName;
        const constructor = driver.Constructors[0].name;
        const points = driver.points;
  
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${position}</td>
          <td>${name}</td>
          <td>${constructor}</td>
          <td>${points}</td>
        `;
  
        standingsBody.appendChild(row);
      });
    } catch (error) {
      console.log('Ya gots an error woopszz!', error);
    }
  };