async function fetchTopNPlanets(n) {
    try {
        let requests = [];
        for (let i = 1; i <= 10; i++) {
            requests.push({ n: i, url: `https://swapi.co/api/planets/${i}` });
        }
        let data = await Promise.all(
            requests.map(
                request =>
                    fetch(request.url).then(
                        (response) => {
                            return { n: request.n, planet: response.json() }
                        }
                    )));
        return (data)
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

(async () => {
    let response = await fetchTopNPlanets(10);
    response.map(r => {
        console.log(r.n, r.planet.name);
    });
})();
