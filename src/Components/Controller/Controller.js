import React from 'react'
import { useState, useRef } from 'react'
import './Controller.css'
import ReactJson from 'react-json-view'
import Papa from 'papaparse'
import handleVisualize from './Utils/Utils'

function Controller({setVisualizationData}) {
    let onAdd = true
    let onEdit = true
    let onDelete = true
    let visualizationData = []

    const [json, setJson] = useState({})
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [file, setFile] = useState({});
    const allowedExtensions = ["csv"];
    let inputJsonFile = useRef(null)
    let inputCSVFile = useRef(null)

    const saveFile = () => {    
        const fileName = "json-bucketization-file";
        const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
        const href = URL.createObjectURL(blob);
      
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
      
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const readFileOnUpload = (uploadedFile) => {
        setLoading(true)
        const fileReader = new FileReader();
        fileReader.readAsText(uploadedFile)
        fileReader.onloadend = ()=>{
            try{
                setJson(JSON.parse(fileReader.result))
            } catch(e) {
                console.log(e)
            }
        }
        setLoading(false)
    }

    const handleCSV = (fileUploaded) => {
        setError("")
        setLoading(true)
        const fileExtension = fileUploaded.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            setError("Please input a csv file");
            return;
        }
        setFile(fileUploaded)
        if (!fileUploaded) return setError("Enter a valid file");
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data
            setData(parsedData)
            setLoading(false)
        };
        reader.readAsText(fileUploaded);
    }

    const vizualize = () => {
        if (file) {
            handleVisualize(data, json, visualizationData)
            console.log(visualizationData)
            setVisualizationData(visualizationData)
        } else {
            setError("CHoose a CSV file first")
        }
    }
    

    return (
        <div className='json-container'>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (<>
                <ReactJson
                    name={false}
                    collapsed={false}
                    style={{
                        padding: '10px',
                        borderRadius: '3px',
                        margin: '5px 0px',
                        height: '90vh'
                    }}
                    theme={'monokai'}
                    src={json}
                    collapseStringsAfterLength={15}
                    onEdit={
                        onEdit ? e => setJson(e.updated_src) : false
                    }
                    onDelete={
                        onDelete ? e => setJson(e.updated_src) : false
                    }
                    onAdd={
                        onAdd ? e => setJson(e.updated_src) : false
                    }
                    displayObjectSize={true}
                    enableClipboard={true}
                    indentWidth={2}
                    displayDataTypes={true}
                    iconStyle={'triangle'}
                ></ReactJson>
                <div className='json-controller'>
                    <button className='save' onClick={saveFile}>Save</button>
                    <input type={'file'}
                        style={{display: 'none'}} ref={inputJsonFile} 
                        onChange={(e) => readFileOnUpload(e.target.files[0])}
                    ></input>
                    <input type={'file'} 
                        style={{display: 'none'}} ref={inputCSVFile} 
                        onChange={(e) => handleCSV(e.target.files[0])}
                    ></input>
                    {error}
                    <button className='load' onClick={()=>inputJsonFile.current.click()}>Load</button>
                    <button className='csv-file' onClick={()=>inputCSVFile.current.click()}>Load CSV</button>
                    <button className='visualize' onClick={vizualize}>Visualize</button>
                </div>
            </>)}
        </div>
    )
}

export default Controller
