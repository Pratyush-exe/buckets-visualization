function filterData(data, json) {
    if (json["condition"]["type"] == "text") {
        let rule = json["condition"]["rule"]
        if (rule === "text contains") {
            return data.filter(row => row[json["column"]] === json["condition"]["parameter"])
        }
    }
    else if (json["condition"]["type"] == "number") {
        let rule = json["condition"]["rule"]
        if (rule === "less than") {
            return data.filter(row => row[json["column"]] < parseFloat(json["condition"]["parameter"]))
        } else if (rule === "less than equal to") {
            return data.filter(row => row[json["column"]] <= parseFloat(json["condition"]["parameter"]))
        } else if (rule === "greater than") {
            return data.filter(row => row[json["column"]] > parseFloat(json["condition"]["parameter"]))
        } else if (rule === "greater than equal to") {
            return data.filter(row => row[json["column"]] >= parseFloat(json["condition"]["parameter"]))
        } else if (rule === "in between") {
            return data.filter(row => parseFloat(json["condition"]["parameter"].split(",")[0]) <=  row[json["column"]] &&
            row[json["column"]] < parseFloat(json["condition"]["parameter"].split(",")[1]))
        }
    }
}

function handleVisualize(data, json, visualizeJson, level=0) {
    let keys = Object.keys(json)
    keys.map((key) => {
        if (json[key].hasOwnProperty("child")) {
            let newJson = json[key]['child']
            let newData = filterData([...data], json[key])
            // console.log(level, json[key]["name"], newData?.length)
            visualizeJson.push([level, json[key]["name"], newData])
            handleVisualize(newData, newJson, visualizeJson, level+1)
        } else {
            let newData = filterData([...data], json[key])
            // console.log(level, json[key]["name"], newData?.length)
            visualizeJson.push([level, json[key]["name"], newData])
        }
    })
}

// function handleVisualize(data, json) {
//     let keys = Object.keys(json)
//     keys.map((key) => {
//         if (json[key].hasOwnProperty("child")) {
//             let newJson = json[key]['child']
//             let newData = filterData([...data], json[key])
//             console.log(json[key]["name"], newData?.length)
//             handleVisualize(newData, newJson)
//         } else {
//             let newData = filterData([...data], json[key])
//             console.log(json[key]["name"], newData?.length)
//         }
//     })
// }

export default handleVisualize

// male_healthy_early_adulthood_homa_less_2 = 72
// male_healthy_early_adulthood_homa_greater_2 = 5
// male_healthy_early_middle_age_homa_less_2 = 26
// male_healthy_early_middle_age_homa_greater_2 = 3
// male_healthy_late_middle_age_homa_less_2 = 6
// male_healthy_late_middle_age_homa_greater_2 = 2
// male_healthy_late_adulthood_homa_less_2 = 2
// male_healthy_late_adulthood_homa_greater_2 = 0

// male_overweight_early_adulthood_homa_less_2 = 49
// male_overweight_early_adulthood_homa_greater_2 = 14
// male_overweight_early_middle_age_homa_less_2 = 31
// male_overweight_early_middle_age_homa_greater_2 = 16
// male_overweight_late_middle_age_homa_less_2 = 9
// male_overweight_late_middle_age_homa_greater_2 = 4
// male_overweight_late_adulthood_homa_less_2 = 0
// male_overweight_late_adulthood_homa_greater_2 = 1

// male_obesity_early_adulthood_homa_less_2 = 13
// male_obesity_early_adulthood_homa_greater_2 = 13
// male_obesity_early_middle_age_homa_less_2 = 18
// male_obesity_early_middle_age_homa_greater_2 = 11
// male_obesity_late_middle_age_homa_less_2 = 4
// male_obesity_late_middle_age_homa_greater_2 = 2
// male_obesity_late_adulthood_homa_less_2 = 1
// male_obesity_late_adulthood_homa_greater_2 = 0
