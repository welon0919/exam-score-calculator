
import { useEffect, useState } from 'react'
import './App.css'
import Subject from './Subject.jsx'
import { Button } from '@chakra-ui/react'
const subjects = [
    "國文",
    "數學",
    "英文",
    "英聽",
    "生物",
    "歷史",
    "地理",
    "公民",
    "ESL ",
    "國寫"
]
const weights = {
    "國文": 5,
    "數學": 5,
    "英文": 4.5,
    "英聽":0.5,
    "生物": 4,
    "歷史": 2,
    "地理": 2,
    "公民": 2,
    "ESL ": 1,
    "國寫":5,
}
function App() {
    const [subjectScores, setSubjectScores] = useState(Object.fromEntries(subjects.map(subject => [subject,0])))
    const [subjectsUsed, setSubjectsUsed] = useState(Object.fromEntries(subjects.map(subject => [subject,true])))
    const [calculated, setCalculated] = useState(false)
    const [weightedSum, setWeightedSum] = useState(0)
    const [weightedLoss, setWeightedLoss] = useState(0)
    const [weightedAvg, setWeightedAvg] = useState(0)

    const calculate= () => {
        setCalculated(true)

        console.log(subjectScores)
        console.log(subjectsUsed)
        let totalWeight = 0;
        let totalSum = 0
        subjects.forEach(subject => {
            if(!subjectsUsed[subject]) return;
            totalWeight += weights[subject]
            totalSum += weights[subject] * subjectScores[subject]
        })        
        setWeightedSum(totalSum)
        setWeightedLoss(totalWeight * 100 - totalSum)
        setWeightedAvg(totalSum / totalWeight)
    }
    return (
        <>
            <div className='main-container'>
                <h1>加權分數計算機</h1>
                {
                    subjects.map((subject, index) => (
                        <Subject 
                        setSubjectUsed={setSubjectsUsed} 
                        setSubjectCallback={setSubjectScores}
                        maxScore={subject === "國寫" ? 6 : 100}
                        subject={subject}
                        key={index}/>
                    ))
                }
                <Button variant="subtle" style={{fontSize:"2rem", paddingTop:"10px", paddingBottom:"10px"}} onClick={calculate}>計算</Button>
                {
                    calculated ? 
                    <div className='results'>
                    <p>加權後總分:{weightedSum}</p>
                    <p>加權後總扣分:{weightedLoss}</p>
                    <p>加權後平均:{weightedAvg.toFixed(2)}</p>

                    </div> :
                    null
                }
            </div>
        </>
    )
}

export default App
