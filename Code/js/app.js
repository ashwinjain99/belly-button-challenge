function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then((data)=>{
        console.log(data)
        const dropdownbox = d3.select("#selDataset")
        for (let i = 0; i < data.names.length; i++){
            dropdownbox.append("option").text(data.names[i]).property("value", data.names[i])
        }
        const first_sample = data.names[0]
        buildCharts(first_sample)

        houseMetedata(first_sample)
    }) 
  }
  init()

function optionChanged(newSample){
    buildCharts(newSample)
    houseMetedata(newSample)
}

function buildCharts(sample_id){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then((data)=>{
        // console.log(data)
        let sample_array = data.samples.filter(sampleObject => sampleObject.id == sample_id)
        let sample = sample_array[0]
        console.log(sample)

        let sample_values = sample.sample_values
        let otu_ids = sample.otu_ids
        let otu_labels = sample.otu_labels

        let trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_id => "OTU "+ otu_id).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }

        let bar_data = [trace1];

        let layout = {
            title: ""
        }

        Plotly.newPlot("bar", bar_data, layout)


        let trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {size: sample_values, color: otu_ids},            
            text: otu_labels
        }

        let bubble_data = [trace2];
        Plotly.newPlot("bubble", bubble_data)
    }) 
}


function houseMetedata(sample_id){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then((data)=> {

        let metadata = data.metadata;

        // let sample_array = data.metadata.filter(sampleObject => sampleObject.id == sample_id)
        // let sample = sample_array[0]

        let demo_info = d3.select("#sample-metadata");

        for (let i = 0; i < metadata.length; i++){
               if (sample_id == metadata[i].id){
                console.log(metadata[i])
                result = metadata[i]
               } 
        }

        demo_info.html(" ")

        for (const key in result) {
              demo_info.append("p").text(`${key}: ${result[key]}`);

        }
    })}