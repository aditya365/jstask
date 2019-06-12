async function fetchPlanets(urls) {
    try {
        var data = await Promise.all(
            urls.map(
                url =>
                    fetch(url).then(
                        (response) => {
                            return response.json()
                        }
                    )));
        return (data)
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

var urls = [];
for (let i = 1; i <= 10; i++) {
    urls.push(`https://swapi.co/api/planets/${i}`);
}
(async () => {
    var response = await fetchPlanets(urls);
    console.log(response.map(planet=>planet.name));
})();
