async function fetchTopNPlanets(n) {
    try {
        //construct request URLs
        let requests = [];
        for (let i = 1; i <= n; i++) {
            requests.push(`https://swapi.co/api/planets/${i}`);
        }

        let data = await Promise.all(
            requests.map(
                (request, index) =>
                    fetch(request).then(
                        (response) => {
                            return response.json()
                        }
                    ).then(data => {
                        return {
                            name: data.name, index: index + 1
                        }
                    })
            ));
        return (data)
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

(async () => {
    let response = await fetchTopNPlanets(10);
    response.map(r => console.log(`planet ${r.index} - ${r.name}`));
})();

// converts csv string to json
function csvToJson(csv) {
    const lines = csv.split('\n');
    const headings = lines[0].split(',');
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");
        for (let j = 0; j < headings.length; j++) {
            obj[headings[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

// converts json to csv
function jsonToCSV(jsonData) {
    let csv = ``;
    csv = csv.concat(Object.keys(jsonData[0]).join(','));
    csv = csv.concat('\n');
    for (let i = 0; i < jsonData.length - 1; i++) {
        csv = csv.concat(Object.values(jsonData[i]).join(','));
        csv = csv.concat('\n');
    }
    return csv;
}

// sample csv data
let csvData = `Device Name,Platform,OS Version,Portrait Width,Landscape Width,Release Date
Acer Iconia Tab A1-810,Android,4.2.2,768,1024,2013-05
Acer Iconia Tab A100,Android,4.0.3,800,1280,2011-04
Acer Iconia Tab A101,Android,3.2.1,600,1024,2011-05
Acer Iconia Tab A200,Android,4.0.3,800,1280,2012-01
Acer Iconia Tab A500,Android,4.0.3,648,1280,2011-04
Acer Iconia Tab A501,Android,3.2,800,1280,2011-04
ACER Liquid E2,Android,4.2.1,360,640,2013-05
Ainol Novo 7 Elf 2,Android,4.0.3,496,1024,2012-06
Alcatel One Touch Idol X,Android,4.2.2,480,800,2013-07
Alcatel One Touch T10,Android,4.0.3,480,800,2013-03
Alcatel One Touch 903,Android,2.3.6,320,427,2012-08
Alcatel (Vodafone) Smart Mini 875,Android,4.1.1,320,480,2013-07
Amicroe 7 TouchTAB II,Android,4.0.4,480,800,2013-01
Amicroe 9.7 TouchTAB IV,Android,4.1.1,768,1024,2013-05
Archos 70b (it2),Android,3.2.1,600,1024,2012-02
Archos 80G9,Android,3.2,768,1024,2011-09
Arnova 10b G3,Android,4.0.3,600,1024,2012-05
Arnova 7 G2,Android,2.3.1,480,800,2011-09
Arnova 7F G3,Android,4.0.3,640,1067,2012-11
Arnova 8C G3,Android,4.0.3,800,1067,2012-11
ASUS B1-A71,Android,4.1.2,600,1024,2013-01
ASUS Fonepad,Android,4.1.2,601,962,2013-04
ASUS MeMo Pad ME172V,Android,4.1.1,600,1024,2013-01
`;

let jsonData = csvToJson(csvData);
console.log(jsonData);

console.log(jsonToCSV(jsonData));
